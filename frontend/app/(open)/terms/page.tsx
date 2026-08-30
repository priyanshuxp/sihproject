export default function Terms() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-slate-100">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-sm text-slate-400 mb-8">Last updated: September 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="leading-relaxed text-slate-300">
            By accessing or using the Academia–Industry Collaboration Portal, you agree to comply with and be bound by these Terms and Conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. User Roles and Conduct</h2>
          <p className="leading-relaxed mb-2 text-slate-300">
            Users must provide accurate registration details and maintain the confidentiality of their credentials.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong className="text-slate-100">Students:</strong> Must submit authentic credentials, certifications, and portfolio details.</li>
            <li><strong className="text-slate-100">Industries:</strong> Must post verified internship, apprenticeship, and job listings.</li>
            <li><strong className="text-slate-100">Academicians & Institutions:</strong> Must use the platform strictly for educational collaboration and progress monitoring.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Intellectual Property</h2>
          <p className="leading-relaxed text-slate-300">
            All user-submitted content, including digital portfolios and project reports, remains the property of the respective user or institution.
          </p>
        </section>
      </div>
    </main>
  );
}