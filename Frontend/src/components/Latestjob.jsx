import React from 'react';
import LatestJobsCards from './LatestJobsCards';
import { useSelector } from 'react-redux';


const Latestjob = () => {
  const { allJobs } = useSelector((store) => store.job);

  
  return (
    <div>
      <div className="max-w-7xl mx-auto my-5 flex justify-center">
        <h1 className="text-4xl font-bold">
          <span className="text-purple-700">Latest & Top </span> Job Openings
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 my-5 w-3/4 mx-auto">
        {Array.isArray(allJobs) && allJobs.length > 0 ? (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobsCards  key={job._id} job={job} />
          ))
        ) : (
          <span>No Jobs Available</span>
        )}
      </div>
    </div>
  );
};

export default Latestjob;
