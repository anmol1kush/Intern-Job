import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate= useNavigate();
  const jobId= " rwgrgv";
  return (
    <div className=" p-5 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition duration-300">
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark className="w-5 h-5" />
        </Button>
      </div>

      {/* Middle Section */}
      <div className="flex items-center gap-4 my-4">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={job?.company?.logo}
            alt="Company Logo"
          />
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold text-gray-800">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      {/* Bottom Section */}
     <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
      <p className="text-sm text-gray-600 ">{job?.description}</p>
     </div>
     <div  className="flex items-center gap-5 mt-4 justify-evenly" >
      <Badge className={"text-blue-700 font-bold "} variant={"ghost"}> {job?.position} Positions</Badge>
      <Badge className={" text-red-700 font-bold "} variant={"ghost"}> {job?.jobtype}</Badge>
      <Badge className={"text-purple-700 font-bold "} variant={"ghost"}>{job?.salary}</Badge>



    </div>
    <div className="flex items-center gap-4 mt-4">
        <Button  onClick={()=> navigate(`/details/${job?._id}`)} variant="outline">
          Details
        </Button>
        <Button variant="outline" className="bg-purple-700 text-white">Save For Later</Button>

    </div>
    </div>
  );
};

export default Job;
