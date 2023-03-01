import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axios from 'axios';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

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

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const RegisterDriver = () => {
  //const [state, setState] = useState();
  const initialValues = {
    transporterName: '',
    driverName: '',
    vehicleType: '',
    mobile: '',
    cnic: '',
    maxLoad: '',
    vehicleNo: '',
  };

  const [formData, setFormData] = useState(initialValues);
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
    let name = await JSON.stringify(formData.driverName);
    let cnicNo = await JSON.stringify(formData.cnic);
    console.log(name);

    console.log('token: ', ipfsToken);

    // Fetch data from IPFS
    // let response = await fetch(
    //   
    //   'https://blockfreight.infura-ipfs.io/ipfs/QmYBY1LPqQnbn2Te9Gw8MnQ6s5NX1DZcZyTbjc6nb2vgdP'

    //   // https://blockfreight.infura-ipfs.io/ipfs/drivers/viewdrivers
    // );

    // let metadata = await response.json();
    // console.log(metadata);

    // Storing data to mongoDB
    try {
      const response = await fetch('http://localhost:3003/drivers/insertdriver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Success:', data);
      setFormData(initialValues);
      window.alert('Driver has been successfully registered');
    } catch (error) {
      console.error('Error:', error);
    }

    //Saving in Driver Hash
    try {
      const response = await fetch('http://localhost:3003/driverhash/insertdriverhash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Hash: ipfsToken.path,
          DriverName: name,
          CnicNo: cnicNo,
        }),
      });
      const data = await response.json();
      console.log('Success:', data);
      setFormData(initialValues);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="string"
              name="transporterName"
              id="standard-basic"
              value={formData.transporterName}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Transporter Name "
              validators={['required']}
              // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
            />

            <TextField
              type="string"
              name="driverName"
              label="Driver Name"
              onChange={handleChange}
              value={formData.driverName}
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <TextField
              type="string"
              name="vehicleNo"
              label="Vehicle No"
              value={formData.vehicleNo}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required', 'vehicle is not valid']}
            />

            <TextField
              sx={{ mb: 4 }}
              type="string"
              name="vehicleType"
              label="Vehicle Type"
              onChange={handleChange}
              value={formData.vehicleType}
              errorMessages={['this field is required']}
              // validators={["required", "minStringLength:16", "maxStringLength: 16"]}
              validators={['required']}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="string"
              name="mobile"
              value={formData.mobile}
              label="Mobile Nubmer"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              name="cnic"
              type="string"
              label=" CNIC "
              value={formData.cnic}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="string"
              name="maxLoad"
              onChange={handleChange}
              label="Max Load"
              value={formData.maxLoad}
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="I have read and agree to the terms of service."
            />
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default RegisterDriver;
