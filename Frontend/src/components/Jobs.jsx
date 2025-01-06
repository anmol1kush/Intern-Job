import React from 'react';
import Navbar from './shared/Navbar';
import FilterCards from './FilterCards';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const motionConfig = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
    transition: { duration: 0.3 },
  };

  const jobList = Array.isArray(allJobs) ? allJobs : [];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row gap-5 justify-evenly mt-5">
        {/* Filter Sidebar */}
        <div className="w-full lg:w-60 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition duration-300">
          <FilterCards />
        </div>

        {/* Jobs Section */}
        <div className="flex flex-col items-center w-full lg:w-[75vw]">
          {jobList.length <= 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No jobs found. Please adjust your filters or try again later.
            </div>
          ) : (
            <div className="flex overflow-y-auto pb-5 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-4">
                {jobList.map((job) => (
                  <motion.div {...motionConfig} key={job?._id}>
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
