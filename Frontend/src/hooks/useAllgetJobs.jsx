import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/const';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useAllgetJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery}=useSelector(store=> store.job)
    console.log( "Search",searchedQuery)

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, { withCredentials: true });
               
             
         
              console.log("res",res.data)
     
                if (res.data && res.data.jobs) {
                    dispatch(setAllJobs(res.data.jobs)); // Dispatch the correct key
                  } else {
                    console.error('No jobs found in API response');
                  }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchAllJobs();
    }, [dispatch]);
};

export default useAllgetJobs;
