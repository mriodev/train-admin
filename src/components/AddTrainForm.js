import { useState, useEffect } from 'react';
import './addTrain.css';
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { useNavigate, useParams } from "react-router-dom"

export default function AddTrainForm(props) {
    const navigate = useNavigate();
    const [tno, setNo] = useState([]);
    const [name, setName] = useState([]);
    const [fcapacity, setFcapacity] = useState([]);
    const [ecapacity, setEcapacity] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        setLoading(true);

        const newTrain = {
            trainno: tno.trim(),
            trainName: name,
            firstClassCap: fcapacity.trim(),
            economyclassCap: ecapacity.trim(),
        }

        const { trainno: trainNo, trainName: trainName, firstClassCap: firstCapacity, economyclassCap: economyCapacity } = newTrain;

        if (!trainNo || !trainName || !firstCapacity || !economyCapacity) {
            setLoading(false);
            toast.error('Invalid values for fields. make sure all values are valid');
            return;
        }
        const colRef = collection(db, 'trains');
        addDoc(colRef, newTrain)
            .then(res => {
                setNo('');
                setName('');
                setFcapacity('');
                setEcapacity('');
                toast.success('New Train Added Successfully')

            })
        navigate('/list-of-trains')
    }

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
            <form onSubmit={handleSubmit}>
                <div className="form-content">

                    <div className="start-end-points">
                        <div className="train-start-point">
                            <label>Train No</label>
                            <input type='text' placeholder='Enter Train No' onChange={e => setNo(e.target.value)} value={tno} />
                        </div>

                        <div className="tarin-end-point">
                            <label>Train Name</label>
                            <input type='text' placeholder='Enter Train Name' onChange={e => setName(e.target.value)} value={name} />
                        </div>
                    </div>

                    <div className="start-end-points">
                        <div className="train-start-point">
                            <label>First Class Seat Capacity</label>
                            <input type='text' placeholder='Enter Seat Capacity' onChange={e => setFcapacity(e.target.value)} value={fcapacity} />
                        </div>

                        <div className="tarin-end-point">
                            <label>Ecnomy Seat Capacity</label>
                            <input type='text' placeholder='Enter Seat Capacity' onChange={e => setEcapacity(e.target.value)} value={ecapacity} />
                        </div>
                    </div>


                    <div className="button-row">
                        <button type='submit'> <i id='spinner-icon' className="fa fa-spinner" aria-hidden="true"></i> Add New Train</button>
                    </div>

                </div>
            </form>
        </div>
    ) : ""
}
