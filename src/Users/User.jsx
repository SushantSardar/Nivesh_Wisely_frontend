import React, { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import Home from "../Home/Home";
import { useGlobalContext } from "../LoginPage/GlobalContext";
import { ClientContext } from "../ClientList/clientContext.jsx/ClientContext"

const api_url = process.env.REACT_APP_API_URL;

function User() {
  const userTableRef = useRef(null);
  const navigate = useNavigate();
  const { userId, setUserId } = useGlobalContext();
  const { profilesData } = useContext(ClientContext);
  console.log('✌️profilesData --->', profilesData);
  // console.log('✌️sessionStorage.profileName --->', sessionStorage.userProfile);





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
  const onEditClick = (_id) => {
    setUserId(_id);
    navigate("/edituser");
  };
  useEffect(() => {
    console.log("Component mounted");

    if (!userTableRef.current) {
      console.log("Initializing DataTable");

      // Initialize DataTable with columns
      userTableRef.current = $("#userTable").DataTable({
        paging: true,
        pageLength: 10,
        searching: true,
        fixedHeader: true,
        columns: [
          { data: "serialNumber" },
          { data: "name" },
          { data: "email" },
          { data: "mobileNumber" },
          { data: "userName" },
          { data: "password" },
          { data: "profile" },
          { data: "active" },
          { data: "createdAt" },
          // { data: 'updatedAt' },
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

      // Fetch data from the server
      fetch(`${api_url}/getuser`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received from the server:", data);

          let serialNumber = 1;
          // Add rows to DataTable
          // ...

          // Add rows to DataTable
          data.forEach((product) => {
            const rowData = {
              serialNumber: serialNumber++,
              _id: product._id,
              name: product.name,
              email: product.email,
              mobileNumber: product.mobileNumber, // Corrected the key to 'phone'
              userName: product.userName,
              password: product.password,
              profile: product.profile,
              active: product.active ? "On" : "Off",
              createdAt: new Date(product.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              // updatedAt: product.updatedAt,
            };
            userTableRef.current.row.add(rowData).draw();
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
          <Link to="/adduser">
            <button className="niveshartha_btn_add">Add User</button>
          </Link>
        </div>
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Password</th>
                <th>Profile</th>
                <th>Status</th>
                <th>Created At</th>
                {/* <th>Updated At</th> */}
                <th>Edit</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
    </div>
  );
}

export default User;
