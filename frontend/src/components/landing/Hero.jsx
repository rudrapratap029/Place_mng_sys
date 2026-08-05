import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-indigo-900 text-white flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side */}
        <div data-aos="fade-right">

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Smart Placement
            <br />
            Management System
          </h1>

          <p className="mt-6 text-lg text-gray-300 leading-8">
            Manage students, companies, applications and placement records
            from one powerful dashboard. Designed for colleges, placement
            cells and administrators.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
            >
              Get Started
            </Link>

            <a
              href="#features"
              className="border border-gray-400 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-900 transition duration-300"
            >
              Explore Features
            </a>

          </div>

        </div>

        {/* Right Side */}
        <div
          className="flex justify-center"
          data-aos="zoom-in"
        >

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            alt="Placement Management"
            className="rounded-2xl shadow-2xl border border-white/10"
          />

        </div>

      </div>
    </section>
  );
}

export default Hero;