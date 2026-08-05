import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      console.log("Login Success");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

      {/* Animated Background */}
      <div className="absolute -top-40 -left-40 w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] border border-white/20 p-10">

        <div className="flex justify-center mb-5">

          <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-xl">

            <span className="text-4xl text-white">
              🎓
            </span>

          </div>

        </div>

        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          PlacePro
        </h1>

        <p className="text-center text-gray-500 mt-2 text-lg">
          Placement Management System
        </p>

        <p className="text-center text-gray-400 text-sm mb-8">
          Admin Login Portal
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full px-5 py-3 rounded-xl border border-gray-300 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-[1.02] hover:shadow-2xl transition duration-300 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;