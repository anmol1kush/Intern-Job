import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

const filterData = [
  {
    filterType: 'Location',
    arrays: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    arrays: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
  },
  {
    filterType: 'Salary',
    arrays: ['0-40k', '42k-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCards = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    Location: '',
    Industry: '',
    Salary: '',
  });

  const handleFilterChange = (type, value) => {
    const newFilters = { ...selectedFilters, [type]: value };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters); // Notify parent about filter changes
  };

  return (
    <div className="ml-5 bg-white p-5 rounded-md shadow-md border border-gray-200">
      <h1 className="font-bold text-xl mb-4">Filter Jobs</h1>
      <hr className="mb-4" />
      <RadioGroup>
        {filterData.map((data, filterIndex) => (
          <div key={filterIndex} className="mb-6">
            <h1 className="font-bold text-lg mb-2">{data.filterType}</h1>
            {data.arrays.map((item, itemIndex) => {
              const id = `${data.filterType}-${itemIndex}`;
              return (
                <div key={id} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem
                    id={id}
                    value={item}
                    checked={selectedFilters[data.filterType] === item}
                    onChange={() => handleFilterChange(data.filterType, item)}
                  />
                  <Label htmlFor={id}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCards;
