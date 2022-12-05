import React, { useState } from 'react'

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../components/Header"

interface Props {
    
}

const ChangePass: React.FC<Props> = () => {

    const [oldPassword, setOldPassword] = useState<String>('')
    const [newPassword, setNewPassword] = useState<String>('')
    const navigate = useNavigate();

    return (
        <>
            <Header/>
            <ToastContainer/>
            <div className="min-h-screen w-screen flex font-sans items-center justify-center text-black bg-[#f1f5f9]">
                
                <div className="md:w-[60rem] w-full md:h-[35rem] h-screen flex flex-col md:flex-row justify-between rounded-lg drop-shadow-lg shadow-lg bg-white">
                    <div className="md:w-5/12 w-full md:h-full h-auto md:flex items-center justify-center bg-[#96b6c8] md:rounded-l-lg md:rounded-tr-none"
                        style={{
                            backgroundImage: 'url("/image/logo2.png")',
                            backgroundSize: '100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                    >
                    <div className="md:h-40 h-32 flex flex-col justify-between items-center">
                        
                        
                    </div>
                    </div>

                    <div className="h-full md:w-[59.33%] w-full flex items-center justify-center bg-[white] md:rounded-r-lg md:rounded-bl-none">
                    <form
                        className="w-5/6 h-5/6 flex flex-col justify-between items-center"
                        
                    >
                        <div className="w-4/5 h-full flex flex-col">
                        <p className="text-[#1A2238] font-semibold absolute md:text-base text-sm">
                            You can change your password 
                        </p>
                        <div className="flex flex-col h-full justify-center">

                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="old_password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={(e) => {
                                    setOldPassword(e.target.value)
                                }}
                                required
                            />
                            <label
                                htmlFor="last_name"
                                className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Old password
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input
                                type="password"
                                name="new_password"
                                id="floating_password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                onChange={(e) => {
                                    setNewPassword(e.target.value)
                                }}
                                required
                            />
                            <label
                                htmlFor="last_name"
                                className="peer-focus:font-medium absolute md:text-sm text-xs text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                New password
                            </label>
                        </div>
                        </div>
                    </div>

                    <div
                        className="rounded-md border border-[#1A2238] px-5 py-2 hover:bg-[#1A2238] hover:text-white trainsition-all duration-300 cursor-pointer"
                        onClick={() => {
                            
                            const token = localStorage.getItem('token')

                            const config = {
                                headers: { Authorization: `Bearer ${token}`,
                                
                                }
                            };
                            axios.put(`https://web-project-wzlk.onrender.com/chat-app/change-password/`,{
                                old_password: oldPassword,
                                new_password: newPassword
                            },config)
                                .then((res) => {
                                    // if (res.data.status==='OK') {
                                    //     const message = 'Reset password successfully!'
                                    //     toast.success(message, {
                                    //         position: "top-right",
                                    //         autoClose: 2000,
                                    //         hideProgressBar: false,
                                    //         closeOnClick: true,
                                    //         pauseOnHover: true,
                                    //         draggable: true,
                                    //         progress: undefined,
                                    //         theme: "light",
                                    //     });
                                    //     setTimeout(function() {
                                    //         navigate('/signup')
                                    //     },2000)
                                    // }
                                    console.log(res)
                                    if (res.data.status === 'success') {
                                        const message = res.data.message
                                        toast.success(message, {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light",
                                        });
                                        setTimeout(function() {
                                            navigate('/')
                                        },2000)
                                    }
                                })
                                .catch((err) => {
                                    console.log(err.message)
                                    const message = err.message
                                    toast.error(message, {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                })
                        }}
                    >
                        Reset now!
                    </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChangePass
