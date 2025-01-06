import { setCompanies } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/const';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllCompanies = (companyId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/`, { withCredentials: true });
        console.log(res.data.company)

        // Check the structure of the API response
        if (res.data && res.data.companies) {
          dispatch(setCompanies(res.data.companies)); // Dispatch companies if available
        } else {
          console.error('No companies found in API response');
        }
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, [dispatch]); // Added dispatch to the dependency array

};

export default useGetAllCompanies;
