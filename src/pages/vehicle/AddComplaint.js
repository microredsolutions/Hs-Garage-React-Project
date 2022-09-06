import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Stack, Container, Typography, TextField, Checkbox, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ServiceURL from '../../constants/url';

export default function AddComplaint(details) {
  const [update, setUpdate] = useState(details.updated);
  const validSchema = Yup.object().shape({
    CustomerName: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Name is required'),
    Mobnum: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Mobnum is required'),
    Email: Yup.string().email("Invalid Format").matches(/^\S/, 'Whitespace is not allowed'),
    Address: Yup.string().matches(/^\S/, 'Whitespace is not allowed').required('Address is required'),
  });

  const [alertMsg, setAlert] = useState();
  const formik = useFormik({
    initialValues: {
      CustomerName: update ? details.data.CustomerName : '',
      Mobnum: update ? details.data.Mobnum : '',
      Email: update ? details.data.Email : '',
      Address: update ? details.data.Address : '',
    },
    validationSchema: validSchema,
    onSubmit: (values, actions) => {
     
      onAdd();
    }
  });
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  // useEffect(() => {
  //   axios.get(`${ServiceURL}getType.php`).then((res) => {
  //     setTypeData(res.data);
  //     console.log(type);
  //   });
  //   axios.get(`${ServiceURL}getColor.php`).then((res) => {
  //     setcolour(res.data);
  //   });
  //   console.log(details.updated);
  // }, []);

  

  const onAdd = () => {
    console.log(values);
    const requestdata = 
    {
      "type":"SP_CALL",
      "requestId":1600001,
      "request":{
        "name":values.CustomerName,
        "mobile" : values.Mobnum,
    "email" : values.Email,
        "place" :values.Address

      }
    }
      
      axios.post(ServiceURL,requestdata).then((res) => {
        if(res.data.errorCode===1)
{
  console.log(res);
  setAlert();
  details.submit(res.data.result);
}       else{
  console.log(res)
  console.log(res.data.errorMsg);
  setAlert(res.data.errorMsg);
}
      }).catch(() => {
          console.log('No internet connection found. App is running in offline mode.');
        });
    
   
  };
  
  const alertTimeOut = () => {
    setTimeout(() => {
      setAlert();
    }, 2000);
  };
  const onclose = () => {
    formik.resetForm();
    details.onClose();
  };
  return (
    <div>
      <Dialog fullScreen open={details.open} onClose={details.onClose}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={onclose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add New Complaint
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              {details.button}
            </Button>
          </Toolbar>
        </AppBar>
        
        <Container>
        <Typography variant="h4">COMPLAINT DETAILS</Typography>
          <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ my: 3 }}>

            
            <TextField
           
              fullWidth
              type="text"
              label="Mobile Number"
              variant="outlined"
              value={details.update ? details.data.name : ''}
              {...getFieldProps('Mobnum')}
              error={Boolean(touched.Mobnum && errors.Mobnum || alertMsg)}
              helperText={touched.Mobnum && errors.Mobnum || alertMsg}
            />
            {}
            <TextField
              fullWidth
              type="text"
              label="Customer Name"
              variant="outlined"
              {...getFieldProps('CustomerName')}
              error={Boolean(touched.CustomerName && errors.CustomerName)}
              helperText={touched.CustomerName && errors.CustomerName}
            />
           
           <CameraAltIcon /> 
            
          </Stack>
        </Container>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Complaint</TableCell>
            <TableCell align="right">Problem</TableCell>
            <TableCell align="right">Image</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                hello
              </TableCell>
              <TableCell align="right">DFA</TableCell>
              <TableCell align="right">SADF</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
      </Dialog>
    </div>
  );
}
