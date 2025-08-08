import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useJobs } from "../contexts/JobsContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { jobs, setJobs } = useJobs();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Delete job by id
  const deleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    }
  };

  // Export jobs as JSON file
  const handleExport = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jobs-export.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import jobs from JSON file
  const fileInputRef = useRef(null);

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedJobs = JSON.parse(event.target.result);
        if (Array.isArray(importedJobs)) {
          // Merge imported jobs with existing ones (avoid duplicates by id)
          const existingIds = new Set(jobs.map((job) => job.id));
          const merged = [
            ...jobs,
            ...importedJobs.filter((job) => !existingIds.has(job.id)),
          ];
          setJobs(merged);
          alert("Jobs imported successfully!");
        } else {
          alert("Invalid JSON format.");
        }
      } catch {
        alert("Failed to parse JSON.");
      }
      e.target.value = null; // reset input
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:flex md:flex-col`}
      >
        <div className="p-6 border-b border-white/30 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">{user?.name || "User"}</h2>
            <p className="text-sm opacity-80">Welcome back!</p>
          </div>
          <button
            className="md:hidden text-white text-2xl font-bold"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col p-6 space-y-4 flex-1">
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 rounded-lg py-2 font-semibold text-center"
          >
            Logout
          </button>

          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 rounded-lg py-2 font-semibold text-center"
          >
            Export Jobs
          </button>

          <button
            onClick={() => fileInputRef.current.click()}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg py-2 font-semibold text-center"
          >
            Import Jobs
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 md:ml-64">
        {/* Mobile hamburger button */}
        <button
          className="md:hidden mb-4 px-3 py-2 bg-white bg-opacity-20 rounded-lg"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          ☰ Menu
        </button>

        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold drop-shadow-lg">
            Job Application Tracker
          </h1>
          <p className="opacity-90 text-lg">
            Logged in as <span className="font-semibold">{user?.name || "User"}</span>
          </p>
        </header>

        <div className="mb-6">
          <Link
            to="/add-job"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded shadow"
          >
            + Add Job
          </Link>
        </div>

        <section className="bg-white bg-opacity-20 rounded-lg shadow-lg p-6 text-white backdrop-blur-sm">
          {jobs.length === 0 ? (
            <p className="text-center text-gray-200">
              No jobs added yet. Click "Add Job" to get started!
            </p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/30">
                  <th className="py-2 px-3">Title</th>
                  <th className="py-2 px-3">Company</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Date Applied</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map(({ id, title, company, status, date }) => (
                  <tr
                    key={id}
                    className="border-b border-white/20 hover:bg-white/10 transition-colors"
                  >
                    <td className="py-2 px-3">{title}</td>
                    <td className="py-2 px-3">{company}</td>
                    <td className="py-2 px-3">{status}</td>
                    <td className="py-2 px-3">{new Date(date).toLocaleDateString()}</td>
                    <td className="py-2 px-3 space-x-2">
                      <Link
                        to={`/jobs/${id}`}
                        className="bg-blue-600 hover:bg-blue-700 rounded px-3 py-1 text-sm font-semibold"
                      >
                        View
                      </Link>
                      <Link
                        to={`/edit-job/${id}`}
                        className="bg-yellow-500 hover:bg-yellow-600 rounded px-3 py-1 text-sm font-semibold"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteJob(id)}
                        className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
}
