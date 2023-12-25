import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import Home from "../Home/Home";
import { Link } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;

function Review() {
  const tableRef = useRef(null);

  useEffect(() => {
    console.log("Component mounted");

    if (!tableRef.current) {
      console.log("Initializing DataTable");
      tableRef.current = $("#userTable").DataTable({
        paging: true,
        pageLength: 10,
        searching: true,
        columns: [
          { data: "serialNumber" }, // Add a new column for serial numbers
          { data: "productName" },
          { data: "script" },
          { data: "givenBy" },
          { data: "givenAt" },
          { data: "updateBy" },
          { data: "updateAt" },
          { data: "pl" },
          // Add an empty column for the "Edit" button
          {
            data: null,
            render: function (data, type, row) {
              return '<button class="edit-button">Edit</button>';
            },
          },
        ],
      });

      // Fetch data from the server
      fetch(`${api_url}/showsupport`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok"); // Add a semicolon here
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received from the server:", data);

          // Initialize a serial number counter
          let serialNumber = 1;

          // Check the structure of the data and make sure it matches the DataTable columns
          data.forEach((user) => {
            const rowData = {
              serialNumber: serialNumber++, // Increment the serial number
              productName: user.productName,
              script: user.script,
              givenBy: user.givenBy,
              givenAt: user.givenAt,
              updateBy: user.updateBy,
              updateAt: user.updateAt,
              pl: user.pl,
            };

            // Add a new row and include the "Edit" button
            tableRef.current.row
              .add({
                ...rowData,
                // Add the "Edit" button in the last cell
                // "": '<button class="edit-button">Edit</button>',
              })
              .draw();
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  return (
    <div>
      <Home />
      <Link to="/addsupport">
        <button className="niveshartha_btn_add">Add Support</button>
      </Link>
      <div className="user-table-container">
        <table id="userTable" className="display">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Script</th>
              <th>Givenby</th>
              <th>GivenAt</th>
              <th>Updateby</th>
              <th>UpdateAt</th>
              <th>P/L</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    </div>
  );
}

export default Review;
