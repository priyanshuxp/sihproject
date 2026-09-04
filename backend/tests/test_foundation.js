import http from "http";
import app from "../src/app.js";
import prisma from "../src/utils/PrismaClient.js";

// Custom helper to make HTTP requests against the Express app
function makeRequest(server, { method, path, headers = {}, body = null, cookie = null }) {
  return new Promise((resolve, reject) => {
    const port = server.address().port;
    const reqHeaders = { ...headers };

    if (cookie) {
      reqHeaders["Cookie"] = cookie;
    }

    let payload = null;
    if (body) {
      payload = JSON.stringify(body);
      reqHeaders["Content-Type"] = "application/json";
      reqHeaders["Content-Length"] = Buffer.byteLength(payload);
    }

    const req = http.request(
      {
        host: "localhost",
        port,
        path,
        method,
        headers: reqHeaders,
      },
      (res) => {
        let responseData = "";
        const setCookieHeaders = res.headers["set-cookie"] || [];

        res.on("data", (chunk) => {
          responseData += chunk;
        });

        res.on("end", () => {
          let parsedData = null;
          try {
            parsedData = JSON.parse(responseData);
          } catch {
            parsedData = responseData;
          }

          let cookieString = "";
          if (setCookieHeaders.length > 0) {
            cookieString = setCookieHeaders.map((c) => c.split(";")[0]).join("; ");
          }

          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: parsedData,
            cookie: cookieString,
          });
        });
      }
    );

    req.on("error", reject);

    if (payload) {
      req.write(payload);
    }
    req.end();
  });
}

// Assert helper
function assert(condition, message, res = null) {
  if (!condition) {
    console.error(`❌ Assertion Failed: ${message}`);
    if (res) {
      console.error(`   Status Code: ${res.statusCode}`);
      console.error(`   Response Body:`, JSON.stringify(res.body, null, 2));
    }
    throw new Error(`Assertion Failed: ${message}`);
  }
  console.log(`  ✓ ${message}`);
}

async function runFoundationTests() {
  console.log("==========================================================");
  console.log("🚀 STARTING SIH 26044 BACKEND FOUNDATION INTEGRATION TESTS");
  console.log("==========================================================");

  // Start test server on random free port
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`📡 Test server running on port ${port}\n`);

  try {
    const timestamp = Date.now();

    // -------------------------------------------------------------
    // TEST SUITE 1: AUTHENTICATION
    // -------------------------------------------------------------
    console.log("--- 1. Testing Authentication ---");

    // 1.1 Register User 1 (Institution A Owner)
    const user1Data = {
      firstName: "Aarav",
      lastName: "Patel",
      email: `aarav_${timestamp}@ayush.gov.in`,
      password: "Password123!",
    };
    const regRes1 = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/register",
      body: user1Data,
    });
    assert(regRes1.statusCode === 201, "Register User 1 returns 201");
    assert(regRes1.body.data.user.email === user1Data.email, "User 1 email matches");
    assert(!regRes1.body.data.user.password, "Password hash is never returned");
    const cookieUser1 = regRes1.cookie;
    const user1 = regRes1.body.data.user;

    // 1.2 Register User 2 (Institution B Owner)
    const user2Data = {
      firstName: "Bhavna",
      lastName: "Deshmukh",
      email: `bhavna_${timestamp}@ayush.gov.in`,
      password: "Password123!",
    };
    const regRes2 = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/register",
      body: user2Data,
    });
    assert(regRes2.statusCode === 201, "Register User 2 returns 201");
    const cookieUser2 = regRes2.cookie;
    const user2 = regRes2.body.data.user;

    // 1.3 Register User 3 (Student C)
    const user3Data = {
      firstName: "Chetan",
      lastName: "Verma",
      email: `chetan_${timestamp}@student.ac.in`,
      password: "Password123!",
    };
    const regRes3 = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/register",
      body: user3Data,
    });
    assert(regRes3.statusCode === 201, "Register User 3 returns 201");
    const cookieUser3 = regRes3.cookie;
    const user3 = regRes3.body.data.user;

    // 1.4 Duplicate email registration rejection
    const dupRes = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/register",
      body: user1Data,
    });
    assert(dupRes.statusCode === 409, "Duplicate email registration rejected with 409 Conflict");

    // 1.5 Login with wrong password
    const wrongLoginRes = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/login",
      body: { email: user1Data.email, password: "WrongPassword!" },
    });
    assert(wrongLoginRes.statusCode === 401, "Login with incorrect password returns 401");

    // 1.6 Login with correct password
    const loginRes = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/login",
      body: { email: user1Data.email, password: user1Data.password },
    });
    assert(loginRes.statusCode === 200, "Login with valid credentials returns 200", loginRes);
    const authCookieUser1 = loginRes.cookie || cookieUser1;

    // 1.7 Current user profile /me
    const meRes = await makeRequest(server, {
      method: "GET",
      path: "/api/auth/me",
      cookie: authCookieUser1,
    });
    assert(meRes.statusCode === 200, "GET /api/auth/me returns 200", meRes);
    assert(meRes.body.data.user_uuid === user1.user_uuid, "Me profile matches user 1 ID");

    // 1.8 Unauthenticated request rejected
    const unauthRes = await makeRequest(server, {
      method: "GET",
      path: "/api/auth/me",
    });
    assert(unauthRes.statusCode === 401, "Unauthenticated request rejected with 401", unauthRes);

    // 1.9 Logout test
    const tempUserReg = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/register",
      body: {
        firstName: "Temp",
        lastName: "User",
        email: `temp_${timestamp}@test.com`,
        password: "Password123!",
      },
    });
    const logoutRes = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/logout",
      cookie: tempUserReg.cookie,
    });
    assert(logoutRes.statusCode === 200, "Logout returns 200", logoutRes);


    // -------------------------------------------------------------
    // TEST SUITE 2: INSTITUTION ONBOARDING & TENANT ISOLATION
    // -------------------------------------------------------------
    console.log("\n--- 2. Testing Institution Onboarding & Tenant Isolation ---");

    // 2.1 User 1 creates Institution A
    const instARes = await makeRequest(server, {
      method: "POST",
      path: "/api/institutions",
      cookie: authCookieUser1,
      body: {
        name: `All India Institute of Ayurveda - North ${timestamp}`,
        city: "New Delhi",
        state: "Delhi",
        country: "India",
      },
    });
    assert(instARes.statusCode === 201, "Create Institution A returns 201", instARes);
    assert(instARes.body.data.owner.isOwner === true, "Creator is assigned as Owner");
    assert(instARes.body.data.owner.status === "ACTIVE", "Owner membership status is ACTIVE");
    const instA = instARes.body.data.institution;

    // 2.2 User 2 creates Institution B
    const instBRes = await makeRequest(server, {
      method: "POST",
      path: "/api/institutions",
      cookie: cookieUser2,
      body: {
        name: `National Institute of Ayurveda - South ${timestamp}`,
        city: "Jaipur",
        state: "Rajasthan",
        country: "India",
      },
    });
    assert(instBRes.statusCode === 201, "Create Institution B returns 201");
    const instB = instBRes.body.data.institution;

    // 2.3 IDOR / Tenant Isolation Test: User 1 attempts to update Institution B
    const idorInstUpdateRes = await makeRequest(server, {
      method: "PUT",
      path: `/api/institutions/${instB.institution_uuid}`,
      cookie: authCookieUser1,
      body: { name: "Hacked Institution Name" },
    });
    assert(idorInstUpdateRes.statusCode === 403, "User 1 blocked from updating Institution B (403 Forbidden)");

    // 2.4 User 1 attempts to list roles of Institution B
    const idorRoleListRes = await makeRequest(server, {
      method: "GET",
      path: `/api/institutions/${instB.institution_uuid}/roles`,
      cookie: authCookieUser1,
    });
    assert(idorRoleListRes.statusCode === 403, "User 1 blocked from accessing Institution B roles (403 Forbidden)");


    // -------------------------------------------------------------
    // TEST SUITE 3: INSTITUTION RBAC & CUSTOM ROLES
    // -------------------------------------------------------------
    console.log("\n--- 3. Testing Institution RBAC & Custom Roles ---");

    // 3.1 Owner of A creates role "Head of Department (HOD)" in Institution A
    const createRoleRes = await makeRequest(server, {
      method: "POST",
      path: `/api/institutions/${instA.institution_uuid}/roles`,
      cookie: authCookieUser1,
      body: {
        name: "Head of Department",
        description: "Department head with student verification and member approval access",
      },
    });
    assert(createRoleRes.statusCode === 201, "Create custom role in Institution A returns 201");
    const roleHodA = createRoleRes.body.data;

    // 3.2 Owner of B creates role with same name "Head of Department" in Institution B (Demonstrating tenant-scoped roles)
    const createRoleBRes = await makeRequest(server, {
      method: "POST",
      path: `/api/institutions/${instB.institution_uuid}/roles`,
      cookie: cookieUser2,
      body: {
        name: "Head of Department",
        description: "Jaipur campus department head",
      },
    });
    assert(createRoleBRes.statusCode === 201, "Same role name permitted in different institution tenant");
    const roleHodB = createRoleBRes.body.data;

    // 3.3 Duplicate role name within SAME institution is rejected
    const dupRoleRes = await makeRequest(server, {
      method: "POST",
      path: `/api/institutions/${instA.institution_uuid}/roles`,
      cookie: authCookieUser1,
      body: { name: "Head of Department" },
    });
    assert(dupRoleRes.statusCode === 409, "Duplicate role name in same institution rejected with 409");

    // 3.4 Assign permissions to HOD role in Institution A
    const assignPermsRes = await makeRequest(server, {
      method: "PUT",
      path: `/api/institutions/${instA.institution_uuid}/roles/${roleHodA.institutionrole_uuid}/permissions`,
      cookie: authCookieUser1,
      body: {
        permissions: ["STUDENT_VIEW", "MEMBER_VIEW", "MEMBER_APPROVE"],
      },
    });
    assert(assignPermsRes.statusCode === 200, "Permissions assigned to role in Institution A");
    assert(
      assignPermsRes.body.data.institutionRolePermissions.length === 3,
      "Role has exactly 3 assigned permissions"
    );

    // 3.5 Cross-tenant Role IDOR: User 1 attempts to update role in Institution B
    const idorRoleUpdateRes = await makeRequest(server, {
      method: "PUT",
      path: `/api/institutions/${instA.institution_uuid}/roles/${roleHodB.institutionrole_uuid}`,
      cookie: authCookieUser1,
      body: { name: "Compromised Role" },
    });
    assert(idorRoleUpdateRes.statusCode === 404, "Cross-tenant role access blocked with 404 Not Found");


    // -------------------------------------------------------------
    // TEST SUITE 4: MEMBERSHIP LIFECYCLE & SECURITY
    // -------------------------------------------------------------
    console.log("\n--- 4. Testing Membership Lifecycle & Security ---");

    // 4.1 User 3 requests to join Institution A
    const joinRes = await makeRequest(server, {
      method: "POST",
      path: `/api/institutions/${instA.institution_uuid}/join`,
      cookie: cookieUser3,
    });
    assert(joinRes.statusCode === 200, "Student join request submitted");
    assert(joinRes.body.data.status === "PENDING", "Join request status is PENDING");
    const memberId = joinRes.body.data.institutionmember_uuid;

    // 4.2 Security check: User 3 attempts to approve their own membership request (Must be rejected)
    const selfApproveRes = await makeRequest(server, {
      method: "POST",
      path: `/api/institutions/${instA.institution_uuid}/members/${memberId}/approve`,
      cookie: cookieUser3,
    });
    assert(selfApproveRes.statusCode === 403, "User cannot approve their own membership request (403 Forbidden)");

    // 4.3 Owner lists pending member requests
    const pendingListRes = await makeRequest(server, {
      method: "GET",
      path: `/api/institutions/${instA.institution_uuid}/members/pending`,
      cookie: authCookieUser1,
    });
    assert(pendingListRes.statusCode === 200, "Owner can list pending membership requests");
    assert(
      pendingListRes.body.data.some((m) => m.institutionmember_uuid === memberId),
      "Pending list contains User 3's request"
    );

    // 4.4 Owner approves User 3 and assigns role "Head of Department"
    const approveRes = await makeRequest(server, {
      method: "POST",
      path: `/api/institutions/${instA.institution_uuid}/members/${memberId}/approve`,
      cookie: authCookieUser1,
      body: { roleId: roleHodA.institutionrole_uuid },
    });
    assert(approveRes.statusCode === 200, "Owner approved User 3");
    assert(approveRes.body.data.status === "ACTIVE", "User 3 status is now ACTIVE");
    assert(approveRes.body.data.institutionrole_id === roleHodA.institutionrole_uuid, "HOD role assigned to User 3");

    // 4.5 Permission enforcement: User 3 (now HOD) can view members (MEMBER_VIEW)
    const memberViewRes = await makeRequest(server, {
      method: "GET",
      path: `/api/institutions/${instA.institution_uuid}/members`,
      cookie: cookieUser3,
    });
    assert(memberViewRes.statusCode === 200, "User 3 with MEMBER_VIEW permission can list active members");

    // 4.6 Permission enforcement: User 3 cannot update institution (missing INSTITUTION_UPDATE)
    const unauthorizedInstUpdateRes = await makeRequest(server, {
      method: "PUT",
      path: `/api/institutions/${instA.institution_uuid}`,
      cookie: cookieUser3,
      body: { name: "Unauthorized Name Change" },
    });
    assert(unauthorizedInstUpdateRes.statusCode === 403, "User 3 without INSTITUTION_UPDATE blocked with 403");

    // 4.7 Cross-tenant Role Assignment IDOR: Owner of A attempts to assign Institution B's role to User 3
    const crossTenantRoleAssignRes = await makeRequest(server, {
      method: "PUT",
      path: `/api/institutions/${instA.institution_uuid}/members/${memberId}/role`,
      cookie: authCookieUser1,
      body: { roleId: roleHodB.institutionrole_uuid },
    });
    assert(crossTenantRoleAssignRes.statusCode === 404, "Cross-tenant role assignment blocked with 404");


    // -------------------------------------------------------------
    // TEST SUITE 5: ORGANIZATIONS & RBAC
    // -------------------------------------------------------------
    console.log("\n--- 5. Testing Organization Onboarding & RBAC ---");

    // 5.1 Register Organization Owner User 4
    const user4Data = {
      firstName: "Deepak",
      lastName: "Singhal",
      email: `deepak_${timestamp}@dabur.com`,
      password: "Password123!",
    };
    const regRes4 = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/register",
      body: user4Data,
    });
    const cookieUser4 = regRes4.cookie;

    // 5.2 User 4 onboards Organization
    const orgRes = await makeRequest(server, {
      method: "POST",
      path: "/api/organizations",
      cookie: cookieUser4,
      body: {
        name: `Dabur Research & Development ${timestamp}`,
        city: "Ghaziabad",
        state: "Uttar Pradesh",
        country: "India",
      },
    });
    assert(orgRes.statusCode === 201, "Create Organization returns 201");
    const org = orgRes.body.data.organization;
    assert(orgRes.body.data.owner.isOwner === true, "Organization creator is Owner");

    // 5.3 User 4 creates custom role "HR Recruiter" in Organization
    const orgRoleRes = await makeRequest(server, {
      method: "POST",
      path: `/api/organizations/${org.organization_uuid}/roles`,
      cookie: cookieUser4,
      body: {
        name: "HR Recruiter",
        description: "Talent acquisition & internship management",
      },
    });
    assert(orgRoleRes.statusCode === 201, "Create custom organization role returns 201");
    const orgRole = orgRoleRes.body.data;

    // 5.4 User 4 assigns permissions to "HR Recruiter"
    const orgAssignPermsRes = await makeRequest(server, {
      method: "PUT",
      path: `/api/organizations/${org.organization_uuid}/roles/${orgRole.organizationrole_uuid}/permissions`,
      cookie: cookieUser4,
      body: {
        permissions: ["STUDENT_VIEW", "MEMBER_VIEW", "MEMBER_APPROVE"],
      },
    });
    assert(orgAssignPermsRes.statusCode === 200, "Assigned permissions to organization role");

    // 5.5 Register Employee User 5
    const user5Data = {
      firstName: "Esha",
      lastName: "Gupta",
      email: `esha_${timestamp}@dabur.com`,
      password: "Password123!",
    };
    const regRes5 = await makeRequest(server, {
      method: "POST",
      path: "/api/auth/register",
      body: user5Data,
    });
    const cookieUser5 = regRes5.cookie;

    // 5.6 User 5 requests to join organization
    const orgJoinRes = await makeRequest(server, {
      method: "POST",
      path: `/api/organizations/${org.organization_uuid}/join`,
      cookie: cookieUser5,
      body: { jobTitle: "Junior Recruiter" },
    });
    assert(orgJoinRes.statusCode === 200, "Employee join request submitted");
    const orgMemberId = orgJoinRes.body.data.organizationmember_uuid;

    // 5.7 Self-approval prevention for organization
    const orgSelfApproveRes = await makeRequest(server, {
      method: "POST",
      path: `/api/organizations/${org.organization_uuid}/members/${orgMemberId}/approve`,
      cookie: cookieUser5,
    });
    assert(orgSelfApproveRes.statusCode === 403, "Employee self-approval blocked (403 Forbidden)");

    // 5.8 User 4 approves User 5
    const orgApproveRes = await makeRequest(server, {
      method: "POST",
      path: `/api/organizations/${org.organization_uuid}/members/${orgMemberId}/approve`,
      cookie: cookieUser4,
      body: { roleId: orgRole.organizationrole_uuid },
    });
    assert(orgApproveRes.statusCode === 200, "Owner approved employee and assigned role");
    assert(orgApproveRes.body.data.status === "ACTIVE", "Employee status is ACTIVE");


    // -------------------------------------------------------------
    // TEST SUITE 6: PROFILES
    // -------------------------------------------------------------
    console.log("\n--- 6. Testing Student and Academician Profiles ---");

    // 6.1 User 3 creates student profile
    const studentProfileRes = await makeRequest(server, {
      method: "POST",
      path: "/api/profile/student",
      cookie: cookieUser3,
      body: {
        bio: "BAMS final year student passionate about Ayurvedic clinical research",
        course: "BAMS",
        department: "Kayachikitsa",
        currentYear: 4,
        enrollmentNumber: `ENR-${timestamp}`,
        city: "New Delhi",
        state: "Delhi",
        country: "India",
      },
    });
    assert(studentProfileRes.statusCode === 200, "Create student profile returns 200");
    assert(studentProfileRes.body.data.course === "BAMS", "Student course matches");

    // 6.2 User 3 gets student profile
    const getStudentProfileRes = await makeRequest(server, {
      method: "GET",
      path: "/api/profile/student",
      cookie: cookieUser3,
    });
    assert(getStudentProfileRes.statusCode === 200, "Get student profile returns 200");

    // 6.3 User 1 creates academician profile
    const acadProfileRes = await makeRequest(server, {
      method: "POST",
      path: "/api/profile/academician",
      cookie: authCookieUser1,
      body: {
        designation: "Professor & Head",
        department: "Dravyaguna",
        qualification: "MD (Ayu), PhD",
        specialization: "Medicinal Plant Standardization",
        experienceYears: 15,
        bio: "Senior faculty researcher with over 50 published papers",
      },
    });
    assert(acadProfileRes.statusCode === 200, "Create academician profile returns 200");
    assert(acadProfileRes.body.data.experienceYears === 15, "Experience years matches");


    // -------------------------------------------------------------
    // TEST SUITE 7: PERMISSIONS DIRECTORY & SWAGGER
    // -------------------------------------------------------------
    console.log("\n--- 7. Testing Permissions Directory & Swagger Documentation ---");

    // 7.1 List platform permissions
    const permsRes = await makeRequest(server, {
      method: "GET",
      path: "/api/permissions",
      cookie: authCookieUser1,
    });
    assert(permsRes.statusCode === 200, "List global permissions returns 200");
    assert(permsRes.body.data.length >= 19, "Seeded permissions are returned");

    // 7.2 Swagger documentation endpoint
    const swaggerRes = await makeRequest(server, {
      method: "GET",
      path: "/docs/",
    });
    assert(swaggerRes.statusCode === 200, "Swagger UI at GET /docs returns 200 OK");
    assert(
      typeof swaggerRes.body === "string" && swaggerRes.body.includes("swagger-ui"),
      "Swagger HTML assets served properly"
    );

    // 7.3 Swagger OpenAPI spec JSON
    const swaggerJsonRes = await makeRequest(server, {
      method: "GET",
      path: "/docs.json",
    });
    assert(swaggerJsonRes.statusCode === 200, "Swagger OpenAPI spec at /docs.json returns 200");
    assert(swaggerJsonRes.body.openapi === "3.0.3", "OpenAPI version 3.0.3 verified");
    assert(
      Object.keys(swaggerJsonRes.body.paths).length >= 20,
      "All API endpoints documented in OpenAPI spec"
    );

    console.log("\n==========================================================");
    console.log("🎉 ALL INTEGRATION & SECURITY TESTS PASSED SUCCESSFULLY! 🚀");
    console.log("==========================================================");
  } finally {
    server.close();
    await prisma.$disconnect();
  }
}

runFoundationTests().catch((err) => {
  console.error("\n❌ TESTS FAILED WITH ERROR:", err);
  process.exit(1);
});
