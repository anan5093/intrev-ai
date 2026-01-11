import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function DeveloperSection() {
  return (
    <section className="bg-black/60 backdrop-blur-md text-white py-16">
      <div className="max-w-5xl mx-auto px-6">

        {/* PROFILE */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
          <img
            src="/Anand.jpeg"
            alt="Anand Raj"
            className="w-44 h-44 rounded-full object-cover border-4 border-indigo-500 shadow-xl"
          />

          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3">
              Hi, I’m <span className="text-indigo-400">Anand Raj</span>
            </h2>

            <p className="text-gray-300 max-w-xl leading-relaxed">
               I’m the creator of <strong>Intrev-AI</strong>, an AI-powered interview
            practice platform built to help students and professionals prepare
            for real-world interviews using voice-based answers, smart analysis,
            and actionable insights. I build real-world
              full-stack applications with MERN, AI integrations, and
              production-ready UI/UX.
            </p>
          </div>
        </div>

        {/* PROJECTS */}
        <div>
          <h3 className="text-2xl font-semibold mb-6">
            Featured Projects
          </h3>

          <div className="grid md:grid-cols-2 gap-6">

            {/* SafeLink-AI */}
            <ProjectCard
              title="SafeLink-AI"
              description="AI-powered phishing & malicious URL detection platform with a live deployment."
              github="https://github.com/anan5093/SafeLink-AI.git"
              live="https://anan5093.github.io/SafeLink-AI/"
            />

            {/* SaaS Admin Dashboard */}
            <ProjectCard
              title="SaaS Admin Dashboard"
              description="Modern SaaS admin dashboard with analytics and role-based access."
              github="https://github.com/anan5093/saas-admin-dashboard.git"
            />

          </div>
        </div>

      </div>
    </section>
  );
}

function ProjectCard({ title, description, github, live }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-700 hover:border-indigo-500 transition">

      <h4 className="text-xl font-semibold mb-2 text-indigo-400">
        {title}
      </h4>

      <p className="text-gray-400 text-sm mb-4">
        {description}
      </p>

      <div className="flex gap-4">

        {/* GitHub */}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
        >
          <FaGithub />
          GitHub
        </a>

        {/* Live Demo (only if exists) */}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            <FaExternalLinkAlt />
            Live Demo
          </a>
        )}

      </div>
    </div>
  );
}
