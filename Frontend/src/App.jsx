import { useState } from 'react'


import './App.css'
import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import DetailsJobs from './components/DetailsJobs'
import Companies from './components/Admin/Companies'
import CompanyCreate from './components/Admin/CompanyCreate'
import CompanySetup from './components/Admin/CompanySetup'

import AdminJobs from './components/Admin/AdminJobs'
import AdminCreateJobs from './components/Admin/AdminCreateJobs'
import AdminApplicant from './components/Admin/AdminApplicant'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/details/:id',
    element:<DetailsJobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>


  },
  {
    path:'/admin/companies',
    element:<Companies/>
  },
  {
    path:'/admin/companies/create',
    element:<CompanyCreate/>
  },
  {
    path:'/admin/companies/:id',
    element:<CompanySetup/>
  },
  {
    path:'/admin/jobs',
    element:<AdminJobs/>
  },
  {
    path:'/admin/jobs/create',
    element:<AdminCreateJobs/>
  },
  {
    path:'/admin/jobs/:id/applicants',
    element:<AdminApplicant/>
  },


]

)

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
