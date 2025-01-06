import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/const';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';

const UpdateProfile = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullname: user?.fullname,
        email: user?.email,
        phonenumber: user?.phonenumber,
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map(skill => skill),
        file: user?.proflie?.resume
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("bio", input.bio);
        formData.append("phonenumber", input.phonenumber);
        formData.append("skills", input.skills);
        if (input.file) {

            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message);

        }finally{
            setLoading(false);
        }

        setOpen(false);



        console.log(input)

    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }





    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="sm-max-w-[425px]"
                    onInteractOutside={() => setOpen(false)}
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description"
                >
                    <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className="grid grid-cols-4 items-center gap-4 my-3">
                            <Label htmlFor="name" className="text-left">
                                Name:
                            </Label>
                            <Input id="name" name="name" type="text" value={input.fullname} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 my-3">
                            <Label htmlFor="email" className="text-left">
                                Email:
                            </Label>
                            <Input id="email" name="email" value={input.email} type="email" onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 my-3">
                            <Label htmlFor="phone" className="text-left">
                                Number:
                            </Label>
                            <Input id="phone" name="phone" value={input.phonenumber} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 my-3">
                            <Label htmlFor="bio" className="text-left">
                                Bio:
                            </Label>
                            <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 my-3">
                            <Label htmlFor="skills" className="text-left">
                                Skills:
                            </Label>
                            <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 my-3">
                            <Label htmlFor="file" className="text-left">
                                Resume:
                            </Label>
                            <Input
                                id="file"
                                name="file"
                                type="file"
                                onChange={fileChangeHandler}
                                accept="application/pdf"
                                className="col-span-3"
                            />
                        </div>
                        <DialogFooter>
                            {
                                loading ? <Button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 mt-5 "><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> : <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition duration-200 mt-5"
                                >
                                    Update
                                </button>
                            }


                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UpdateProfile;
