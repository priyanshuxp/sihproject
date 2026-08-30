export default function About() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-slate-100">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      
      <p className="text-lg leading-relaxed mb-6">
        Welcome to the Centralized Academia–Industry Collaboration Portal, an initiative developed under the Ministry of Ayush and the All India Institute of Ayurveda. Our platform bridges the gap between academic learning and industry expectations by fostering direct collaboration among students, academicians, and industry partners.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="leading-relaxed text-slate-300">
            To create a unified ecosystem that enables skill mapping, streamlines internship opportunities, and enhances placement readiness for students while offering academicians industrial exposure and research partnerships.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Key Objectives</h2>
          <ul className="list-disc pl-5 space-y-2 text-slate-300">
            <li>Identify technical and soft skill gaps using industry-aligned assessments.</li>
            <li>Match students with tailored internship and placement opportunities based on skill profiles.</li>
            <li>Facilitate industry exposure for academicians through Faculty Development Programs (FDPs) and research opportunities.</li>
            <li>Enable institutions to track student progression and career outcomes through centralized analytics.</li>
          </ul>
        </div>
      </section>
    </main>
  );
}