import {
  FaUserPlus,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus size={40} />,
      title: "Register Students",
      description:
        "Add and manage student details, academic records, branches and CGPA.",
    },
    {
      icon: <FaBuilding size={40} />,
      title: "Post Companies",
      description:
        "Create company drives with job roles, eligibility, packages and deadlines.",
    },
    {
      icon: <FaCheckCircle size={40} />,
      title: "Track Placements",
      description:
        "Monitor applications and update their status from Applied to Selected.",
    },
  ];

  return (
    <section
  id="how-it-works"
  className="py-24 bg-white"
>
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            How It Works
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Placement management in three simple steps.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {steps.map((step, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-gray-50 rounded-xl shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center text-blue-600 mb-5">
                {step.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {step.description}
              </p>

              <div className="mt-6 text-5xl font-bold text-gray-200">
                {index + 1}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;