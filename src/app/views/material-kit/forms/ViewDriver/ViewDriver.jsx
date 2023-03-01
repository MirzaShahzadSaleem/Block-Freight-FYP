// import { DatePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   Icon,
//   Radio,
//   RadioGroup,
//   styled,
// } from "@mui/material";
// import { Span } from "app/components/Typography";
// import { useEffect, useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import axios from "axios";

// const TextField = styled(TextValidator)(() => ({
//   width: "100%",
//   marginBottom: "16px",
// }));

// const API_URL = "http://localhost:3003/drivers/viewdrivers";
// const PAGE_SIZE = 6;

// const ViewDriver = () => {
//     const [data, setData] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
   



// useEffect(() => {
//     const fetchData = async () => {
//         const result = await axios(API_URL);
//         setData(result.data);

//     };
//     fetchData();
// }, [])


//   const startIndex = (currentPage - 1) * PAGE_SIZE;
//   const endIndex = startIndex + PAGE_SIZE;
//   const pageData = data.slice(startIndex, endIndex);
//   console.log(typeof(data),JSON.stringify(data),"data");

// const handlePageChange = pageNumber => {
//     setCurrentPage(pageNumber);
//   };



//   return (
//     <div>
    

//     <div className="table-responsive">
//     <table className="table table-striped">
//       <thead className="thead-dark">
//       <tr>
//         <th>Transporter Name</th>
//         <th>Driver Name</th>
//         <th>Vehicle Type</th>
//         <th>Mobile</th>
//         <th>CNIC</th>
//         <th>Max Load</th>
//         <th>Vehicle No</th>
//       </tr>
//     </thead>
//     <tbody>
//     {pageData.map(drivers => (
//         <tr key={drivers.id}>
//         <td>{drivers.transporterName}</td>
//         <td>{drivers.driverName}</td>
//         <td>{drivers.vehicleType}</td>
//         <td>{drivers.mobile}</td>
//         <td>{drivers.cnic}</td>
//         <td>{drivers.maxLoad}</td>
//         <td>{drivers.vehicleNo}</td>
//       </tr>
//     ))}
//     </tbody>
//   </table>
  
//     </div>
//     <nav aria-label="Page navigation example">
//     <ul className="pagination justify-content-center">
//       <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//         <button
//           className="page-link"
//           onClick={() => handlePageChange(currentPage - 1)}
//         >
//           Previous
//         </button>
//       </li>
//       <li className={`page-item ${currentPage === Math.ceil(data.length / PAGE_SIZE) ? 'disabled' : ''}`}>
//         <button
//           className="page-link"
//           onClick={() => handlePageChange(currentPage + 1)}
//         >
//           Next
//         </button>
//       </li>
//     </ul>
//   </nav>
//   </div>
//   );
// };

// export default ViewDriver;



import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function ViewDriver() {
  const [rows, setRows] = useState([]);
  
  const columns = [
    { field: 'transporterName', headerName: 'Transporter Name', width: 130 },
    { field: 'driverName', headerName: 'Driver Name', width: 130 },
    { field: 'cnic', headerName: 'CNIC', width: 130 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 130 },
    { field: 'mobile', headerName: 'Mobile', width: 130 },
    { field: 'maxLoad', headerName: 'Max Load', width: 130 },
    { field: 'vehicleNo', headerName: 'Vehicle No.', width: 130 },
  ];
  
  useEffect(() => {
    fetch('http://localhost:3003/drivers/viewdrivers')
      .then(response => response.json())
      .then(data => {
        setRows(data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  // Define getRowId function
  const getRowId = (row) => {
    return row._id; // assuming _id is the unique identifier for each row
  };
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} getRowId={getRowId} columns={columns} pageSize={5} />
    </div>
  );
}

