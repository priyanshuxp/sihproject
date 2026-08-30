export default function Privacy() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-slate-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: September 2026</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="leading-relaxed mb-2">
            We collect personal and academic data required to provide skill-mapping and placement services:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Profile data (Name, Academic records, Email, Institution).</li>
            <li>Skill assessments, certifications, and uploaded resumes.</li>
            <li>Usage metrics and recruitment progress tracking.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
          <p className="leading-relaxed">
            Your data is used to evaluate skill proficiency, generate recommendation profiles, match students with industry opportunities, and provide analytics for educational institutions.
          </p>
        </section>
      </div>
    </main>
  );
}