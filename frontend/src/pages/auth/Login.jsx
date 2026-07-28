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

      // Save Tokens
      localStorage.setItem(
        "accessToken",
        response.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        response.data.refreshToken
      );

      // Save Admin Data
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-4xl font-extrabold text-center text-blue-600">
          Placement Management System
        </h1>

        <p className="text-center text-gray-500 mt-3 text-lg">
          Admin Login
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;