import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './addTrain.css';
import { doc, getDocs, collection, deleteDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import Swal from 'sweetalert2'
import AddTrainForm from './AddTrainForm';
import UpdateTrain from './UpdateTrain';
import { Link, Navigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function Listoftrains() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [btnpop, setPopup] = useState(false);
    const [btnupop, setuPopup] = useState(false);
    useEffect(() => {
        fetchData();

    }, []);

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


    const deleteTrain = async (id) => {
        const trainDoc = doc(db, "trains", id)
        await deleteDoc(trainDoc)
        console.log(trainDoc)
        fetchData();
    }

    const confirmDelete = (id) => {
        MySwal.fire({
            title: 'Remove the Selected Train',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //llamamos a la fcion para eliminar   
                deleteTrain(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }


    return (
        <div >
            <div className="header-card">
                <div className='rows'>
                    <div className='col-sm-6'>
                        <h3 className="card-title">List of Trains</h3>
                    </div>
                    <div className='col-sm-6'>
                        <div className="card-tools">
                            <button className='addbtn' onClick={() => setPopup(true)}><span>Add Train</span> </button>
                        </div>


                    </div>
                    <AddTrainForm trigger={btnpop} setTrigger={setPopup}></AddTrainForm>

                </div>
            </div>

            <div className='add-new-train-card'>
                <table className="table table-hover table-striped table-bordered">
                    <colgroup>
                        <col width={"20%"}>
                        </col>
                        <col width={"25%"}>
                        </col>
                        <col width={"25%"}>
                        </col>
                        <col width={"20%"}>
                        </col>

                    </colgroup>
                    <thead>
                        <tr className="bg-gradient-primary text-light">
                            <th>Train Number</th>
                            <th>Name</th>
                            <th>Capacity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {data.map((t) => (
                            <tr key={t.id} >

                                <td className="text-center px-1">{t.trainno}</td>
                                <td className="px-0">
                                    {/*<div className="px-1 border-bottom"><span className="text-muted fa fa-calendar"></span> Everyday</div>*/}
                                    <div className="px-1" style={{ padding: "5px" }}><span className="text-muted fa fa-clock"></span>{t.trainName}</div>
                                </td>
                                <td className="px-0">
                                    <div className="px-1 border-bottom"><span className="text-muted">First Class:</span> <b>{t.firstClassCap}</b></div>
                                    <div className="px-1" style={{ padding: "5px" }}><span className="text-muted">Economy:</span> <b>{t.economyclassCap}</b></div>
                                </td>

                                <td className="px-1" align="center">

                                    <a className="btnedit " style={{ alignContent: 'space-between' }} onClick={e => navigate(`/trains/update/${t.id}`)}  >Update <i className="fa fa-angle-right"></i></a>

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