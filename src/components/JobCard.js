import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
      <h3>{job.title}</h3>
      <p>{job.company}</p>
      <Link to={`/jobs/${job.id}`}>View Details</Link>
    </div>
  );
};

export default JobCard;
