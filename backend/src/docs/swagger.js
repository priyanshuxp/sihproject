import swaggerUi from "swagger-ui-express";

export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "SIH 26044 Backend Foundation API",
    version: "1.0.0",
    description: `
**Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement (SIH Problem Statement 26044)**.

This API provides the complete backend foundation for:
- Unified User Identity Architecture
- Tenant-scoped RBAC for Educational Institutions and Organizations / Industries
- Global Platform Capabilities & Idempotent Permission System
- Strict Multi-Tenant Isolation & Anti-IDOR Authorization Controls
- Join & Approval Membership Lifecycles
- Basic Student and Academician Profile Management

### Authentication:
Authentication is performed via **HttpOnly cookies** (\`token\`) or \`Authorization: Bearer <JWT>\`.
    `,
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local Development Server",
    },
  ],
  tags: [
    { name: "Authentication", description: "Identity registration, login, logout, and current user retrieval" },
    { name: "Institutions", description: "Educational institution onboarding and management" },
    { name: "Institution Roles", description: "Custom role management for educational institutions" },
    { name: "Institution Role Permissions", description: "Permission assignment for institution custom roles" },
    { name: "Institution Members", description: "Institution member lifecycle, approval, role assignment, and removal" },
    { name: "Organizations", description: "Organization/Industry onboarding and management" },
    { name: "Organization Roles", description: "Custom role management for industry/organizations" },
    { name: "Organization Role Permissions", description: "Permission assignment for organization custom roles" },
    { name: "Organization Members", description: "Organization employee lifecycle, approval, and role assignment" },
    { name: "Profiles", description: "Student and Academician personal profiles" },
    { name: "Permissions", description: "Global platform capability directory" },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "token",
        description: "Standard HttpOnly JWT authentication cookie.",
      },
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Bearer JWT token in Authorization header for API testing.",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          user_uuid: { type: "string", format: "uuid" },
          firstName: { type: "string" },
          lastName: { type: "string" },
          email: { type: "string", format: "email" },
          phone: { type: "string", nullable: true },
          avatar: { type: "string", nullable: true },
          status: { type: "string", enum: ["ACTIVE", "INACTIVE", "SUSPENDED"] },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Institution: {
        type: "object",
        properties: {
          institution_uuid: { type: "string", format: "uuid" },
          name: { type: "string" },
          description: { type: "string", nullable: true },
          website: { type: "string", nullable: true },
          logo: { type: "string", nullable: true },
          email: { type: "string", nullable: true },
          phone: { type: "string", nullable: true },
          address: { type: "string", nullable: true },
          city: { type: "string", nullable: true },
          state: { type: "string", nullable: true },
          country: { type: "string", nullable: true },
          status: { type: "string", default: "ACTIVE" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      InstitutionRole: {
        type: "object",
        properties: {
          institutionrole_uuid: { type: "string", format: "uuid" },
          name: { type: "string" },
          description: { type: "string", nullable: true },
          institution_id: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      InstitutionMember: {
        type: "object",
        properties: {
          institutionmember_uuid: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          institution_id: { type: "string", format: "uuid" },
          institutionrole_id: { type: "string", format: "uuid", nullable: true },
          status: { type: "string", enum: ["PENDING", "ACTIVE", "REJECTED", "INACTIVE"] },
          isOwner: { type: "boolean" },
          requestedAt: { type: "string", format: "date-time" },
          approvedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Organization: {
        type: "object",
        properties: {
          organization_uuid: { type: "string", format: "uuid" },
          name: { type: "string" },
          description: { type: "string", nullable: true },
          website: { type: "string", nullable: true },
          logo: { type: "string", nullable: true },
          email: { type: "string", nullable: true },
          phone: { type: "string", nullable: true },
          address: { type: "string", nullable: true },
          city: { type: "string", nullable: true },
          state: { type: "string", nullable: true },
          country: { type: "string", nullable: true },
          status: { type: "string", default: "ACTIVE" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      OrganizationRole: {
        type: "object",
        properties: {
          organizationrole_uuid: { type: "string", format: "uuid" },
          name: { type: "string" },
          description: { type: "string", nullable: true },
          organization_id: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      OrganizationMember: {
        type: "object",
        properties: {
          organizationmember_uuid: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          organization_id: { type: "string", format: "uuid" },
          organizationrole_id: { type: "string", format: "uuid", nullable: true },
          jobTitle: { type: "string", nullable: true },
          status: { type: "string", enum: ["PENDING", "ACTIVE", "REJECTED", "INACTIVE"] },
          isOwner: { type: "boolean" },
          requestedAt: { type: "string", format: "date-time" },
          approvedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      Permission: {
        type: "object",
        properties: {
          permission_uuid: { type: "string", format: "uuid" },
          name: { type: "string" },
          code: { type: "string" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      StudentProfile: {
        type: "object",
        properties: {
          studentprofile_uuid: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          bio: { type: "string", nullable: true },
          course: { type: "string", nullable: true },
          department: { type: "string", nullable: true },
          currentYear: { type: "integer", nullable: true },
          enrollmentNumber: { type: "string", nullable: true },
          city: { type: "string", nullable: true },
          state: { type: "string", nullable: true },
          country: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      AcademicianProfile: {
        type: "object",
        properties: {
          academicianprofile_uuid: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          designation: { type: "string", nullable: true },
          department: { type: "string", nullable: true },
          qualification: { type: "string", nullable: true },
          specialization: { type: "string", nullable: true },
          experienceYears: { type: "integer", nullable: true },
          bio: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ApiResponse: {
        type: "object",
        properties: {
          statusCode: { type: "integer" },
          data: { type: "object", nullable: true },
          message: { type: "string" },
          success: { type: "boolean" },
        },
      },
      ApiError: {
        type: "object",
        properties: {
          statusCode: { type: "integer" },
          message: { type: "string" },
          success: { type: "boolean", default: false },
          errors: {
            type: "array",
            items: { type: "object" },
          },
        },
      },
    },
  },
  security: [
    { cookieAuth: [] },
    { bearerAuth: [] },
  ],
  paths: {
    // ==========================================
    // AUTHENTICATION PATHS
    // ==========================================
    "/api/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user identity",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["firstName", "lastName", "email", "password"],
                properties: {
                  firstName: { type: "string", example: "Rahul" },
                  lastName: { type: "string", example: "Sharma" },
                  email: { type: "string", format: "email", example: "rahul@example.com" },
                  password: { type: "string", format: "password", example: "Secret123" },
                  phone: { type: "string", example: "+919876543210" },
                  avatar: { type: "string", example: "https://example.com/avatar.jpg" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "User registered successfully", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } } },
          400: { description: "Validation error" },
          409: { description: "Email or phone already in use" },
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login with email and password",
        security: [],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email", example: "rahul@example.com" },
                  password: { type: "string", format: "password", example: "Secret123" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Login successful; sets HttpOnly cookie", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } } },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "Logout current user and clear cookie",
        responses: {
          200: { description: "Logged out successfully" },
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current authenticated user identity and active tenant memberships",
        responses: {
          200: { description: "Current user profile fetched successfully", content: { "application/json": { schema: { $ref: "#/components/schemas/ApiResponse" } } } },
          401: { description: "Unauthorized" },
        },
      },
    },

    // ==========================================
    // INSTITUTION PATHS
    // ==========================================
    "/api/institutions": {
      post: {
        tags: ["Institutions"],
        summary: "Onboard a new educational institution (creator becomes Owner)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "All India Institute of Ayurveda" },
                  description: { type: "string", example: "Apex institute for Ayurveda under Ministry of Ayush" },
                  website: { type: "string", example: "https://aiia.gov.in" },
                  email: { type: "string", format: "email", example: "info@aiia.gov.in" },
                  phone: { type: "string", example: "+911126950401" },
                  address: { type: "string", example: "Gautampuri, Sarita Vihar" },
                  city: { type: "string", example: "New Delhi" },
                  state: { type: "string", example: "Delhi" },
                  country: { type: "string", example: "India" },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Institution created; creator assigned as Owner" },
          400: { description: "Validation error" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/api/institutions/{institutionId}": {
      get: {
        tags: ["Institutions"],
        summary: "Get institution details by ID",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          200: { description: "Institution details retrieved" },
          404: { description: "Institution not found" },
        },
      },
      put: {
        tags: ["Institutions"],
        summary: "Update institution details (Requires INSTITUTION_UPDATE or Owner)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  website: { type: "string" },
                  email: { type: "string" },
                  phone: { type: "string" },
                  city: { type: "string" },
                  state: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Institution updated successfully" },
          403: { description: "Forbidden - Insufficient permissions" },
          404: { description: "Institution not found" },
        },
      },
    },
    "/api/institutions/{institutionId}/join": {
      post: {
        tags: ["Institutions"],
        summary: "Request to join an institution as a member (Status: PENDING)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: {
          200: { description: "Join request submitted; awaiting institution approval" },
          409: { description: "Membership already exists or pending" },
        },
      },
    },

    // ==========================================
    // INSTITUTION ROLES & PERMISSIONS
    // ==========================================
    "/api/institutions/{institutionId}/roles": {
      get: {
        tags: ["Institution Roles"],
        summary: "List custom roles in institution (Requires ROLE_VIEW or Owner)",
        parameters: [{ name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: { 200: { description: "List of institution roles" }, 403: { description: "Forbidden" } },
      },
      post: {
        tags: ["Institution Roles"],
        summary: "Create a custom role for institution (Requires ROLE_CREATE or Owner)",
        parameters: [{ name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Head of Department (HOD)" },
                  description: { type: "string", example: "Departmental leadership and verification authority" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Role created" }, 409: { description: "Role name exists in this institution" } },
      },
    },
    "/api/institutions/{institutionId}/roles/{roleId}": {
      get: {
        tags: ["Institution Roles"],
        summary: "Get role details (Requires ROLE_VIEW or Owner)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "Role details" }, 404: { description: "Role not found in this institution" } },
      },
      put: {
        tags: ["Institution Roles"],
        summary: "Update role details (Requires ROLE_UPDATE or Owner)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Role updated" }, 404: { description: "Role not found" } },
      },
      delete: {
        tags: ["Institution Roles"],
        summary: "Delete role (Requires ROLE_DELETE or Owner)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "Role deleted" }, 404: { description: "Role not found" } },
      },
    },
    "/api/institutions/{institutionId}/roles/{roleId}/permissions": {
      get: {
        tags: ["Institution Role Permissions"],
        summary: "Get permissions assigned to institution role (Requires ROLE_VIEW or Owner)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "List of assigned permissions" }, 404: { description: "Role not found" } },
      },
      put: {
        tags: ["Institution Role Permissions"],
        summary: "Replace permissions assigned to institution role (Requires ROLE_ASSIGN or Owner)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["permissions"],
                properties: {
                  permissions: {
                    type: "array",
                    items: { type: "string" },
                    example: ["STUDENT_VIEW", "STUDENT_VERIFY", "MEMBER_VIEW", "MEMBER_APPROVE"],
                  },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Role permissions updated successfully" }, 400: { description: "Invalid permission code" } },
      },
    },

    // ==========================================
    // INSTITUTION MEMBERS
    // ==========================================
    "/api/institutions/{institutionId}/members": {
      get: {
        tags: ["Institution Members"],
        summary: "List active members of institution (Requires MEMBER_VIEW or Owner)",
        parameters: [{ name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: { 200: { description: "List of active members" }, 403: { description: "Forbidden" } },
      },
    },
    "/api/institutions/{institutionId}/members/pending": {
      get: {
        tags: ["Institution Members"],
        summary: "List pending member join requests (Requires MEMBER_APPROVE or Owner)",
        parameters: [{ name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: { 200: { description: "List of pending member join requests" }, 403: { description: "Forbidden" } },
      },
    },
    "/api/institutions/{institutionId}/members/{memberId}/approve": {
      post: {
        tags: ["Institution Members"],
        summary: "Approve a pending member join request (Requires MEMBER_APPROVE or Owner)",
        description: "Approves a pending member request. Self-approval is strictly forbidden by security rules.",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "memberId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  roleId: { type: "string", format: "uuid", nullable: true, description: "Optional role to assign upon approval" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Member approved" }, 403: { description: "Self-approval prohibited or missing permission" } },
      },
    },
    "/api/institutions/{institutionId}/members/{memberId}/reject": {
      post: {
        tags: ["Institution Members"],
        summary: "Reject a pending member join request (Requires MEMBER_APPROVE or Owner)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "memberId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "Member rejected" } },
      },
    },
    "/api/institutions/{institutionId}/members/{memberId}/role": {
      put: {
        tags: ["Institution Members"],
        summary: "Assign or change member role (Requires ROLE_ASSIGN or Owner)",
        description: "Role MUST belong to the same institution. Cross-tenant assignment is strictly prohibited.",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "memberId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["roleId"],
                properties: {
                  roleId: { type: "string", format: "uuid", nullable: true },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Member role updated" }, 404: { description: "Role or Member not found in this institution" } },
      },
    },
    "/api/institutions/{institutionId}/members/{memberId}": {
      delete: {
        tags: ["Institution Members"],
        summary: "Remove member from institution (Requires MEMBER_REMOVE or Owner)",
        parameters: [
          { name: "institutionId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "memberId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "Member removed" } },
      },
    },

    // ==========================================
    // ORGANIZATIONS PATHS
    // ==========================================
    "/api/organizations": {
      post: {
        tags: ["Organizations"],
        summary: "Onboard a new organization/industry (creator becomes Owner)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Dabur India Ltd" },
                  description: { type: "string", example: "Ayurvedic and natural consumer healthcare manufacturer" },
                  website: { type: "string", example: "https://www.dabur.com" },
                  email: { type: "string", format: "email", example: "careers@dabur.com" },
                  phone: { type: "string", example: "+911203982000" },
                  city: { type: "string", example: "Ghaziabad" },
                  state: { type: "string", example: "Uttar Pradesh" },
                  country: { type: "string", example: "India" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Organization created; creator assigned as Owner" } },
      },
    },
    "/api/organizations/{organizationId}": {
      get: {
        tags: ["Organizations"],
        summary: "Get organization details by ID",
        parameters: [{ name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: { 200: { description: "Organization details" }, 404: { description: "Organization not found" } },
      },
      put: {
        tags: ["Organizations"],
        summary: "Update organization details (Requires ORGANIZATION_UPDATE or Owner)",
        parameters: [{ name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                  website: { type: "string" },
                  email: { type: "string" },
                  city: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Organization updated" } },
      },
    },
    "/api/organizations/{organizationId}/join": {
      post: {
        tags: ["Organizations"],
        summary: "Request to join an organization as employee (Status: PENDING)",
        parameters: [{ name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  jobTitle: { type: "string", example: "Clinical Research Manager" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Join request submitted; awaiting approval" } },
      },
    },

    // ==========================================
    // ORGANIZATION ROLES & PERMISSIONS
    // ==========================================
    "/api/organizations/{organizationId}/roles": {
      get: {
        tags: ["Organization Roles"],
        summary: "List custom roles in organization (Requires ROLE_VIEW or Owner)",
        parameters: [{ name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: { 200: { description: "List of roles" } },
      },
      post: {
        tags: ["Organization Roles"],
        summary: "Create a custom role for organization (Requires ROLE_CREATE or Owner)",
        parameters: [{ name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string", example: "Talent Acquisition / HR" },
                  description: { type: "string", example: "Manages internship postings, candidate shortlisting, and hiring" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Role created" } },
      },
    },
    "/api/organizations/{organizationId}/roles/{roleId}": {
      get: {
        tags: ["Organization Roles"],
        summary: "Get organization role details (Requires ROLE_VIEW or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "Role details" }, 404: { description: "Role not found in this organization" } },
      },
      put: {
        tags: ["Organization Roles"],
        summary: "Update organization role (Requires ROLE_UPDATE or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  description: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Role updated" } },
      },
      delete: {
        tags: ["Organization Roles"],
        summary: "Delete organization role (Requires ROLE_DELETE or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "Role deleted" } },
      },
    },
    "/api/organizations/{organizationId}/roles/{roleId}/permissions": {
      get: {
        tags: ["Organization Role Permissions"],
        summary: "Get permissions assigned to organization role (Requires ROLE_VIEW or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "List of assigned permissions" } },
      },
      put: {
        tags: ["Organization Role Permissions"],
        summary: "Assign permissions to organization role (Requires ROLE_ASSIGN or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "roleId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["permissions"],
                properties: {
                  permissions: {
                    type: "array",
                    items: { type: "string" },
                    example: ["STUDENT_VIEW", "MEMBER_VIEW", "MEMBER_APPROVE"],
                  },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Permissions updated" } },
      },
    },

    // ==========================================
    // ORGANIZATION MEMBERS
    // ==========================================
    "/api/organizations/{organizationId}/members": {
      get: {
        tags: ["Organization Members"],
        summary: "List active members/employees (Requires MEMBER_VIEW or Owner)",
        parameters: [{ name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: { 200: { description: "Active members list" } },
      },
    },
    "/api/organizations/{organizationId}/members/pending": {
      get: {
        tags: ["Organization Members"],
        summary: "List pending employee join requests (Requires MEMBER_APPROVE or Owner)",
        parameters: [{ name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } }],
        responses: { 200: { description: "Pending join requests list" } },
      },
    },
    "/api/organizations/{organizationId}/members/{memberId}/approve": {
      post: {
        tags: ["Organization Members"],
        summary: "Approve pending employee join request (Requires MEMBER_APPROVE or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "memberId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  roleId: { type: "string", format: "uuid", nullable: true },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Employee approved" }, 403: { description: "Self-approval prohibited" } },
      },
    },
    "/api/organizations/{organizationId}/members/{memberId}/reject": {
      post: {
        tags: ["Organization Members"],
        summary: "Reject pending employee request (Requires MEMBER_APPROVE or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "memberId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "Employee request rejected" } },
      },
    },
    "/api/organizations/{organizationId}/members/{memberId}/role": {
      put: {
        tags: ["Organization Members"],
        summary: "Assign or update employee role (Requires ROLE_ASSIGN or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "memberId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["roleId"],
                properties: {
                  roleId: { type: "string", format: "uuid", nullable: true },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Employee role updated" } },
      },
    },
    "/api/organizations/{organizationId}/members/{memberId}": {
      delete: {
        tags: ["Organization Members"],
        summary: "Remove employee from organization (Requires MEMBER_REMOVE or Owner)",
        parameters: [
          { name: "organizationId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
          { name: "memberId", in: "path", required: true, schema: { type: "string", format: "uuid" } },
        ],
        responses: { 200: { description: "Employee removed" } },
      },
    },

    // ==========================================
    // PROFILES
    // ==========================================
    "/api/profile/student": {
      get: {
        tags: ["Profiles"],
        summary: "Get current authenticated user's student profile",
        responses: { 200: { description: "Student profile" }, 404: { description: "Profile not found" } },
      },
      post: {
        tags: ["Profiles"],
        summary: "Create or update current authenticated user's student profile",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  bio: { type: "string", example: "Final year BAMS student interested in Ayurvedic clinical research" },
                  course: { type: "string", example: "BAMS" },
                  department: { type: "string", example: "Dravyaguna" },
                  currentYear: { type: "integer", example: 4 },
                  enrollmentNumber: { type: "string", example: "AYUSH/2023/8892" },
                  city: { type: "string", example: "New Delhi" },
                  state: { type: "string", example: "Delhi" },
                  country: { type: "string", example: "India" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Student profile saved" } },
      },
      put: {
        tags: ["Profiles"],
        summary: "Update current user's student profile",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  bio: { type: "string" },
                  course: { type: "string" },
                  currentYear: { type: "integer" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Student profile updated" } },
      },
    },
    "/api/profile/academician": {
      get: {
        tags: ["Profiles"],
        summary: "Get current authenticated user's academician profile",
        responses: { 200: { description: "Academician profile" }, 404: { description: "Profile not found" } },
      },
      post: {
        tags: ["Profiles"],
        summary: "Create or update current user's academician profile",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  designation: { type: "string", example: "Associate Professor" },
                  department: { type: "string", example: "Rasashastra & Bhaishajya Kalpana" },
                  qualification: { type: "string", example: "MD (Ayu), PhD" },
                  specialization: { type: "string", example: "Standardization of Herbo-mineral Formulations" },
                  experienceYears: { type: "integer", example: 12 },
                  bio: { type: "string", example: "Senior faculty researcher in Ayurvedic drug standardization" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Academician profile saved" } },
      },
      put: {
        tags: ["Profiles"],
        summary: "Update current user's academician profile",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  designation: { type: "string" },
                  experienceYears: { type: "integer" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Academician profile updated" } },
      },
    },

    // ==========================================
    // PERMISSIONS
    // ==========================================
    "/api/permissions": {
      get: {
        tags: ["Permissions"],
        summary: "List all global platform capabilities for role configuration",
        responses: {
          200: { description: "Platform permissions list" },
        },
      },
    },
  },
};

/**
 * Setup Swagger UI middleware on express app
 * @param {import('express').Express} app 
 */
export const setupSwagger = (app) => {
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customSiteTitle: "SIH 26044 Backend Foundation API Docs",
    })
  );

  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};

export default setupSwagger;
