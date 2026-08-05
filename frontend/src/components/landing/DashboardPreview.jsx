import StatsCards from "./StatsCards";
import AnalyticsChart from "./AnalyticsChart";
import RecentApplications from "./RecentApplications";

function DashboardPreview() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-100 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-5xl font-bold text-gray-800">
            Dashboard Preview
          </h2>

          <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
            Manage students, companies, applications and placement
            analytics from one modern dashboard.
          </p>
        </div>

        {/* Dashboard Card */}
        <div
          data-aos="zoom-in-up"
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
        >

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 flex justify-between items-center">

            <h3 className="text-2xl font-bold">
              Admin Dashboard
            </h3>

            <button className="bg-white text-blue-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
              Logout
            </button>

          </div>

          {/* Stats */}
          <StatsCards />

          {/* Analytics */}
          <AnalyticsChart />

          {/* Recent Applications */}
          <RecentApplications />

        </div>

      </div>
    </section>
  );
}

export default DashboardPreview;