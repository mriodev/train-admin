import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import './shedule.css';
import { useNavigate, useParams } from "react-router-dom"
import { async } from '@firebase/util';
import AddTrainShedule from './AddTrainShedule';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function TrainShedule() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [btnpop, setPopup] = useState(false);
    useEffect(() => {
        fetchData();

    }, []);


    const fetchData = async () => {
        let list = []
        try {

            const querySnapshot = await getDocs(collection(db, "schedule"));
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id });
            });
            setData(list)
            console.log(list)

        } catch (err) {
            console.log(err);
        }


    };


    const deleteSchedule = async (id) => {
        const trainDoc = doc(db, "schedule", id)
        await deleteDoc(trainDoc)
        fetchData();
    }

    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Remove the Selected Schedule',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //llamamos a la fcion para eliminar   
                deleteSchedule(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }


    return (
        <div>
            <div className="header-card">
                <div className='rows'>
                    <div className='col-sm-6'>
                        <h3 className="card-title">List of Schedule</h3>
                    </div>
                    <div className='col-sm-6'>
                        <div className="card-tools">
                            <button className='addbtn' onClick={() => setPopup(true)} ><span>Add Schedule</span> </button>
                        </div>
                    </div>
                    <AddTrainShedule trigger={btnpop} setTrigger={setPopup}></AddTrainShedule>

                </div>

            </div>
            <div className='add-new-train-card'>
                <table className="table table-hover table-striped table-bordered">
                    <colgroup>
                        <col width={"15%"}>
                        </col>
                        <col width={"15%"}>
                        </col>
                        <col width={"20%"}>
                        </col>
                        <col width={"20%"}>
                        </col>
                        <col width={"30%"}>
                        </col>
                    </colgroup>
                    <thead>
                        <tr className="bg-gradient-primary text-light">
                            <th>Train</th>
                            <th>Schedule</th>
                            <th>Route</th>
                            <th>Fare</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((t) => (
                            <tr key={t.id}>

                                <td className="text-center px-1">{t.trainName}</td>
                                <td className="px-0">
                                    <div className="px-1 border-bottom"><span className="text-muted fa fa-calendar"></span> Everyday</div>
                                    <div className="px-1" style={{ padding: "5px" }}><span className="text-muted fa fa-clock"></span>{t.time}</div>
                                </td>
                                <td className="px-0">
                                    <div className="px-1 border-bottom"><span className="text-muted">From:</span> <b>{t.routeFrom}</b></div>
                                    <div className="px-1" style={{ padding: "5px" }}><span className="text-muted">To:</span> <b>{t.routeTo}</b></div>
                                </td>
                                <td className="px-0">
                                    <div className="px-1 border-bottom"><span className="text-muted">First Class:</span> <span className="text-muted fa fa-user"></span> <b><i className='fa fa-question' title='Slot depends to the date you desire.'></i></b> <span className="text-muted ml-2 fa fa-tag"></span> <b>{t.fclassfare}</b></div>
                                    <div className="px-1" style={{ padding: "5px" }}><span className="text-muted">Economy:</span> <span className="text-muted fa fa-user"></span> <b><i className='fa fa-question' title='Slot depends to the date you desire.'></i></b> <span className="text-muted ml-2 fa fa-tag"></span> <b>{t.eclassfare}</b></div>
                                </td>

                                <td className="px-1" align="center">
                                    <a className="btnedit " style={{ alignContent: 'space-between' }} onClick={e => navigate(`/schedule/update/${t.id}`)}   >Change <i className="fa fa-angle-right"></i></a>
                                    <a className="btndelete " onClick={() => confirmDelete(t.id)} >Delete <i className="fa fa-angle-right"></i></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}