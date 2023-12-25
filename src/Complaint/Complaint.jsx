import React, { useContext, useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import Home from "../Home/Home";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../LoginPage/GlobalContext";
import { ClientContext } from "../ClientList/clientContext.jsx/ClientContext"

const api_url = process.env.REACT_APP_API_URL;
function Complaint() {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const { complaintId, setComplaintId } = useGlobalContext();
  const { complaintsData } = useContext(ClientContext);

  const onEditClick = (_id) => {
    console.log("Edit click");
    setComplaintId(_id);
    navigate("/editcomplaint");
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

  useEffect(() => {

    if (!tableRef.current) {
      console.log("Initializing DataTable");
      tableRef.current = $("#userTable").DataTable({
        paging: true,
        pageLength: 10,
        searching: true,
        columns: [
          { data: "serialNumber" },
          { data: "clientName" },
          { data: "complaintDescription" },
          { data: "status" },
          { data: "solution" },
          { data: "createdAt" },
          { data: "solvedBy" },
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

      fetch(`${api_url}/showcomplaints`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received from the server:", data);

          let serialNumber = 1;
          data.forEach((user) => {
            const rowData = {
              serialNumber: serialNumber++,
              _id: user._id,
              clientName: user.clientName,
              complaintDescription: user.complaintDescription,
              status: user.status,
              solution: user.solution,
              createdAt: new Date(user.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              solvedBy: user.solvedBy,
            };

            tableRef.current.row.add(rowData).draw();
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    }

  }, []);

  return (
    <div>
      <Home />

      <div className="table-button-container">
        <div className="niveshartha-btn-container">
          <Link to="/addcomplaint">
            <button className="niveshartha_btn_add">Add Complaint</button>
          </Link>
        </div>
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Client Name</th>
                <th>Complain Description</th>
                <th>Status</th>
                <th>Solution</th>
                <th>Created At</th>
                <th>Solved By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
    </div>
  );
}

export default Complaint;
