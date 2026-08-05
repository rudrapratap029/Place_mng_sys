import {
  FaUserGraduate,
  FaBuilding,
  FaClipboardList,
  FaAward,
} from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaUserGraduate size={40} />,
      number: "500+",
      title: "Students",
    },
    {
      icon: <FaBuilding size={40} />,
      number: "100+",
      title: "Companies",
    },
    {
      icon: <FaClipboardList size={40} />,
      number: "1500+",
      title: "Applications",
    },
    {
      icon: <FaAward size={40} />,
      number: "95%",
      title: "Placement Success",
    },
  ];

  return (
    <section className="py-24 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl font-bold">
            Placement Statistics
          </h2>

          <p className="mt-4 text-blue-100 text-lg">
            Trusted solution for managing campus placements efficiently.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <div
              key={index}
              data-aos="flip-left"
              className="bg-white/10 rounded-xl p-8 text-center hover:bg-white/20 transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h2 className="text-5xl font-bold">
                {item.number}
              </h2>

              <p className="mt-3 text-xl">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;