import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { toast } from 'react-toastify';
import { db } from '../firebase';

import './register.css'
import { async, uuidv4 } from '@firebase/util';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const RegisterPage = () => {
    /*
        const navigate = useNavigate();
    
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            const isLoggedIn = localStorage.getItem('loggedInUser') ? localStorage.getItem('loggedInUser') : null;
    
            if (isLoggedIn) {
                // redirect to the dashboard page
                navigate('/');
            } else {
                setLoading(false);
            }
        }, []);*/


    const { auth: { user } } = useContext(AuthContext);
    const navigate = useNavigate();
    const [name, setName] = useState([]);
    const [email, setEmail] = useState([]);
    const [phone, setphno] = useState([]);
    const [password, setpw] = useState([]);
    const [confirmPassword, setcPassword] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            toast.error('All fields are requried');
            setLoading(false);
            return;
        }

        // eslint-disable-next-line
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Email address is not in valid format');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords are not match');
            setLoading(false);
            return;
        }

        // create firebase user with email and password
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const uid = userCredentials.user.uid;

                // add this user into admins collection with default isAdmin as false
                return setDoc(doc(db, 'admin', uid), { Adname: name, Ademail: email, Adphone: phone, isAdmin: true });

            })
            .then(() => {
                toast.success('Registration Success');
                setLoading(false);
                navigate('/login');
            })
            .catch(err => {
                setLoading(false);
                toast.error('Registration failed. please try again');
            })

    }

    /*useEffect(() => {
            const uploadFile = () => {
                const name = new Date().getTime() + file.name
                console.log(name)
                const storageRef = ref(Storage, file.name);
    
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        setPerc(progress)
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        console.log(error)
                        // Handle unsuccessful uploads
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                        });
                    }
                );
            };
            file && uploadFile();
        }, [file]);*/
    /*
        const handleAdd = async (e) => {
            e.preventDefault()
    
            if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
                toast.error('All fields are requried');
                return;
            }
    
            if (password !== confirmPassword) {
                toast.error('Passwords are not match');
                return;
            }
            const res = await addDoc(collection(db, "admin"), {
                id: uuidv4(),
                name: name,
                email: email,
                phone: phone,
                username: username,
                password: password
            }).then(res => {
                alert("Note Added !")
                setName("");
                setEmail("");
                setphno("");
                setUser("");
                setpw("");
                navigate('/login');
            }).catch(err => {
                alert("Failed Attempt !")
            });
    
        }*/
    {/*  const handleSubmit = e => {
        e.preventDefault();

        const username = e.target[0].value;
        const password = e.target[1].value;
        const confirmPassword = e.target[2].value;

        if (username.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            toast.error('All fields are requried');
            return;
        }

        if (password !== confirmPassword) {
            toast.error('Passwords are not match');
            return;
        }

        // assume that user registration success
        const user = {
            username,
            password
        }

        const users = localStorage.getItem('registeredUsers') ? JSON.parse(localStorage.getItem('registeredUsers')) : [];

        users.push(user);

        localStorage.setItem('registeredUsers', JSON.stringify(users));

        toast.success('Registration Success');

        // registration success user saved in the database therefore redirect to login page
        navigate('/login');
    }*/}

    return (
        loading ? (<p>Loading...</p>) : (
            <div className='regbody'>
                <div className="regcontainer">

                    <h1 className='title'>SIGN UP</h1>
                    <div className="content">

                        <form onSubmit={handleSubmit}  >
                            {/*
                            <div className='profile'>
                                <img style={{}}
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                    }
                                    alt=""
                                />
                                <div className='file'>
                                    <label htmlFor="file">
                                        Profile: <DriveFolderUploadOutlinedIcon className="icon" />
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        style={{ display: "none" }}
                                    />
                                </div>
                                </div>*/}

                            <div className="user-details">

                                <div className="input-box">
                                    <span className="details">Full Name</span>
                                    <input type="text" placeholder="Enter your name" value={name} onChange={(e) => { setName(e.target.value) }} required />
                                </div>

                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input type="text" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input type="text" placeholder="Enter your number" value={phone} onChange={(e) => { setphno(e.target.value) }} required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input type="text" placeholder="Enter your password" value={password} onChange={(e) => { setpw(e.target.value) }} required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input type="text" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => { setcPassword(e.target.value) }} required />
                                </div>
                            </div>
                            <p>If you already have an account <Link style={{ color: '#ffc107', textDecoration: 'none' }} to='/login'>Login</Link></p>

                            <div className='btnContainer' style={{ marginTop: '10px' }}>
                                <button disabled={loading} className='btn'>  {loading ? <i className="fa fa-spinner" aria-hidden="true"></i> : 'Register'}</button>
                            </div>
                        </form>
                    </div>
                </div></div>
        )
    );
}

export default RegisterPage;
