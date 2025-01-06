import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/const';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';

import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input,setInput]= useState({
      
      email:"",
      
      password:"",
      role:"",
    
   });
   const dispatch= useDispatch();
   const loading= useSelector((state)=>state.auth.loading);
    const changeEventHandler=(e)=>{
     setInput({...input,[e.target.name]:e.target.value});
    }
  

    const navigate= useNavigate();
    
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        
        dispatch(setLoading(true));
        const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
    
        if (response.data.success) {
          dispatch(setUser(response.data.user));
          toast.success(response.data.message);
          navigate("/"); // Correct usage of navigate
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Login failed!");
      } finally{
        dispatch(setLoading(false));
      }
    };
    
  


  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={submitHandler}
          className="w-1/3 border border-gray-200 rounded-md p-6 shadow-md bg-white"
        >
          <h1 className="font-bold text-2xl mb-5 text-center">Login</h1>
          
          <div className="my-4">
            <Label htmlFor="email" className="block mb-2 font-medium">
              Email
            </Label>
            <Input id="email" type="email"  value={input.email} name="email" onChange={changeEventHandler}  placeholder="anmol@gmail.com" required />
          </div>

          <div className="my-4">
            <Label htmlFor="password" className="block mb-2 font-medium">
              Password
            </Label>
            <Input id="password" type="password"  value={input.password} name="password" onChange={changeEventHandler}  placeholder="Password" required />
          </div>
          <div className="flex items-center space-x-5">

            <RadioGroup className="flex gap-5" defaultValue="student">
              <div className="flex items-center space-x-2">
              <Input
                  id="student"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role=="student"}
                  onChange={changeEventHandler}

                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                  id="recruiter"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role=="recruiter"}
                  onChange={changeEventHandler}

                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          
          </div>
          {
            loading? <Button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 mt-5 "><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button> : <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 mt-5"
          >
            Login
          </button>
          }

         
          <div className='mt-5 text-sm'>
          <span >Don't have an account? <Link to="/signup" className='text-blue-700'>Sign in</Link></span>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default Login;

