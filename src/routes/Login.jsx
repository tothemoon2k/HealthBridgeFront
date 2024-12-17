import React from 'react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import sidePhoto from '../../public/assets/docPortalLogin.png';

const Login = () => {
    const [email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                window.location.href = '/docportalv2';
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        };
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-screen h-screen flex'>
            <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                <div className='w-1/2 flex flex-col'>
                    <h1 className='text-4xl font-medium mb-12'>Welcome back <br />Doc!</h1>

                    <div className='mb-10 max-w-sm relative'>
                        <div className="mb-5 max-w-sm relative">
                            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
                                placeholder="g.house@onlinemed.tech"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="max-w-sm">
                            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="py-3 px-4 block w-full border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className='mt-9 absolute h-fit right-0 w-fit self-end flex items-center gap-3 bg-black text-white py-2.5 px-4 rounded-xl font-medium' onClick={handleLogin}>
                            Login 
                            <img className='h-8' src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" />
                        </button>
                    </div>
                </div>
            </div>

            <div className='w-1/2 h-full bg-[#0A2D60] flex justify-center items-center'>
                <img className='h-full object-cover' src={sidePhoto} alt="" />
            </div>
        </div>
    );
};

export default Login;