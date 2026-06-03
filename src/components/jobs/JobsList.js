import JobCard from "./JobCard";

export default function JobsList({ jobs }) {
  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <JobCard key={job._id || job.id} job={job} />
      ))}
    </div>
  );
}
