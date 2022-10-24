import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useNavigate, useParams } from "react-router-dom"
import '../components/addTrain.css';
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';


import NavBar from '../components/NavBar';

import '../utils/baseLayout.css';

export default function UpdateTrain() {
    const navigate = useNavigate();
    const params = useParams();

    const [tno, setNo] = useState([]);
    const [name, setName] = useState([]);
    const [fcapacity, setFcapacity] = useState([]);
    const [ecapacity, setEcapacity] = useState([]);
    const trainId = params.trainId;

    const update = async (e) => {
        e.preventDefault()
        const train = doc(db, "trains", trainId)
        const data = { economyclassCap: ecapacity, firstClassCap: fcapacity, trainName: name, trainno: tno }
        await updateDoc(train, data)
        toast.success('New Train Added Successfully')
        navigate('/list-of-trains')
    }

    const getDataById = async (trainId) => {
        const TrainData = await getDoc(doc(db, "trains", trainId))
        if (TrainData.exists()) {
            //console.log(TrainData.data())
            setNo(TrainData.data().trainno)
            setName(TrainData.data().trainName)
            setFcapacity(TrainData.data().firstClassCap)
            setEcapacity(TrainData.data().economyclassCap)

        } else {
            console.log('there are No Trains')
        }
    }
    useEffect(() => {

        getDataById(trainId)


    }, [trainId]);
    return (
        <div className="container">
            <nav className="sidebarNav">
                <NavBar></NavBar>
            </nav>
            <div className="pageContent">
                <div className='add-new-train-card'>
                    <div className="form-topic">

                        <div className='col-sm-6'>
                            <div className="card-tools">
                                <button className='addbtn' ><span>Close</span> </button>

                            </div>
                        </div>
                    </div>
                    <form onSubmit={update} >
                        <div className="form-content">

                            <div className="start-end-points">
                                <div className="train-start-point">
                                    <label>Train No</label>
                                    <input type='text' value={tno} onChange={(e) => setNo(e.target.value)} placeholder='Enter Train No' readOnly />
                                </div>

                                <div className="tarin-end-point">
                                    <label>Train Name</label>
                                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Train Name' />
                                </div>
                            </div>

                            <div className="start-end-points">
                                <div className="train-start-point">
                                    <label>First Class Seat Capacity</label>
                                    <input type='text' value={fcapacity} onChange={(e) => setFcapacity(e.target.value)} placeholder='Enter Seat Capacity' />
                                </div>

                                <div className="tarin-end-point">
                                    <label>Ecnomy Seat Capacity</label>
                                    <input type='text' value={ecapacity} onChange={(e) => setEcapacity(e.target.value)} placeholder='Enter Seat Capacity' />
                                </div>
                            </div>


                            <div className="button-row">
                                <button type='submit'> <i id='spinner-icon' className="fa fa-spinner" aria-hidden="true"></i> Update Train</button>
                                <button type='submit'> <i id='spinner-icon' className="fa fa-spinner" aria-hidden="true"></i> Back</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )


}