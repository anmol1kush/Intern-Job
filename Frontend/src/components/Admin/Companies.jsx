import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState(""); // State for search input
  const dispatch = useDispatch();

  // Fetch all companies
  useGetAllCompanies();

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
          <Button onClick={() => navigate("/admin/companies/create")}>
            New company
          </Button>
        </div>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;
