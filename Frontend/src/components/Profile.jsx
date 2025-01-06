import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedTable from './AppliedTable';
import UpdateProfile from './UpdateProfile';
import { useSelector } from 'react-redux';
import useGetAllAppliedJob from '@/hooks/useGetAllAppliedJob';

const Profile = () => {
  useGetAllAppliedJob();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  console.log("User",user)

  const hasResume = user?.profile?.resume;
  console.log( hasResume)
  const skills = Array.isArray(user?.profile?.skills) && user.profile.skills.length === 1
    ? user.profile.skills[0].split(' ').map(skill => skill.trim()) // Split the single string by spaces
    : user?.profile?.skills || []; // If it's already an array, use it directly

  

  return (
    <div>
      <Navbar />

      <div className="flex justify-center">
        <div className="flex justify-center w-[60vw] items-center">
          <div className="w-full bg-white border border-gray-200 rounded-2xl my-5 p-8">
            {/* Profile Header */}
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user?.profile?.profilephoto} // Dynamically load profile picture
                    alt="User Profile Picture"
                  />
                </Avatar>
                <div>
                  <h1 className="font-medium text-xl">{user?.fullname || 'N/A'}</h1>
                  <p>{user?.profile?.bio || 'No bio available'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                  <Pen />
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="my-5">
              <div className="flex gap-4 items-center m-2">
                <Mail />
                <span>{user?.email || 'Email not available'}</span>
              </div>
              <div className="flex gap-4 items-center m-2">
                <Contact />
                <span>{user?.phonenumber || 'Phone number not available'}</span>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h1 className="font-bold my-2">Skills</h1>
              <div className="flex items-center gap-5 flex-wrap">
                {skills.length > 0 ? (
                  skills.map((item, index) => (
                    <Badge className="bg-purple-700 text-white my-1" key={index}>
                      {item}
                    </Badge>
                  ))
                ) : (
                  <span>No skills added</span>
                )}
              </div>
            </div>

            {/* Resume Section */}
            <div className="grid w-full max-w-sm items-center gap-2 mt-5">
              <Label className="text-md font-bold">Resume</Label>
              {hasResume ? (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={user.profile.resume}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  {user.profile.resumeOriginalName || 'View Resume'}
                </a>
              ) : (
                <span>No resume uploaded</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl p-5">
        <h1 className="font-bold text-xl mb-5">Applied Jobs</h1>
        <AppliedTable />
      </div>

      {/* Update Profile Modal */}
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
