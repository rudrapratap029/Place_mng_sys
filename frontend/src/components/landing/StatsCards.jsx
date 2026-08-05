function StatsCards() {
  const stats = [
    {
      title: "Students",
      value: "520+",
      icon: "👨‍🎓",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Companies",
      value: "120+",
      icon: "🏢",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Applications",
      value: "2.5K+",
      icon: "📄",
      color: "from-orange-500 to-yellow-500",
    },
    {
      title: "Placement Rate",
      value: "94%",
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8">

      {stats.map((item, index) => (

        <div
          key={index}
          data-aos="zoom-in"
          data-aos-delay={index * 100}
          className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
        >

          <div
            className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${item.color}`}
          ></div>

          <div className="p-6">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  {item.title}
                </p>

                <h2 className="text-3xl font-bold mt-2 text-gray-800">
                  {item.value}
                </h2>

              </div>

              <div className="text-5xl">
                {item.icon}
              </div>

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default StatsCards;