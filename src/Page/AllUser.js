import React, { useEffect, useState } from 'react'
import UserLink from '../commen/index'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FiEdit3 } from "react-icons/fi";
import ChangeUserRoal from '../Page/ChangeUserRoal'
import '../App.css'

const AllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const [openUpdateUser, setOpenUpdateUser] = useState(false);
    const [updateDetails, setUpdateDetails] = useState({
        name: '',
        role: '',
        _id: ''
    });

    const fetchAllUser = async () => {
        try {
            const fetchData = await fetch(UserLink.allUser.url, {
                method: UserLink.allUser.method,
                credentials: 'include'
            });

            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setAllUser(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            toast.error('Failed to fetch users.');
        }
    }

    useEffect(() => {
        fetchAllUser();
    }, []);

    return (
        <div className='bg-white'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className='pb-9 mr-4xl bg-white'>
                    {
                        allUser.map((el, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.role}</td>
                                <td>{moment(el.createdAt).format('LL')}</td>
                                <td>
                                    <button
                                        className='br-white cursor-pointer'
                                        onClick={() => {
                                            setUpdateDetails(el);
                                            setOpenUpdateUser(true);
                                        }}
                                    >
                                        <FiEdit3 />
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                openUpdateUser && (
                    <ChangeUserRoal
                        onClose={() => setOpenUpdateUser(false)}
                        name={updateDetails.name}
                        email={updateDetails.email}
                        role={updateDetails.role}
                        userId={updateDetails._id}
                        callFunction={fetchAllUser}
                    />
                )
            }
        </div>
    )
}

export default AllUser;
