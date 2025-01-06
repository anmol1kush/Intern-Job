import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import AdminJobstable from './AdminJobstable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';

const AdminJobs = () => {
   useGetAllAdminJobs(); 
  const navigate = useNavigate();
  const [input, setInput] = useState(""); // State for search input
  const dispatch = useDispatch();



  // Dispatch search text whenever it changes
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)} // Update input state
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>
      </div>
      <AdminJobstable/>
    </div>
  );
};

export default AdminJobs;

