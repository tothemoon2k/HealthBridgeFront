import React from 'react';
import { useState, useEffect } from 'react';
import {firestore} from '../firebase/firebase';
import { collection, getDocs, updateDoc, doc, onSnapshot } from "firebase/firestore";

const ReceptionistPortal = () => {
    const [docs, setDocs] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    console.log('Selected doc:', selectedDoc);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(firestore, 'notes'), (snapshot) => {
            const updatedDocs = [];
            snapshot.forEach((doc) => {
                updatedDocs.push({ id: doc.id, ...doc.data() });
            });
            updatedDocs.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
            setDocs(updatedDocs);
            console.log('Updated docs:', updatedDocs);
        }, (error) => {
            console.error("Error fetching documents:", error);
        });

        return () => unsubscribe();
    }, []);

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showDropdown && !event.target.closest('.hs-dropdown-menu') && !event.target.closest('.dropdown-button')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    const patientData = [
        "Jon Bones Jones",
        "https://www.google.com",
        {
            label: "Timestamp",
            value: "11/12/24 9:05AM"
        },
        {
            label: "Status",
            value: "Completed"
        },
        {
            label: "Reason",
            value: "Illness - Flu"
        },
        {
            label: "Pronouns",
            value: "He/Him/His"
        },
        {
            label: "Location",
            value: "Work"
        },
        {
            label: "Symptoms",
            value: "Drowsiness and cough"
        },
        {
            label: "Absence Period",
            value: "11/12/24 - 11/13/24"
        },
        {
            label: "Additional Info",
            value: "N/A"
        },
        {
            label: "Contact Email",
            value: "johnathanbones@gmail.com"
        },
    ];

    return (
        <div className='w-screen h-screen px-14 pt-8'>
            <h1 className='text-3xl font-medium'>Hello Evano 👋🏼,</h1>

            {/* Create a ticket button and search input */}
            <div className='mt-10 flex justify-between'>
                <button className='flex items-center gap-3 bg-black text-white py-2.5 px-8 rounded-lg font-medium'>Create Ticket</button>

                <div className="max-w-sm">
                    <div className="relative">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                                <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                                </svg>
                            </div>
                            <input className="py-3 ps-10 pe-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" role="combobox" aria-expanded="false" placeholder="Type a name"  data-hs-combo-box-input=""/>
                        </div>

                        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg" style={{ display: 'none' }} data-hs-combo-box-output="">
                            <div className="max-h-72 rounded-b-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300" data-hs-combo-box-output-items-wrapper=""></div>
                        </div>
                    </div>
                </div>
            </div>

            {/*  */}
            <div className={`mt-10 w-full h-fit grid ${selectedDoc ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
                <div className='w-full h-fit flex flex-col gap-6'>

                    {docs.map((doc, index) => (
                        <div onClick={()=>setSelectedDoc(doc)} key={index} className='flex justify-between px-6 py-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all'>
                            <div className='flex flex-col gap-1'>
                                <p className='font-medium text-lg'>{doc.firstName} {doc.lastName}</p>
                                <p className='text-sm text-gray-500'>{doc.timestamp.toDate().toLocaleString()}</p>
                                <p className='text-sm text-gray-500'>{doc.reasoning} - {doc?.detailedReasoning}</p>
                            </div>

                            <div className='flex gap-2 items-center h-fit pr-4'>
                                <div className={doc.status === "Complete" ? "bg-green-500 h-4 w-4 rounded-full" : doc.status === "Needs Review" ? "bg-red-500 h-4 w-4 rounded-full" : "bg-yellow-500 h-4 w-4 rounded-full"}></div>
                                <p className={doc.status === "Complete" ? "text-green-500" : doc.status === "Needs Review" ? "text-red-500" : "text-yellow-500"}>{doc.status}</p>
                            </div>
                        </div>
                    ))}

                </div>

                <div className={selectedDoc ? 'relative w-full h-fit border border-gray-200 rounded-xl px-12 pb-10' : 'hidden'}>
                    <button onClick={()=>setSelectedDoc(null)} className='absolute bg-black p-2.5 rounded-full w-fit h-fit -top-4 -right-3 cursor-pointer transition-all'>
                        <img className='h-5' src="https://img.icons8.com/ios-glyphs/100/ffffff/delete-sign.png" alt="" />
                    </button>

                    <div className='flex justify-between border-b border-gray-200 pt-8 h-28'>
                        <div>
                            <p className='text-xl font-medium'>{selectedDoc?.firstName} {selectedDoc?.lastName}</p>
                            <p className='text-gray-500'>Medical Note Info</p>
                        </div>

                        <div className='flex flex-col items-end relative'>
                            <button onClick={handleDropdownClick} className='flex h-fit w-fit items-center gap-1 bg-black text-white py-2.5 px-8 rounded-lg font-medium hover:text-gray-200 transition-all'>
                                Actions <img className='h-4' src="https://img.icons8.com/ios-filled/50/ffffff/menu-2.png" alt="" />
                            </button>
                            {showDropdown && (
                                <div class="mt-3 hs-dropdown-menu transition-[opacity,margin] duration w-56 z-10 min-w-60 bg-white shadow-md rounded-lg p-2 border border-200" role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-example">
                                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="#">
                                    Issue Refund
                                    </a>
                                    <a class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100" href="#">
                                    Request Change
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='pt-8 grid grid-cols-2 gap-y-8'>
                        <div>
                            <p className='text-gray-500'>Timestamp</p>
                            <p className='text-lg font-medium'>{selectedDoc?.timestamp.toDate().toLocaleString()}</p>
                        </div>

                        <div>
                            <p className='text-gray-500'>Status</p>
                            <div className='flex gap-2 items-center h-fit pr-4'>
                                <div className={selectedDoc?.status === "Complete" ? "bg-green-500 h-4 w-4 rounded-full" : selectedDoc?.status === "Needs Review" ? "bg-red-500 h-4 w-4 rounded-full" : "bg-yellow-500 h-4 w-4 rounded-full"}></div>
                                <p className={selectedDoc?.status === "Complete" ? "text-green-500" : selectedDoc?.status === "Needs Review" ? "text-red-500" : "text-yellow-500"}>{selectedDoc?.status}</p>
                            </div>
                        </div>

                        <div>
                            <p className='text-gray-500'>Reason</p>
                            <p className='text-lg font-medium'>{selectedDoc?.reasoning} - {selectedDoc?.detailedReasoning}</p>
                        </div>
                        
                        <div>
                            <p className='text-gray-500'>Pronouns</p>
                            <p className='text-lg font-medium'>{selectedDoc?.pronouns}</p>
                        </div>

                        <div>
                            <p className='text-gray-500'>Location</p>
                            <p className='text-lg font-medium'>{selectedDoc?.workOrSchool}</p>
                        </div>

                        <div>
                            <p className='text-gray-500'>Symptoms</p>
                            <p className='text-lg font-medium'>{selectedDoc?.symptoms}</p>
                        </div>

                        <div>
                            <p className='text-gray-500'>Absence Period</p>
                            <p className='text-lg font-medium'>{selectedDoc?.timeOffStart} - {selectedDoc?.timeOffEnd}</p>
                        </div>

                        <div>
                            <p className='text-gray-500'>Additional Info</p>
                            <p className='text-lg font-medium'>{selectedDoc?.additionalInfo || "N/A"}</p>
                        </div>

                        <div>
                            <p className='text-gray-500'>Contact Email</p>
                            <p className='text-lg font-medium'>{selectedDoc?.email}</p>
                        </div>
                    </div>

                    <div className='mt-7 w-full grid grid-cols-2 gap-4'>
                        <a href={patientData[1]} target="blank"  className='flex h-fit w-full justify-center items-center gap-1 bg-black text-white py-2.5 px-8 rounded-lg font-medium'>View Note <img className='h-4' src="https://img.icons8.com/fluency-systems-filled/50/ffffff/external-link.png" alt="" /></a>

                        <button onClick={() => {navigator.clipboard.writeText(patientData[1])}}  className='flex h-fit w-full justify-center items-center gap-1 bg-white text-black py-2.5 px-8 rounded-lg font-medium border border-gray-200 hover:bg-gray-50 transition-all'>Copy Link <img className='h-4' src="https://img.icons8.com/material-outlined/50/copy.png" alt="" /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceptionistPortal;