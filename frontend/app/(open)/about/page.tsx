export default function About() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12 text-foreground sm:px-8 lg:py-16">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          About SkillBridge
        </p>

        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Bridging the gap between academia and industry
        </h1>

        <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
          SkillBridge is a centralized Academia–Industry Collaboration Portal
          designed to connect students, academicians, educational institutions,
          and industry partners through a unified digital platform.
        </p>

        <p className="mt-4 text-base leading-7 text-muted-foreground">
          The platform addresses the gap between skills developed through
          academic education and the competencies expected by industry. It
          brings skill assessment, skill mapping, learning opportunities,
          internships, placements, and industry–academia collaboration into a
          single ecosystem.
        </p>
      </div>

      <section className="mt-12 border-t border-border pt-10">
        <h2 className="text-xl font-semibold">Our Purpose</h2>

        <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
          Students often face difficulty identifying the skills required for
          their preferred career paths, while industries need an efficient way
          to discover candidates whose skills match their requirements.
          Academicians and institutions also need better visibility into
          current industry practices and opportunities for practical
          collaboration.
        </p>

        <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
          SkillBridge aims to address these challenges by creating a connected
          environment where skills, opportunities, learning, and collaboration
          can be aligned with evolving industry needs.
        </p>
      </section>

      <section className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold">Our Mission</h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            To provide a unified platform that helps students understand their
            strengths and skill gaps, discover relevant learning and career
            opportunities, and connect with industries while enabling
            academicians and institutions to strengthen their engagement with
            industry.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Our Vision</h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            To build a collaborative ecosystem where education and industry
            work together to develop relevant skills, create practical
            opportunities, and support better career outcomes.
          </p>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10">
        <h2 className="text-xl font-semibold">What SkillBridge Provides</h2>

        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-medium">Skill Assessment & Mapping</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Assess technical, aptitude, and soft skills to build a
              structured skill profile and identify areas that require further
              development.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Learning & Career Guidance</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Recommend relevant learning resources, training programs,
              certifications, and career directions based on skills, interests,
              and industry requirements.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Internships & Placements</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Provide a centralized space for discovering, applying to, and
              tracking internships, projects, apprenticeships, and entry-level
              employment opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Industry–Academia Collaboration</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Support mentorships, workshops, guest lectures, live projects,
              industrial training, faculty development, and collaborative
              research initiatives.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10">
        <h2 className="text-xl font-semibold">Who We Serve</h2>

        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-medium">Students</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Understand skill requirements, improve employability, and
              discover relevant internships and career opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Academicians</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Discover industrial training, FDPs, mentorship, consultancy, and
              research collaboration opportunities.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Industries</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Share skill requirements and connect with students and academic
              institutions for talent and collaboration.
            </p>
          </div>

          <div>
            <h3 className="font-medium">Institutions</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Monitor skill development, internship participation, placement
              progress, and industry engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 border-t border-border pt-10">
        <h2 className="text-xl font-semibold">Our Approach</h2>

        <p className="mt-4 max-w-4xl leading-7 text-muted-foreground">
          SkillBridge follows a continuous development approach: assess skills,
          identify gaps, recommend learning opportunities, connect users with
          relevant internships or placements, and use outcomes and feedback to
          support ongoing skill development.
        </p>
      </section>

      <section className="mt-12 border-t border-border pt-10">
        <p className="max-w-4xl text-sm leading-6 text-muted-foreground">
          SkillBridge is being developed as part of the proposed solution for
          the Smart India Hackathon problem statement titled
          &quot;Portal for Academia - Industry collaboration for Skill Mapping,
          Internships and Placement.&quot;
        </p>
      </section>
    </main>
  );
}