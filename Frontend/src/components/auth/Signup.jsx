import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Link, useNavigate } from 'react-router-dom';
import { CloudCog, Loader2 } from 'lucide-react';
import { USER_API_END_POINT } from '@/utils/const';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Button } from '../ui/button';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate= useNavigate();
  const loading= useSelector((state)=>state.auth.loading);
  const dispatch= useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData= new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phonenumber",input.phonenumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
      formData.append("file",input.file);

    }

    try {
            dispatch(setLoading(true));
      const res= await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials: true,
      })
       console.log( "res", res);
      if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
              }
     
    } catch (error) {
      console.log(error);
      
    }finally{
            dispatch(setLoading(false));
          }

  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form onSubmit={submitHandler}

          className="w-1/3 border border-gray-200 rounded-md p-6 shadow-md bg-white"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Sign Up</h1>
          <div className="my-4">
            <Label htmlFor="fullName" className="block mb-2 font-medium">
              Full Name
            </Label>
            <Input id="fullName" type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Anmol" required />
          </div>
          <div className="my-4">
            <Label htmlFor="email" className="block mb-2 font-medium">
              Email
            </Label>
            <Input id="email" type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="anmol@gmail.com" required />
          </div>
          <div className="my-4">
            <Label htmlFor="phone" className="block mb-2 font-medium">
              Phone Number
            </Label>
            <Input id="phone" type="text" value={input.phonenumber} name="phonenumber" onChange={changeEventHandler} placeholder="123456789" required />
          </div>
          <div className="my-4">
            <Label htmlFor="password" className="block mb-2 font-medium">
              Password
            </Label>
            <Input id="password" type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Password" required />
          </div>
          <div className="flex items-center space-x-5">

            <RadioGroup className="flex gap-5" defaultValue="student">
              <div className="flex items-center space-x-2">
                <Input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role == "student"}
                  onChange={changeEventHandler}

                  className="cursor-pointer"
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role == "recruiter"}
                  onChange={changeEventHandler}

                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className='flex items-center gap-2'>
              <Label> Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          {
            loading? <Button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 mt-5 "><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 mt-5"
          >
            Sign Up
          </button>
          }
          <div className='mt-5 text-sm'>
            <span >Already have an account? <Link to="/login" className='text-blue-700'>Login</Link></span>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Signup;
