import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded max-w-md w-full text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && (
          <p className="mb-4 text-red-400 font-semibold text-center">{error}</p>
        )}
        <label className="block mb-4">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            required
          />
        </label>
        <label className="block mb-6">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 w-full py-3 rounded font-semibold"
        >
          Log In
        </button>

        <p className="mt-6 text-center text-white/80">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-300 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
