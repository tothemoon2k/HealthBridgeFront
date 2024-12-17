import React from 'react';
import {firestore} from '../firebase/firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from '../firebase/firebase';
import { useState, useEffect } from 'react';
import axios from 'axios';

const DocPortal = () => {
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
                window.location.href = '/login';
            }
        });

        const fetchDocuments = async () => {
            const querySnapshot = await getDocs(collection(firestore, 'notes'));
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setDocuments(docs);
        };
        fetchDocuments();

        return () => {
            listen();
        };
    }, []);

    const handleDocClick = (document) => {
        setSelectedDoc(document);
    };

    const closeModal = () => {
        setSelectedDoc(null);
    };

    const sendNote = async () => {
        const docRef = doc(firestore, 'notes', selectedDoc.id);

        try {
            await updateDoc(docRef, {
                noteBody: selectedDoc.noteBody
            });

            await axios.post('http://localhost:4000/completenote', {
                docId: selectedDoc.id
            });

            alert('Note sent successfully!');

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            alert('An error occurred while sending the note. Please try again later.');
            console.log(error);
        }
    };

    return (
        <div className='relative w-screen h-fit bg-[#f8faff]'>
            <div className='w-[89%] mx-auto flex justify-between pt-5 pb-6 items-center'>
                <h1 className='text-2xl font-medium'>Hi Doc 👋</h1>

                <div className="max-w-sm">
                    <div className="relative">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                                <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                                </svg>
                            </div>
                            <input className="py-3 ps-10 pe-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" role="combobox" aria-expanded="false" placeholder="Type a name" data-hs-combo-box-input=""/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${selectedDoc ? 'flex' : 'hidden'} top-0 absolute z-30 bg-gray-800 bg-opacity-40 w-screen h-screen justify-center items-center  transition-all`}>
                <div className='relative bg-white w-3/4 h-3/4 rounded-2xl shadow-lg'>
                    <div className='w-full bg-gray-200 rounded-t-2xl flex items-center justify-between px-10 py-4'>
                        <h2 className='text-xl font-medium'>Patient Info</h2>

                        <img className='h-6 cursor-pointer hover:scale-95 transition-all' onClick={closeModal} src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="" />
                    </div>

                    <div className='w-full h-[90%] py-6 px-10 flex'>
                        <div className='w-1/2 h-fit grid grid-cols-2 gap-y-6'>
                            <div>
                                <p className='text-gray-500'>Patient Name</p>
                                <p className='text-xl font-medium'>{selectedDoc?.firstName} {selectedDoc?.lastName}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Days Off</p>
                                <p className='text-xl font-medium'>{selectedDoc?.numOfDays}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Reasoning</p>
                                <p className='text-xl font-medium'>{selectedDoc?.reasoning}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Start Date</p>
                                <p className='text-xl font-medium'>{selectedDoc?.timeOffStart}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Detailed Reasoning</p>
                                <p className='text-xl font-medium'>{selectedDoc?.detailedReasoning || "N/A"}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Return Date</p>
                                <p className='text-xl font-medium'>{selectedDoc?.timeOffEnd}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Symptoms</p>
                                <p className='text-xl font-medium'>{selectedDoc?.symptoms || "N/A"}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Condition Disclosure</p>
                                <p className='text-xl font-medium'>{selectedDoc?.conditionDisclosure === true ? "Yes" : selectedDoc?.conditionDisclosure === false ? "No" : "N/A"}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Work or School?</p>
                                <p className='text-xl font-medium'>{selectedDoc?.workOrSchool}</p>
                            </div>

                            <div>
                                <p className='text-gray-500'>Additional Info</p>
                                <p className='text-xl font-medium'>{selectedDoc?.additionalInfo || "N/A"}</p>
                            </div>
                        </div>

                        <div className='w-1/2 h-full flex flex-col items-center'>
                            <div className="w-4/5 h-1/2 mb-12">
                                <label htmlFor="input-label" className="block font-medium mb-2">Note Body</label>
                                <textarea 
                                    id="input-label" 
                                    className="py-3 px-4 h-full block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" 
                                    placeholder="Note Body" 
                                    value={selectedDoc?.noteBody || ""} 
                                    onChange={(e) => setSelectedDoc({...selectedDoc, noteBody: e.target.value})}
                                />
                            </div>

                            <div className='w-4/5 flex flex-col items-end gap-4'>
                                <p className='text-gray-500'>Characters Remaining: {selectedDoc?.noteBody ? 250 - selectedDoc.noteBody.length : 500}</p>
                                <button onClick={sendNote}  className='flex items-center gap-3 bg-black text-white py-3 px-4 rounded-xl font-medium'>Send <img className='h-6' src="https://img.icons8.com/ios-glyphs/70/ffffff/filled-sent.png" alt="Long arrow" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white h-fit w-[90%] mx-auto py-9 px-12 rounded-3xl'>
                <div className='mb-6 flex items-center justify-between'>
                    <div>
                        <h2 className='text-2xl font-medium'>For Your Review</h2>
                        <p className='text-gray-500'>Medical Notes</p>
                    </div>

                    <div className='flex items-center gap-4'>
                        <div className="max-w-sm">
                            <div className="relative">
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                                        <svg className="shrink-0 size-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                        </svg>
                                    </div>
                                    <input className="py-3 ps-10 pe-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" type="text" role="combobox" aria-expanded="false" placeholder="Type a name" data-hs-combo-box-input=""/>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <select className="peer p-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
                            focus:pt-6
                            focus:pb-2
                            [&:not(:placeholder-shown)]:pt-6
                            [&:not(:placeholder-shown)]:pb-2
                            autofill:pt-6
                            autofill:pb-2">
                                <option>Open this select menu</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                            <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                                peer-focus:text-xs
                                peer-focus:-translate-y-1.5
                                peer-focus:text-gray-500
                                peer-[:not(:placeholder-shown)]:text-xs
                                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                                peer-[:not(:placeholder-shown)]:text-gray-500">Filter</label>
                        </div>
                    </div>
                </div>

                <div className="mb-7 flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg shadow overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Submission Time</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Days Off</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Reasoning</th>
                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Detailed Reasoning</th>
                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">

                                    {documents.map((doc) => (
                                        <tr className='cursor-pointer transition-all hover:bg-gray-100' key={doc.id} onClick={() => handleDocClick(doc)}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{doc.timestamp.toDate().toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{doc.firstName} {doc.lastName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{doc.numOfDays}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{doc.reasoning}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{doc.detailedReasoning || "N/A"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                                                <p className={`flex justify-center items-center px-1 py-2 rounded-lg border ${
                                                    doc.status === "Complete" ? "bg-blue-200 text-blue-500 border-blue-500" :
                                                    doc.status === "Needs Review" ? "bg-red-200 text-red-500 border-red-500" :
                                                    doc.status === "Pending Info" ? "bg-yellow-200 text-yellow-500 border-yellow-500" : ""
                                                }`}>
                                                    {doc.status}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex justify-end items-center gap-x-1" aria-label="Pagination">
                    <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Previous" disabled="">
                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        <span>Previous</span>
                    </button>
                    <div className="flex items-center gap-x-1">
                        <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none" aria-current="page">1</button>
                        <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">2</button>
                        <button type="button" className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">3</button>
                    </div>
                    <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" aria-label="Next">
                        <span>Next</span>
                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default DocPortal;