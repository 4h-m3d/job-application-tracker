import React, { createContext, useContext, useState, useEffect } from "react";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    // Load jobs from localStorage or start empty
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  function addJob(job) {
    setJobs((prev) => [...prev, { ...job, id: Date.now().toString() }]);
  }

  function updateJob(updatedJob) {
    setJobs((prev) =>
      prev.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
  }

  function deleteJob(id) {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  function getJobById(id) {
    return jobs.find((job) => job.id === id);
  }

  return (
    <JobsContext.Provider
      value={{ jobs, addJob, updateJob, deleteJob, getJobById }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobsContext);
}
