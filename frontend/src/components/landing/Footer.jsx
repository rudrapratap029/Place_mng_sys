import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div
        className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12"
        data-aos="fade-up"
      >
        {/* Project Info */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Placement Management System
          </h2>

          <p className="leading-7">
            A complete web-based platform to manage students,
            companies, applications and campus placements.
            Built using the MERN Stack with a modern UI.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">
            <li>
              <a
                href="#home"
                className="hover:text-white transition"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#features"
                className="hover:text-white transition"
              >
                Features
              </a>
            </li>

            <li>
              <a
                href="#how-it-works"
                className="hover:text-white transition"
              >
                How It Works
              </a>
            </li>

            <li>
              <a
                href="/login"
                className="hover:text-white transition"
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* Connect With Me */}
        <div>
          <h3 className="text-2xl font-semibold text-white mb-5">
            Connect With Me
          </h3>

          {/* Email */}
          <a
            href="mailto:rudrapratap292005@gmail.com"
            className="flex items-center gap-3 mb-4 hover:text-blue-400 transition"
          >
            <FaEnvelope className="text-xl" />
            <span>rudrapratap292005@gmail.com</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/rudrapratap029"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 mb-4 hover:text-blue-400 transition"
          >
            <FaGithub className="text-xl" />
            <span>GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/rudra-pratap-singh-52bab1288/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:text-blue-400 transition"
          >
            <FaLinkedin className="text-xl" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400">
        © 2026 <span className="font-semibold">Rudra Pratap Singh</span>. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;