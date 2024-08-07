import {useEffect, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import Layout from './components/layout/Layout';
import Patients from './pages/patient/Patients';
import NewPatient from './pages/patient/NewPatient';
import EditPatient from './pages/patient/EditPatient';
import PatientHistory from './pages/patient/PatientHistory';
import PrescriptionHistory from './pages/patient/PrescriptionHistory';
import EditMedicine from './pages/inventory/EditMedicine';
import NewMedicine from './pages/inventory/NewMedicine';
import Medicines from './pages/inventory/Medicines';
import LowInventory from './pages/inventory/LowInventory';
import PrescriptionInfo from './pages/prescription/PrescriptionInfo';
import Prescriptions from './pages/prescription/Prescriptions';
import DashBoard from './pages/dashboard/DashBoard';
import PdfMakerComponent from './pages/prescription/PdfMakerComponent';
import Login from './pages/login/Login';
import NewPrescription from './pages/patient/NewPrescription';
import EditPrescription from './pages/prescription/EditPrescription';
import Analytics from './pages/analytics/Analytics';
import {checkHealth} from './services/healthService';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      checkHealth();
    }, 150000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(
      localStorage.getItem('authenticated') || false);
  const [selectedTownId, setSelectedTownId] = useState(
      localStorage.getItem('city') || null);

  return (
      <Routes>
        <Route path="/login"
               element={<Login handleAuthentication={setIsAuthenticated}
                               handleTownSelection={setSelectedTownId}/>}/>
        {(!isAuthenticated || !selectedTownId) && (
            <Route path="*" element={<Navigate to="/login"/>}/>
        )}
        {isAuthenticated && selectedTownId && (
            <>
              <Route path="/home"
                     element={<Layout><DashBoard/></Layout>}/>
              <Route path="/" element={<Navigate to="/home"/>}/>
              <Route path="/patients">
                <Route index element={<Layout><Patients/></Layout>}/>
                <Route path="create"
                       element={<Layout><NewPatient/></Layout>}/>
                <Route path=":patientId/edit"
                       element={<Layout><EditPatient/></Layout>}/>
                <Route path=":patientId/prescriptions"
                       element={<Layout><PatientHistory/></Layout>}/>
                <Route path=":patientId/prescriptions/create"
                       element={<Layout><NewPrescription/></Layout>}/>
                <Route path=":patientId/prescriptions/:prescriptionId"
                       element={
                         <Layout><PrescriptionHistory/></Layout>}/>
              </Route>
              <Route path="/medicines">
                <Route index element={<Layout><Medicines/></Layout>}/>
                <Route path="create"
                       element={<Layout><NewMedicine/></Layout>}/>
                <Route path=":medicineId/edit"
                       element={<Layout><EditMedicine/></Layout>}/>
                <Route path="low-inventory"
                       element={<Layout><LowInventory/></Layout>}/>
              </Route>
              <Route path="/prescriptions">
                <Route index
                       element={<Layout><Prescriptions/></Layout>}/>
                <Route path=":prescriptionId"
                       element={<Layout><PrescriptionInfo/></Layout>}/>
                <Route path=":prescriptionId/edit"
                       element={<Layout><EditPrescription/></Layout>}/>
                <Route path=":prescriptionId/pdf"
                       element={
                         <Layout><PdfMakerComponent/></Layout>}/>
              </Route>
              <Route path="/analytics" element={<Layout><Analytics/></Layout>}/>
              <Route path="*" element={<Navigate to="/home"/>}/>
            </>
        )}
      </Routes>
  );
}

export default App;