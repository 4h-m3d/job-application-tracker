import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../contexts/JobsContext";

export default function EditJob() {
  const { id } = useParams();
  const { getJobById, updateJob } = useJobs();
  const navigate = useNavigate();

  const job = getJobById(id);

  const [title, setTitle] = useState(job?.title || "");
  const [company, setCompany] = useState(job?.company || "");
  const [status, setStatus] = useState(job?.status || "Applied");
  const [notes, setNotes] = useState(job?.notes || "");

  // Ensure form populates if jobs loaded after mount
  useEffect(() => {
    if (job) {
      setTitle(job.title || "");
      setCompany(job.company || "");
      setStatus(job.status || "Applied");
      setNotes(job.notes || "");
    }
  }, [job]);

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold text-center">Job not found</h3>
          <div className="mt-4 text-center">
            <button onClick={() => navigate("/dashboard")} className="bg-indigo-600 text-white px-4 py-2 rounded">Back</button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(id, { title: title.trim(), company: company.trim(), status, notes });
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Job</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Position" className="w-full border p-2 rounded" required />
          <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="w-full border p-2 rounded" required />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded">
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" placeholder="Notes" className="w-full border p-2 rounded" />
          <button className="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
