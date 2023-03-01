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

// const API_URL = "http://localhost:3003/trips/viewtrips";
// const PAGE_SIZE = 6;

// const ViewAllTrip = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);


//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await axios(API_URL);
//       setData(result.data);

//     };
//     fetchData();
//   }, [])


//   const startIndex = (currentPage - 1) * PAGE_SIZE;
//   const endIndex = startIndex + PAGE_SIZE;
//   const pageData = data.slice(startIndex, endIndex);
//   console.log(typeof (data), JSON.stringify(data), "data");

//   const handlePageChange = pageNumber => {
//     setCurrentPage(pageNumber);
//   };


//   return (
//     <div>

//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead className="thead-dark">

//             <tr>
//               <th>Trip ID</th>
//               <th> Trip Initiator</th>
//               <th> Trip Location</th>
//               <th>Trip Load</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th> Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pageData.map(trips => (
//               <tr key={trips.id}>
//                 <td>{trips.TripId}</td>
//                 <td>{trips.TripIntiator}</td>
//                 <td>{trips.TripLocation}</td>
//                 <td>{trips.TripLoad}</td>
//                 <td>{trips.StartDate}</td>
//                 <td>{trips.EndDate}</td>
//                 <td>{trips.Status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//       </div>
//       <nav aria-label="Page navigation example">
//         <ul className="pagination justify-content-center">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button
//               className="page-link"
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               Previous
//             </button>
//           </li>
//           <li className={`page-item ${currentPage === Math.ceil(data.length / PAGE_SIZE) ? 'disabled' : ''}`}>
//             <button
//               className="page-link"
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };
// export default ViewAllTrip;
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

export default function ViewAllTrip() {
  const [rows, setRows] = useState([]);
  
  const columns = [
    { field: 'TripId', headerName: 'Trip ID', width: 130 },
    { field: 'TripIntiator', headerName: 'Trip Initiator', width: 130 },
    { field: 'TripLocation', headerName: 'Trip Location', width: 130 },
    { field: 'TripLoad', headerName: 'Trip Load', width: 130 },
    { field: 'StartDate', headerName: 'Start Date', width: 130 },
    { field: 'Status', headerName: 'Status', width: 130 },
  ];
  
  useEffect(() => {
    fetch('http://localhost:3003/trips/viewtrips')
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