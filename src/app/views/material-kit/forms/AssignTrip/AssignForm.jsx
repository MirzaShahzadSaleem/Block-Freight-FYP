import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid,
  Paper,
  Typography,
  Input,
} from '@material-ui/core';

function AssignTripForm() {
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Fetch data from the trip and driver APIs
  useEffect(() => {
    axios
      .get('http://localhost:3003/trips/viewtrips?Intiator=<replace with the initiator value>')
      .then((res) => {
        setTrips(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('http://localhost:3003/drivers/viewdrivers')
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedTrip && selectedDriver) {
      axios
        .post('http://localhost:3003/assigntrip/createtrip', {
          TripDetail: selectedTrip,
          DriverDetail: selectedDriver,
        })
        .then((res) => {
          console.log('Trip assigned successfully!');
          alert('Trip assigned successfully!');
          setSelectedTrip(null);
          setSelectedDriver(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Paper style={{ padding: '2rem' }}>
      <Typography variant="h4" style={{ marginBottom: '2rem' }}>
        Assign Trip to Driver
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Trip:</InputLabel>
              <Select
                value={selectedTrip ? selectedTrip._id : ''}
                onChange={(e) => setSelectedTrip(trips.find((trip) => trip._id === e.target.value))}
              >
                <MenuItem value="">Select a trip</MenuItem>
                {trips.map((trip) => (
                  <MenuItem key={trip._id} value={trip._id}>
                    {trip.TripIntiator}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Select Driver by CNIC:</InputLabel>
              <Select
                value={selectedDriver ? selectedDriver._id : ''}
                onChange={(e) =>
                  setSelectedDriver(drivers.find((driver) => driver._id === e.target.value))
                }
              >
                <MenuItem value="">Select a driver</MenuItem>
                {drivers.map((driver) => (
                  <MenuItem key={driver._id} value={driver._id}>
                    {`${driver.driverName} (${driver.cnic})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Assign Trip
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default AssignTripForm;
