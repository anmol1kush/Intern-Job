import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/const';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/ApplicationSlice';



const AdminApplicant = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application );

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
                    { withCredentials: true }
                );
                
                dispatch( setAllApplicants(res.data.job.application))
                
            } catch (error) {
                console.error('Error fetching applicants:', error);
            }
        };

        if (params.id) fetchAllApplicants();
    }, [params.id, dispatch]);

    if (!applicants) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto">
                <h1 className="font-bold text-xl my-5">
                    Total Applicants: {applicants.length || 0}
                </h1>
                <ApplicantsTable
                    applicants={applicants.map((app) => ({
                        id: app._id,
                        jobId: app.job,
                        applicantDetails: app.applicant,
                        status: app.status,
                        createdAt: app.createdAt,
                    }))}
                />
            </div>
        </div>
    );
};

export default AdminApplicant;
