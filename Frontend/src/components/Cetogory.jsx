import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const Cetogory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (category) => {
    dispatch(setSearchedQuery(category));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-10">
        <CarouselContent>
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Cetogory;