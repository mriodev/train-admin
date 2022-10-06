import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './navbar.css';
import styled from "styled-components";
import RegisterPage from '../pages/Register';

export default function NavBar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // logout current user
    localStorage.removeItem('loggedInUser');

    toast.success('Logout Success');

    // redirect to login page
    navigate('/login');

  }

  return (
    <div className='section'>
      <div className='top'>
        <div className='brand'>
          <h2>Train Ticket<br />Booking</h2>
        </div>
        <div className='toggle'></div>
        <div className='links'>
          <ul>
            <li className='active'>
              <a href='/'>
                <span>Dashbord</span>
              </a>
            </li>
            <li >
              <a href=''>
                <span>Reservations </span>
              </a>
            </li>
            <div className="nondis"> Maintenance</div>
            <hr></hr>
            <li>
              <a href='/passenger-list'>
                <span>Passenger Information</span>
              </a>
            </li>
            <li>
              <a href='/list-of-sch'>
                <span>Change Shedule</span>
              </a>
            </li>
            <li>
              <a href='/list-of-trains'>
                <span>Train Details</span>
              </a>
            </li>
            <li>
              <a href=''>
                <span>User Details</span>
              </a>
            </li>

            <button onClick={handleLogout}><li>Log Out</li></button>

          </ul>

        </div>
      </div>

    </div>

  )
}
