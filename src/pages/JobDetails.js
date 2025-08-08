import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useJobs } from "../contexts/JobsContext";

export default function JobDetails() {
  const { id } = useParams();
  const { getJobById } = useJobs();
  const navigate = useNavigate();

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white">
        <h2 className="text-3xl font-bold mb-4">Job Not Found</h2>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-indigo-700 px-4 py-2 rounded hover:bg-indigo-100"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white">
      <div className="bg-white/10 backdrop-blur-lg rounded-lg shadow-lg p-8 max-w-xl w-full">
        <h2 className="text-3xl font-bold mb-6">{job.title}</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Status:</strong> {job.status}</p>
        <p><strong>Application Date:</strong> {job.applicationDate}</p>
        {job.notes && (
          <p className="mt-4 whitespace-pre-wrap">
            <strong>Notes:</strong> {job.notes}
          </p>
        )}
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
