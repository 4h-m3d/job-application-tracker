import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const success = signup(name, age, gender, email, password);
    if (success) {
      navigate("/login");
    } else {
      setError("Email already registered.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded max-w-md w-full text-white space-y-4"
      >
        <h2 className="text-2xl font-bold mb-6">Register</h2>
        {error && (
          <p className="text-red-400 font-semibold text-center">{error}</p>
        )}

        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            required
          />
        </label>

        <label>
          Age
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            min="0"
            required
          />
        </label>

        <label>
          Gender
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            required
          />
        </label>

        <label>
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
          Register
        </button>

        <p className="mt-6 text-center text-white/80">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-300 hover:text-indigo-500">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
