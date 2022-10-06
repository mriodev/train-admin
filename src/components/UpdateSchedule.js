import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useNavigate, useParams } from "react-router-dom"
import '../components/addTrain.css';
import { query, where, getDoc, getDocs, updateDoc, doc, collection } from "firebase/firestore";
import { async } from '@firebase/util';

import NavBar from '../components/NavBar';

import '../utils/baseLayout.css';



export default function UpdateSchedule() {

    const navigate = useNavigate();
    const params = useParams();

    const [tno, setNo] = useState([]);
    const [name, setName] = useState([]);
    const [routeFrom, setRoutefrom] = useState([]);
    const [time, setTime] = useState('HH:mm');
    const [routeTo, setRouteto] = useState([]);
    const [fclassfare, setFclassfare] = useState([]);
    const [eclassfare, setEclassfare] = useState([]);
    const scheduleId = params.scheduleId;

    const update = async (e) => {
        e.preventDefault()
        const shedule = doc(db, "schedule", scheduleId)
        const data = { eclassfare: eclassfare, fclassfare: fclassfare, routeFrom: routeFrom, routeTo: routeTo, time: time }
        await updateDoc(shedule, data)
        navigate('/list-of-sch')
    }

    const getDataById = async (scheduleId) => {
        const TrainData = await getDoc(doc(db, "schedule", scheduleId))
        if (TrainData.exists()) {
            //console.log(TrainData.data())
            setNo(TrainData.data().trainno)
            setName(TrainData.data().trainName)
            setFclassfare(TrainData.data().fclassfare)
            setEclassfare(TrainData.data().eclassfare)
            setRoutefrom(TrainData.data().routeFrom)
            setRouteto(TrainData.data().routeTo)
            setTime(TrainData.data().time)

        } else {
            console.log('there are No Trains')
        }
    }


    const timevalue = time;
    useEffect(() => {

        getDataById(scheduleId)


    }, []);

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
                    <form onSubmit={update}>
                        <div className="form-content">

                            <div className="start-end-points">
                                <div className="train-start-point">
                                    <label>Train</label>
                                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} readOnly placeholder='Enter Train Name' />
                                </div>

                                <div className="train-start-time">
                                    <label>Time</label>
                                    <input type='time' value={timevalue} onChange={(e) => setTime(e.target.value)} />
                                </div>

                            </div>

                            <div className="start-end-points">
                                <div className="train-start-point">
                                    <label>Start Point</label>
                                    <input type='text' value={routeFrom} onChange={(e) => setRoutefrom(e.target.value)} placeholder='Enter Start Point' />
                                </div>

                                <div className="tarin-end-point">
                                    <label>End Point</label>
                                    <input type='text' value={routeTo} onChange={(e) => setRouteto(e.target.value)} placeholder='Enter End Point' />
                                </div>
                            </div>

                            <div className="start-end-time">
                                <div className="train-stop-time">
                                    <label>First Class Fare</label>
                                    <input type='number' value={fclassfare} onChange={(e) => setFclassfare(e.target.value)} step='.01' />
                                </div>
                                <div className="train-stop-time">
                                    <label>Economy Class Fare</label>
                                    <input type='number' value={eclassfare} onChange={(e) => setEclassfare(e.target.value)} step='.01' />
                                </div>
                            </div>


                            <div className="button-row" style={{ marginBottom: '30px' }}>
                                <button type='submit'> <i id='spinner-icon' className="fa fa-spinner" aria-hidden="true"></i> Update Shedule</button>
                                <button type='submit'> <i id='spinner-icon' className="fa fa-spinner" aria-hidden="true"></i> Back</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}