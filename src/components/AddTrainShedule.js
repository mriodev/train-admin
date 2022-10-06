import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, collection, getDocs } from 'firebase/firestore';
import './shedule.css';
import './addTrain.css';



export default function AddTrainShedule(props) {
    const [passengers, setPassengers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let list = []
            try {

                const querySnapshot = await getDocs(collection(db, "trains"));
                querySnapshot.forEach((doc) => {
                    list.push({ ...doc.data(), id: doc.id });
                });
                setData(list)
                console.log(list)

            } catch (err) {
                console.log(err);
            }


        };
        fetchData();


        

    }, []);


    return (props.trigger) ? (
        <div className='add-new-train-card'>
            <div className="form-topic">

                <div className='col-sm-6'>
                    <div className="card-tools">
                        <button className='addbtn' onClick={() => props.setTrigger(false)} ><span>Close</span> </button>
                        {props.children}
                    </div>
                </div>
            </div>
            <form >
                <div className="form-content">

                    <div className="start-end-points">
                        <div className="train-start-point">
                            <label>Train</label>
                            <select>
                                <option>Select</option>
                                {data.map((t) => {
                                    return (
                                        <option key={t.id} value={t.trainName}>
                                            {t.trainName}
                                        </option>
                                    );
                                })}

                            </select>
                        </div>

                        <div className="train-start-time">
                            <label>Time</label>
                            <input type='time' />
                        </div>

                    </div>

                    <div className="start-end-points">
                        <div className="train-start-point">
                            <label>Start Point</label>
                            <input type='text' placeholder='Enter Start Point' />
                        </div>

                        <div className="tarin-end-point">
                            <label>End Point</label>
                            <input type='text' placeholder='Enter End Point' />
                        </div>
                    </div>

                    <div className="start-end-time">
                        <div className="train-stop-time">
                            <label>First Class Fare</label>
                            <input type='number' step='.01' />
                        </div>
                        <div className="train-stop-time">
                            <label>Economy Class Fare</label>
                            <input type='number' step='.01' />
                        </div>
                    </div>


                    <div className="button-row">
                        <button type='submit'> <i id='spinner-icon' className="fa fa-spinner" aria-hidden="true"></i> Add Shedule</button>
                    </div>

                </div>
            </form>
        </div>
    ) : ""
}