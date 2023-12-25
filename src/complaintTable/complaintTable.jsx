
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Home from '../Home/Home'
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import { useGlobalContext } from '../LoginPage/GlobalContext';

const api_url = process.env.REACT_APP_API_URL;

const ComplaintTable = () => {
 
  const navigate = useNavigate();
  const {complaintRowId,setComplaintRowId} = useGlobalContext();

  const onEditClick = (_id) => {
    console.log("Edit click");
    setComplaintRowId(_id);
    console.log("Edit click",complaintRowId);
    navigate("/editComplaintRow");
  };

  // ___________________________________________________user Authenticatin____________________
  useEffect(() => {
    fetch(`${api_url}/getuser`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const userObject = data.find((user) => user._id === sessionStorage.userId);
        // setIsValidUser(userObject.active);
        if (!userObject.active) {
          navigate('/')
        } 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
// ____________________________________________________________________________________________

     
  const tableRef = useRef(null);

  useEffect(() => {
      console.log("Component mounted");
  
      // Initialize DataTable
      if (!tableRef.current) {
        console.log("Initializing DataTable");
        tableRef.current = $("#userTable").DataTable({
          paging: true,
          pageLength: 10,
          searching: true,
          columns: [
            { data: "serialNumber" },
            { data: "ReceivedFrom" },
            { data: "CarriedFromPrevMonth" },
            { data: "Received" },
            { data: "Resolved" },
            { data: "Pending" },
            { data: "createdBy" },
            
            { data: "updatedBy" },
            { data: "createdAt" },
            { data: "updatedAt" },
            {
              data: null,
              render: (data, type, row) =>
                '<button class="btn btn-success">Edit</button>',
            },
          ],
          rowCallback: function (row, data) {
            const editButton = $('<button class="btn btn-success">Edit</button>');
            editButton.on("click", () => onEditClick(data._id));
            $("td:last-child", row).html(editButton);
          },
        });
      }

  
      // Fetch data from the server
      fetch(`${api_url}/showComplaintRow`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received from the server:", data);

         
  
          // Clear existing data before adding rows
          tableRef.current.clear().draw();
  
          // Initialize a serial number counter
          let serialNumber = 1;
  
          // Add rows to the DataTable
          data.newComplaintRow.forEach((complaintTable) => {
            const rowData = {
              serialNumber: serialNumber++, // Increment the serial number
              _id: complaintTable._id,
              ReceivedFrom: complaintTable.ReceivedFrom,
              CarriedFromPrevMonth: complaintTable.CarriedFromPrevMonth,
              Received: complaintTable.Received,
              Resolved: complaintTable.Resolved,
              Pending: complaintTable.Pending,
              createdBy: complaintTable.createdBy,
              updatedBy: complaintTable.updatedBy,
              createdAt: new Date(complaintTable.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              updatedAt: new Date(complaintTable.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })   
            };
  
            tableRef.current.row.add(rowData).draw();
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []); 
  
  return (
    <div>
      <Home />
      <div className="table-button-container">
        <div className="niveshartha-btn-container">
          <Link to="/addcomplaintRow">
            <button className="niveshartha_btn_add">Add Row</button>
          </Link>
        </div>
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Received From</th>
                <th>Carried Forward From Prev Month</th>
                <th>Received</th>
                <th>Resolved</th>
                <th>Pending</th>
                <th>Created By</th>
                <th>Updated By</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
    </div>
  )
}

export default ComplaintTable