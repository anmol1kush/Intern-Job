import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/const';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function Navbar() {

    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async (e) => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);


        }

    }

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <h1 className="text-3xl font-bold">
                    Intern-<span className="text-red-800">Job</span>
                </h1>

                <div className="flex items-center gap-5">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role == "recruiter" ? (
                                <>
                                    <li> <Link to="/admin/companies">Companies</Link></li>
                                    <li> <Link to="/admin/jobs">Jobs</Link></li>
                                </>

                            ) : (
                                <>

                                    <li> <Link to="/">Home</Link></li>
                                    <li> <Link to="/jobs">Jobs</Link></li>
                                    <li> <Link to="/browse">Browse</Link></li>

                                </>

                            )
                        }


                    </ul>

                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-purple-800 hover:bg-purple-950">Signup</Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src={user?.profile?.profilephoto} alt="@shadcn" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-88">
                                <div className="flex gap-4 items-center space-y-2">
                                    <Avatar>
                                        <AvatarImage src={user?.profile?.profilephoto} alt="@shadcn" />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium">{user?.fullname}</h4>
                                        <p className="text-sm text-muted-foreground">{user?.profile?.bio} </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    {
                                        user && user.role == "student" && (
                                            <div className="flex space-x-3 items-center">
                                                <User2 />
                                                <Button variant="link"> <Link to="/profile"> View Profile</Link> </Button>
                                            </div>

                                        )
                                    }
                                    <div className="flex space-x-3 items-center mt-2">
                                        <LogOut />
                                        <Button onClick={logoutHandler} variant="link">Log-Out</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Navbar;
