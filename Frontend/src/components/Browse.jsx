import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useAllgetJobs from '@/hooks/useAllgetJobs';

const Browse = () => {
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useAllgetJobs();

  useEffect(() => {
    dispatch(setSearchedQuery(''));
    document.title = `Search Results (${allJobs?.length || 0})`;
  }, [dispatch, allJobs]);

  const jobList = Array.isArray(allJobs) ? allJobs : [];

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-2xl">Search Results ({jobList.length})</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {jobList.length === 0 ? (
            <p className="text-gray-500">No jobs found. Please try searching again.</p>
          ) : (
            jobList.map((job) => <Job key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
