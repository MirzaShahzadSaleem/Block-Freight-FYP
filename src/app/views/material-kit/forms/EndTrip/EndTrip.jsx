import { useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
//IPFS
import { create as ipfsClient } from 'ipfs-http-client';
const projectId = '2LxL0XBouvtSEhBOCxv0ng7qPqY';
const projectSecret = '12a62c6115365c4d38c1496ece4ebf29';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

function EndTripForm() {
  const initialValues = {
    tripDetail: '',
    endDate: '',
  };
  const [formData, setFormData] = useState(initialValues);

  // const [tripDetail, setTripDetail] = useState('');
  // const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    // event.persist();
    // setState({ ...state, [event.target.name]: event.target.value });
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Storing data to IPFS
    console.log(formData);
    let ipfsToken = await ipfs.add(JSON.stringify({ formData }));
    let id = await JSON.stringify(formData.tripDetail);
    let date = await JSON.stringify(formData.endDate);
    console.log(id);

    console.log('token: ', ipfsToken);

    try {
      const response = await fetch('http://localhost:3003/endtrip/submitendtrip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          TripDetail: id,
          EndDate: date,
        }),
      });
      const data = await response.json();
      console.log('Success:', data);
      setFormData(initialValues);
      window.alert('Ended Successfully');
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const response = await fetch('http://localhost:3003/triphash/inserttriphash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Hash: ipfsToken.path,
          TripDetail: id,
          EndDate: date,
        }),
      });
      const data = await response.json();
      console.log('Success:', data);
      setFormData(initialValues);
    } catch (error) {
      console.error('Error:', error);
    }

    // Handle form submission
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   if (tripDetail && endDate) {
    //     axios
    //       .post('http://localhost:3003/endtrip/submitendtrip', {
    //         TripDetail: tripDetail,
    //         EndDate: endDate,
    //       })
    //       .then((res) => {
    //         console.log('Trip ended successfully!');
    //         alert('Trip Ended Successfully!');
    //         // Clear form fields
    //         setTripDetail('');
    //         setEndDate('');
    //         setError(null);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         setError('Error occurred while ending trip.');
    //       });
    //   }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5">End Trip</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="tripDetail">Trip Detail</InputLabel>
            <Input
              id="tripDetail"
              name="tripDetail"
              value={formData.tripDetail}
              onChange={handleChange}
              aria-describedby="tripDetail-helper-text"
            />
            <FormHelperText id="tripDetail-helper-text">Enter your trip detail</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="endDate">End Date</InputLabel>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              aria-describedby="endDate-helper-text"
            />
            <FormHelperText id="endDate-helper-text">
              Enter the date you ended the trip
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            End Trip
          </Button>
          {error && (
            <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>
              {error}
            </Typography>
          )}
        </Grid>
      </Grid>
    </form>
  );
}

export default EndTripForm;
// import { useState } from 'react';
// import axios from 'axios';
// import {
//   FormControl,
//   InputLabel,
//   Input,
//   FormHelperText,
//   Button,
//   Grid,
//   Paper,
//   Typography,
// } from '@material-ui/core';

// function EndTripForm() {
//   const [tripDetail, setTripDetail] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [error, setError] = useState(null);

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (tripDetail && endDate) {
//       axios
//         .post('http://localhost:3003/endtrip/submitendtrip', {
//           TripDetail: tripDetail,
//           EndDate: endDate,
//         })
//         .then((res) => {
//           console.log('Trip ended successfully!');
//           alert('Trip Ended Successfully!');
//           // Clear form fields
//           setTripDetail('');
//           setEndDate('');
//           setError(null);
//         })
//         .catch((err) => {
//           console.log(err);
//           setError('Error occurred while ending trip.');
//         });
//     }
//   };

//   return (
//     <Paper style={{ padding: '2rem' }}>
//       <Typography variant="h4" style={{ marginBottom: '2rem' }}>
//         End Trip
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel>Trip Detail</InputLabel>
//               <Input
//                 value={tripDetail}
//                 onChange={(e) => setTripDetail(e.target.value)}
//                 aria-describedby="tripDetail-helper-text"
//               />
//               <FormHelperText id="tripDetail-helper-text">Enter trip detail</FormHelperText>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12}>
//             <FormControl fullWidth>
//               <InputLabel shrink>End Date</InputLabel>
//               <Input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 aria-describedby="endDate-helper-text"
//               />
//               <FormHelperText id="endDate-helper-text">Enter trip end date</FormHelperText>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12}>
//             <Button type="submit" variant="contained" color="primary" fullWidth>
//               End Trip
//             </Button>
//             {error && (
//               <Typography variant="body1" color="error" style={{ marginTop: '1rem' }}>
//                 {error}
//               </Typography>
//             )}
//           </Grid>
//         </Grid>
//       </form>
//     </Paper>
//   );
// }

// export default EndTripForm;
