import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import Cetogory from './Cetogory'
import Latestjob from './Latestjob'
import Footer from './Footer'
import useAllgetJobs from '@/hooks/useAllgetJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useAllgetJobs();
   const { user}= useSelector( store=> store.auth);
   const navigate= useNavigate();
   useEffect(()=>{
    if( user?.role=="recruiter"){
      navigate("/admin/companies");

    }


   },[]);
  return (
    <div>
     <Navbar/>
     <HeroSection/>
     <Cetogory/>
     <Latestjob/>
     <div className='bg-white w-full h-28'>

     </div>
     <Footer/>
    </div>
  )
}

export default Home
