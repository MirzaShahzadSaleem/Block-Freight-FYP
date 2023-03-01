import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { v4 as uuidv4 } from 'uuid';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const TripForm = () => {
  const initialValues = {
    TripId: '',
    TripIntiator: '',
    TripLocation: '',
    TripLoad: '',
    StartDate: '',
    EndDate: '',
    Status: '',
  };
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (event) => {
    // event.persist();
    // setState({ ...state, [event.target.name]: event.target.value });
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = uuidv4(); // generate a unique ID
    const data = { ...formData, TripId: id }; // include the ID in the form data
    try {
      const response = await fetch('http://localhost:3003/trips/createtrip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log('Success:', responseData);
      setFormData(initialValues);
      alert('Trip has been created successfully');
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
              type="String"
              name="TripIntiator"
              label="Trip Initiator"
              onChange={handleChange}
              value={formData.TripIntiator}
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <TextField
              type="String"
              name="TripLocation"
              label="Trip Location"
              value={formData.TripLocation}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required', 'vehicle is not valid']}
            />

            <TextField
              sx={{ mb: 4 }}
              type="String"
              name="TripLoad"
              label="Trip Load"
              onChange={handleChange}
              value={formData.TripLoad}
              errorMessages={['this field is required']}
              // validators={["required", "minStringLength:16", "maxStringLength: 16"]}
              validators={['required']}
            />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="Date"
              name="StartDate"
              value={formData.StartDate}
              label="Start Date"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
              style={{ width: '100%' }}
            />
            <TextField
              name="EndDate"
              type="Date"
              label="End Date"
              value={formData.EndDate}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['Please select an end date']}
            />
            <TextField
              type="String"
              name="Status"
              onChange={handleChange}
              label="Status"
              value={formData.Status}
              validators={['required']}
              errorMessages={['this field is required']}
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

export default TripForm;
