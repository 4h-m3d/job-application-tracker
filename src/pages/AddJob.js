import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../contexts/JobsContext";

export default function AddJob() {
  const { addJob } = useJobs();
  const navigate = useNavigate();

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Applied");
  const [applicationDate, setApplicationDate] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!company.trim() || !title.trim()) {
      alert("Company and Title are required");
      return;
    }

    const newJob = {
      id: Date.now(), // numeric unique ID
      company: company.trim(),
      title: title.trim(),
      status,
      applicationDate,
      notes: notes.trim(),
    };

    addJob(newJob);
    navigate("/dashboard");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded max-w-lg w-full shadow-lg text-white"
      >
        <h2 className="text-2xl font-bold mb-6">Add New Job</h2>

        <label className="block mb-4">
          Company Name <span className="text-red-500">*</span>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            required
          />
        </label>

        <label className="block mb-4">
          Job Title <span className="text-red-500">*</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            required
          />
        </label>

        <label className="block mb-4">
          Application Status
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
          >
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
        </label>

        <label className="block mb-4">
          Application Date
          <input
            type="date"
            value={applicationDate}
            onChange={(e) => setApplicationDate(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
          />
        </label>

        <label className="block mb-6">
          Notes
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded px-3 py-2 text-black"
            rows={4}
          />
        </label>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 w-full py-3 rounded font-semibold"
        >
          Add Job
        </button>
      </form>
    </div>
  );
}
