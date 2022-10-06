import { Routes, Route, BrowserRouter, Link, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from './pages/Dahsbord';
import SheduleList from './pages/Schedulelist';
import TrainList from './pages/Listoftrains';
import PassengerDetailsPage from './pages/PassengerDetails';
import UpdateTrain from './components/UpdateTrain';
import UpdateSchedule from './components/UpdateSchedule';
import ProtectedRoute from './utils/ProtectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import { db } from './firebase'
import { collection, getDocs, deleteDoc, doc, userDoc } from 'firebase/firestore'
import AuthProvider from './context/authContext';
const App = () => {
  const colRef = collection(db, 'admin')

  getDocs(colRef)
    .then((snapshot) => {
      console.log(snapshot.docs)
    })

  return (
    <>
      <ToastContainer position='top-center' />


      <AuthProvider>
        <Routes>
          <Route path='/trains/update/:trainId' element={<UpdateTrain />} ></Route>
          <Route path='/schedule/update/:scheduleId' element={<UpdateSchedule />} ></Route>
          <Route path='/passenger-list' element={<PassengerDetailsPage />} ></Route>
          <Route path='/list-of-sch' element={<ProtectedRoute children={<SheduleList />}></ProtectedRoute>} />
          <Route path='/list-of-trains' element={<ProtectedRoute children={<TrainList />}></ProtectedRoute>} />
          <Route path='/schedule' element={<ProtectedRoute children={<SheduleList />} > </ProtectedRoute>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/' element={<ProtectedRoute children={<DashboardPage />} />} />
        </Routes>
      </AuthProvider>
      {/*        <Routes>
        <Route path='/trains/update/:trainId' element={<UpdateTrain />} ></Route>
        <Route path='/schedule/update/:scheduleId' element={<UpdateSchedule />} ></Route>
        <Route path='/list-of-trains' element={<TrainList />} />
        <Route path='/trains-schedule' element={<Schedule />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<DashboardPage />} />
      </Routes>*/}
    </>
  );
}

export default App;