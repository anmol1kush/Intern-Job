import { setAllAdminJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/const';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/admin`, { withCredentials: true });
              //  const jobs = res.data.setAllJobs || res.data.jobs || []; // Adjust based on actual API response
         

     
                if (res.data.success) {
                    dispatch(setAllAdminJobs(res.data.jobs)); // Dispatch the correct key
                  } else {
                    console.error('No jobs found in API response');
                  }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchAllAdminJobs();
    }, [dispatch]);
};

export default useGetAllAdminJobs;
