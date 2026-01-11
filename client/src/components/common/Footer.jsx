import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-6">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Creator Mark */}
        <p className="text-sm">
          © {new Date().getFullYear()} Built by{" "}
          <span className="text-white font-semibold">Anand Raj</span>
        </p>

        {/* Social Icons */}
        <div className="flex gap-5 text-xl">
          <a
            href="https://github.com/anan5093"
            target="_blank"
            className="hover:text-white"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/in/YOUR_LINKEDIN_ID"
            target="_blank"
            className="hover:text-white"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
