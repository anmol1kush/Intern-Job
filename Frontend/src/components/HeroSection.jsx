import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    
    dispatch(setSearchedQuery(query));
   
    navigate("/browse");
  };

  return (
    <div>
      <div className="text-center">
        <span className="px-4 py-2 rounded-full bg-gray-100 text-red-600 font-bold mt-3">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold mt-5">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-purple-700">Dream Jobs</span>
        </h1>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          fuga tenetur dolores sed blanditiis! Sunt?
        </p>
        <div className="flex w-full md:w-[40%] shadow-lg border border-gray-400 pl-3 rounded-full items-center gap-4 mx-auto mt-4">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            className="outline-none border-none w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-purple-700 hover:bg-purple-800 transition"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
