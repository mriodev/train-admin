import React from 'react'
import BaseLayout from '../utils/BaseLayout';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './dashbord.css';

export default function DashboardPage() {
    const [trainCount, setTrainCount] = useState(0);

    useEffect(() => {
        const colRef = collection(db, 'trains');
        getDocs(colRef)
            .then(snapshot => {
                const tot = snapshot.size
                console.log(tot)
                setTrainCount(tot);

            })
    })

    const content = (
        <div>
            <div className="dashbord-item-row">
                <div className="total ticket-box">
                    <p>Total Tickets</p>
                    <p className='dasbord-item-amount'>05</p>
                </div>

                <div className="total income-box">
                    <p>Total Trains</p>
                    <p className='dasbord-item-amount'>{trainCount}</p>
                </div>

                <div className="total passenger-box">
                    <p>Total Passengers</p>
                    <p className='dasbord-item-amount'>05</p>
                </div>
            </div>
            {/* Sales Content*/}
            <div className='sales-boxes'>
                <div className='recent-sale box'>
                    <div className='title'> Recent Sales</div>
                    <div className='sales-details'>


                    </div>
                </div>

            </div>
        </div>



    )


    return <BaseLayout children={content} />

}
