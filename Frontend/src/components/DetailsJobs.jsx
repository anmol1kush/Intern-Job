import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/const';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const DetailsJobs = () => {
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);

    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (singleJob?.application) {
            setIsApplied(singleJob.application.some(application => application.applicant === user?._id));
        }
    }, [singleJob, user?._id]);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, { withCredentials: true });
                if (res.data?.job) {
                    dispatch(setSingleJob(res.data.job));
                } else {
                    console.error('Job not found in API response');
                }
            } catch (error) {
                console.error('Error fetching job:', error);
            }
        };

        fetchSingleJob();
    }, [jobId, dispatch]);

    const applyJobHandler = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                const updatedSingleJob = {
                    ...singleJob,
                    application: [...(singleJob.application || []), { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                setIsApplied(true);
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const {
        title = 'N/A',
        position = 'N/A',
        jobtype = 'N/A',
        salary = 'N/A',
        location = 'N/A',
        description = 'N/A',
        experienceLevel = 'N/A',
        requirements = 'N/A',
        application = [],
    } = singleJob || {};

    return (
        <div className="max-w-7xl mx-auto my-auto">
            <h1 className="font-bold text-xl">{title}</h1>
            <div className="flex justify-between">
                <div className="flex items-center gap-5 mt-4">
                    <Badge className="text-blue-700 font-bold" variant="ghost">{`${position} Positions`}</Badge>
                    <Badge className="text-red-700 font-bold" variant="ghost">{jobtype}</Badge>
                    <Badge className="text-purple-700 font-bold" variant="ghost">{`${salary} LPA`}</Badge>
                </div>
                <div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied || loading}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-700 hover:bg-[#5f32ad]'}`}
                    >
                        {loading ? 'Applying...' : isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
            </div>
            <h1 className="my-5 font-medium">Job Description</h1>
            <hr className="border border-b-gray-300 my-3 font-medium" />
            <div>
                <h1 className="font-bold my-1">Role: <span className="font-normal pl-4 text-gray-800">{title}</span></h1>
                <h1 className="font-bold my-1">Location: <span className="font-normal pl-4 text-gray-800">{location}</span></h1>
                <h1 className="font-bold my-1">Description: <span className="font-normal pl-4 text-gray-800">{description}</span></h1>
                <h1 className="font-bold my-1">Experience: <span className="font-normal pl-4 text-gray-800">{`${experienceLevel} yrs`}</span></h1>
                <h1 className="font-bold my-1">Salary: <span className="font-normal pl-4 text-gray-800">{`${salary} LPA`}</span></h1>
                <h1 className="font-bold my-1">Total Applicants: <span className="font-normal pl-4 text-gray-800">{application.length}</span></h1>
                <h1 className="font-bold my-1">Required Skills: <span className="font-normal pl-4 text-gray-800">{requirements}</span></h1>
            </div>
        </div>
    );
};

export default DetailsJobs;
