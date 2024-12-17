import React from 'react';
import {firestore} from '../../firebase/firebase';
import { collection, getDoc, onSnapshot, doc, updateDoc, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {auth} from '../../firebase/firebase';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import onlineMed from '../../../public/assets/onlinemed.png';
import chart from '../../../public/assets/chart.png';

const DocPortalV2 = () => {
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [authUser, setAuthUser] = useState(null);
    const [notesForReview, setNotesForReview] = useState(null);
    const [selectedDocBody, setSelectedDocBody] = useState(null);
    const [sendNoteLoading, setSendNoteLoading] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [selectedNoteStatus, setSelectedNoteStatus] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedNoteBtn , setSelectedNoteBtn] = useState("Send");
    const [selectedPatientNotes, setSelectedPatientNotes] = useState(null);

    const [options] = useState([
        { value: 'Complete', label: 'Complete' },
        { value: 'Needs Review', label: 'Needs Review' },
        { value: 'Pending Info', label: 'Pending Info' },
        { value: 'Canceled', label: 'Canceled' }
    ]);

    const handleSelectChange = (event) => {
        setSelectedNoteStatus(event.target.value);
        setSelectedNoteBtn("Save");
    };

    useEffect(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(firestore, 'doctors', user.uid);
                const userData = await getDoc(docRef);
                setAuthUser({user, ...userData.data()});
            } else {
                setAuthUser(null);
                window.location.href = '/login';
            }
        });
    
        return () => {
            listen();
        };
    }, []);
    
    useEffect(() => {
        if (!authUser) return;
    
        const unsubscribe = onSnapshot(collection(firestore, 'notes'), (snapshot) => {
            const docs = [];
            snapshot.forEach((doc) => {
                if (authUser.states?.includes(doc.data().state)) {
                    docs.push({ id: doc.id, ...doc.data() });
                }
            });
            // Sort docs by status and timestamp
            const statusOrder = {
                'Needs Review': 1,
                'Pending Info': 2,
                'Completed': 3,
                'Canceled': 4
            };
    
            docs.sort((a, b) => {
                const statusA = statusOrder[a.status] || 4;
                const statusB = statusOrder[b.status] || 4;
    
                if (statusA !== statusB) {
                    return statusA - statusB;
                } else {
                    return a.timestamp - b.timestamp;
                }
            });
    
            setDocuments(docs);
            setLoading(false);
    
            const result = docs.filter((doc) => doc.status === 'Needs Review');
            setNotesForReview(result.length);
        });
    
        return () => {
            unsubscribe();
        };
    }, [authUser]);

    const handleDocClick = async (document) => {
        setSelectedDoc(document);
        setSelectedDocBody(document.noteBody);
        setSelectedNoteStatus(document.status);
        setSelectedStatus(document.status);

        console.log(document)


        let patientId;
        const patientsRef = collection(firestore, "patients");
        const q = query(patientsRef, where("email", "==", document.email));
        
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            patientId = querySnapshot.docs[0].id;
        } else {
            alert("Error retrieving patient data.");
        }

        const notesRef = collection(firestore, "notes");
        const notesQuery = query(notesRef, where("patientId", "==", patientId));
        const notesSnapshot = await getDocs(notesQuery);
        const notes = [];
        notesSnapshot.forEach((doc) => {
            if (doc.id !== document.id) {
            notes.push(`${new Date(doc.data().timeOffStart + "T00:00:00").toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})} - ${new Date(doc.data().timeOffEnd + "T00:00:00").toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}`);
            }
        });
        setSelectedPatientNotes(notes);
    };

    const closeModal = () => {
        setSelectedDoc(null);
    };
    
    const saveNote = async () => {
        try{
            setSendNoteLoading(true);
            const docRef = doc(firestore, 'notes', selectedDoc.id);
            await updateDoc(docRef, {
                status: selectedNoteStatus,
                noteBody: selectedDocBody
            });
            setSendNoteLoading(false);
            setSelectedNoteBtn("Send");
        } catch (error) {
            alert('An error occurred while saving the note. Please try again later.');
            console.log(error);
        };
    };

    const sendNote = async () => {
        setSendNoteLoading(true);
        const docRef = doc(firestore, 'notes', selectedDoc.id);

        console.log(selectedDocBody);

        try {
            await updateDoc(docRef, {
                noteBody: selectedDocBody
            });

            console.log(authUser.user.uid);

            await axios.post('http://localhost:4000/submitnote', {
                docId: selectedDoc.id,
                doctorId: authUser.user.uid,
            });

            setSendNoteLoading(false);
            setTimeout(() => {
                alert('Note sent successfully!'); 
                window.location.reload();
            }, 1000);

        } catch (error) {
            alert('An error occurred while sending the note. Please try again later.');
            console.log(error);
        }
        setSendNoteLoading(false);
    };

    const statusColors = {
        bg: {
            'Needs Review': 'bg-red-500',
            'Complete': 'bg-green-500',
            'Pending Info': 'bg-yellow-500',
            'Canceled': 'bg-orange-500',
        },
        text: {
            'Needs Review': 'text-red-500',
            'Complete': 'text-green-500',
            'Pending Info': 'text-yellow-500',
            'Canceled': 'text-orange-500',
        },
    };

    const profileMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='w-screen h-screen'>
            {selectedDoc && (
                        <div className='z-10 transition-all absolute w-screen h-screen bg-black bg-opacity-30 flex justify-end items-center px-10'>
                            <div className='h-[95%] pb-12 overflow-scroll w-[60%] bg-white rounded-2xl shadow-lg flex flex-col items-center'>
                                <div className='relative w-full py-6 border-b-2 border-[#ececef] flex items-center justify-center'>
                                    <p className='text-2xl font-medium'>Condition Summary</p>

                                    <img onClick={closeModal} className='absolute right-10 h-6 cursor-pointer transition-all' src="https://img.icons8.com/ios-glyphs/100/5F6984/delete-sign.png" alt="" />
                                </div>

                                <div className='mt-8 w-[90%] border-2 border-[#ececef] rounded-xl flex items-center justify-between px-4 py-4'>
                                    <div className='flex items-center gap-4'>
                                        <img className='w-16 h-16 rounded-full' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />

                                        <div>
                                            <p className='text-gray-500 text-sm font-medium'>Patient Name</p>
                                            <p className='text-2xl font-medium'>{selectedDoc?.firstName} {selectedDoc?.lastName}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-4'>
                                        <p className='text-sm font-medium text-gray-500'>Status</p>

                                        <select
                                            value={selectedNoteStatus}
                                            onChange={handleSelectChange}
                                            className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        >
                                            {options.map(option => (
                                                <option key={option.value} value={option.value}>
                                                {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='mt-8 w-[90%] border-b pb-10'>
                                    <p className='text-2xl font-medium'>General Info</p>

                                    <div className='grid grid-cols-2 pt-6 gap-y-12'>
                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Full Name</p>
                                            <p className='text-xl'>{selectedDoc?.firstName} {selectedDoc?.lastName}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Phone Number</p>
                                            <p className='text-xl'>--</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>DOB</p>
                                            <p className='text-xl'>--</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Email</p>
                                            <p className='text-xl'>{selectedDoc?.email}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Gender</p>
                                            <p className='text-xl'>{selectedDoc?.pronouns}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>State</p>
                                            <p className='text-xl'>{selectedDoc?.state || "--"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-9 w-[90%]'>
                                    <p className='text-2xl font-medium'>Condition Info</p>

                                    <div className='grid grid-cols-2 mt-9 gap-y-12 w-full'>
                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Condition</p>
                                            <p className='text-xl'>{selectedDoc?.reasoning}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Detailed Condition</p>
                                            <p className='text-xl'>{selectedDoc?.detailedReasoning}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Symptoms</p>
                                            <p className='text-xl w-4/5'>{selectedDoc?.symptoms}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Condition Disclosure</p>
                                            <p className='text-xl'>{selectedDoc?.conditionDisclosure === true ? "True" : "False"}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Purpose</p>
                                            <p className='text-xl'>{selectedDoc?.workOrSchool}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Start Date</p>
                                            <p className='text-xl'>{new Date(`${selectedDoc?.timeOffStart}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Return Date</p>
                                            <p className='text-xl'>{new Date(`${selectedDoc?.timeOffEnd}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Additional Info</p>
                                            <p className='text-xl'>{selectedDoc?.additionalInfo || "--"}</p>
                                        </div>

                                        <div className='flex flex-col gap-0.5'>
                                            <p className='font-medium text-gray-500'>Recent Notes</p>
                                            <ul className='flex flex-col gap-0.5 text-lg'>
                                                {
                                                    selectedPatientNotes?.length === 0 && <li>None</li>
                                                }
                                                {selectedPatientNotes?.map(note => (
                                                    <li key={`${note}-${Math.random()}`}>{note}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className='flex flex-col gap-4 col-span-2'>
                                            <p className='text-xl font-medium'>Note</p>
                                            <textarea value={selectedDocBody} onChange={(e)=>setSelectedDocBody(e.target.value)} className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" rows="8" placeholder="This is a textarea placeholder"></textarea>
                                        </div>

                                        <div className='-mt-1.5 w-full mx-auto grid grid-cols-2 gap-4 col-span-2'>
                                            <button onClick={closeModal} className='bg-gray-200 text-lg font-medium py-3 w-full rounded-xl'>Cancel</button>
                                            <button onClick={selectedNoteBtn === "Save" ? saveNote : sendNote} className='flex gap-2 justify-center items-center bg-blue-600 text-white text-lg font-medium py-3 w-full rounded-xl'>
                                                {sendNoteLoading && 
                                                    <div role="status">
                                                        <svg aria-hidden="true" className="inline w-5 h-5 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                }
                                                {sendNoteLoading ? 'Processing...' : selectedNoteBtn === "Save" ? "Save" : "Send"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            )}

            <div className='w-full h-fit border-b border-gray-200 flex'>
                <div className='border-r border-gray-200 pl-8 pr-12 flex items-center'>
                    <img className='h-[52px]' src={onlineMed} alt="" />
                </div>

                <div className='flex grow justify-between items-center px-8'>
                    <div className='flex flex-col justify-center py-4'>
                        <h1 className='text-xl font-medium'>Good Morning, {authUser?.drName || "--"}!</h1>
                        <p className='text-gray-500'>I hope you're in a good mood because there are {notesForReview || "--"} notes waiting for you</p>
                    </div>

                    <div className='flex gap-3'>
                        <button onClick={setProfileMenuOpen} className='w-10 h-10 rounded-full flex items-center justify-center overflow-hidden'>
                            <img className='h-full w-full object-cover' src={authUser?.profilePhoto} alt="" />
                        </button>

                        <div className="flex flex-col items-end relative" ref={profileMenuRef}>
                            <button onClick={() => setProfileMenuOpen(!profileMenuOpen)}>
                                <img className='w-7 hover:scale-95 transition-all' src="https://img.icons8.com/material-rounded/200/expand-arrow--v1.png" alt="" />
                            </button>

                            {profileMenuOpen && 
                                <div className="absolute border mt-12 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 min-w-60 bg-white shadow-md rounded-lg" role="menu" aria-orientation="vertical">
                                    <div className="p-1 space-y-0.5">
                                        <button onClick={()=>signOut(auth)} className="w-full flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-100">
                                            Log out
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full py-8'>
                <div className='w-[85%] py-6 bg-[#f5f5f5] border-2 border-[#eaeaec] rounded-xl mx-auto flex justify-center items-center'>
                    <div className='px-8 h-fit w-[85%] bg-white rounded-xl flex flex-col border-2 border-[#eaeaec]'>
                        <p className='text-xl font-medium py-5'>Notes</p>

                        <hr />

                        <div className='w-full flex justify-between items-center py-6'>
                            <div className='flex flex-col'>
                                <p className='font-medium text-3xl'>{notesForReview || "--"}</p>
                                <p className='text-gray-500'>Awaiting Review</p>
                            </div>

                            <img className='h-10' src={chart} alt="" />
                        </div>
                    </div>

                </div>

                <div className="mt-14 flex flex-col w-[85%] mx-auto">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    {loading &&
                                        <div className='pt-20 pb-14 w-screen md:-ml-32 text-center'>
                                            <div role="status">
                                                <svg aria-hidden="true" className="inline w-10 h-10 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Name</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">State</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission Timestamp</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {documents.map((doc) => (
                                            <tr onClick={() => handleDocClick(doc)} key={doc.id} className='hover:bg-gray-50 transition-all cursor-pointer'>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 text-left">{doc.firstName} {doc.lastName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{doc.email}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{doc?.state || "Idabo"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">{doc?.reasoning}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left">
                                                    {doc?.timestamp?.toDate().toLocaleString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: '2-digit',
                                                        hour12: true
                                                    })}
                                                </td>
                                                <td className={`${statusColors.text[doc.status]} flex gap-2.5 items-center px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-left`}>
                                                    <div className={`${statusColors.bg[doc.status]} w-4 h-4 rounded-full bg-green-500`}></div>
                                                    {doc.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocPortalV2;