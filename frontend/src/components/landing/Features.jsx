import {
  FaUserGraduate,
  FaBuilding,
  FaClipboardList,
  FaChartBar,
  FaShieldAlt,
  FaSearch,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaUserGraduate size={35} />,
      title: "Student Management",
      desc: "Manage student profiles, CGPA, branch, contact details and placement records.",
    },
    {
      icon: <FaBuilding size={35} />,
      title: "Company Management",
      desc: "Add companies, job roles, packages, eligibility criteria and application deadlines.",
    },
    {
      icon: <FaClipboardList size={35} />,
      title: "Application Tracking",
      desc: "Track every application from Applied to Selected or Rejected in one place.",
    },
    {
      icon: <FaChartBar size={35} />,
      title: "Dashboard Analytics",
      desc: "Visual insights for students, companies and placement statistics.",
    },
    {
      icon: <FaShieldAlt size={35} />,
      title: "Secure Authentication",
      desc: "JWT Authentication with role-based authorization for administrators.",
    },
    {
      icon: <FaSearch size={35} />,
      title: "Search & Pagination",
      desc: "Quick search with pagination for faster and smoother management.",
    },
  ];

  return (
   <section
  id="features"
  className="py-24 bg-gray-100"
>
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div
          className="text-center mb-14"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            Powerful Features
          </h2>

          <p className="mt-4 text-gray-600 text-lg">
            Everything required to manage campus placements
            efficiently.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              className="bg-white rounded-xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition duration-300"
            >
              <div className="text-blue-600 mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;