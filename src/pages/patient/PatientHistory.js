import {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';

import {format} from 'date-fns';
import {Button, Grid, Paper} from '@mui/material';
import PatientInfoCard from '../../components/patient/PatientInfoCard';
import Table from '../../components/UI/Table';
import api from '../../components/api/api';

const columns = [
  {field: 'date', headerName: 'Date', flex: 0.5},
  {field: 'history', headerName: 'History and Management', flex: 2},
  {field: 'diagnosis', headerName: 'Diagnosis', flex: 2},
  {
    field: 'actions',
    type: 'actions',
    flex: 0.75,
    renderCell: (params) => (
        <strong>
          <Button
              component={Link}
              to={`${params.id}`}
          >
            More info
          </Button>
        </strong>
    ),
  },
];

const PatientHistory = () => {
  const [patient, setPatient] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const {patientId} = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/patients/${patientId}`);
        const data = await response.data;
        setPatient(data);
        setPrescriptions(data?.prescriptions.map(prescription => {
          return {
            id: prescription.id,
            date: format(new Date(prescription.createdTime), 'yyyy-MM-dd'),
            diagnosis: prescription.diagnosis,
            history: prescription.history,
          };
        }));
      } catch (err) {
        navigate('/');
      }
    }

    fetchData();
  }, [patientId]);

  return (
      <Paper elevation={3} sx={{padding: 2}}>
        <Grid container spacing={2} justifyContent="flex-start">
          <Grid item xs={4}>
            <PatientInfoCard patient={patient}/>
          </Grid>
          <Grid item xs={12}>
            <Table columns={columns} rows={prescriptions} pageSize={5}/>
          </Grid>
        </Grid>
      </Paper>
  );
};

export default PatientHistory;