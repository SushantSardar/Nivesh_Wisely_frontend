import React, { useEffect, useRef } from 'react'
import Home from '../Home/Home'
import { Link } from 'react-router-dom'
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;

const SuggestionList = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);

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
          { data: "customerName" },
          { data: "queryDescription" },
          { data: "createdAt" },
          { data: "updatedAt" }
        ],
      });
    }

    // Fetch data from the server
    fetch(`${api_url}/showQuery`)
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
        data.forEach((queries) => {
          const rowData = {
            serialNumber: serialNumber++, // Increment the serial number
            _id: queries._id,
            customerName: queries.customerName,
            queryDescription: queries.queryDescription,
            createdAt: new Date(queries.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            updatedAt: new Date(queries.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
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
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th> S.No </th>
                <th> Customer Name </th>
                <th> Query Description </th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
    </div>
  )
}

export default SuggestionList