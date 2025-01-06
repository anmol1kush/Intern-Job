import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';

const AppliedTable = () => {
  // Accessing the applied jobs from the Redux store
  const { allAppliedJobs } = useSelector((store) => store.job);



  return (
    <div>
      <Table>
        <TableCaption>List of Your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs?.length > 0 ? (
            allAppliedJobs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{new Date(item?.createdAt).toLocaleDateString() || "N/A"}</TableCell>
                <TableCell>{item?.job?.title || "N/A"}</TableCell>
                <TableCell>{item?.job?.company?.name || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Badge className={`${item?.status === "Rejected" ? "bg-red-600" :
                      item?.status === "Accepted" ? "bg-green-600" :
                        "bg-gray-600"
                    }`}>
                    {item?.status || "N/A"}
                  </Badge>

                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs applied yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedTable;
