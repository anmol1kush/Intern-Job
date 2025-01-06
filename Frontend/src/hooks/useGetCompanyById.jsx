import { setSingleCompany } from '@/redux/companySlice';
import { setAllJobs } from '@/redux/jobSlice';
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/const';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetCompanybyId = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
               // const jobs = res.data.setAllJobs || res.data.jobs || []; // Adjust based on actual API response
              
         

     
                if (res.data && res.data) {
                    dispatch(setSingleCompany(res.data.company)); // Dispatch the correct key
                  } else {
                    console.error('No jobs found in API response');
                  }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchSingleCompany();
    }, [companyId,dispatch]);
};

export default useGetCompanybyId;
