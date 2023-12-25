import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import Home from "../Home/Home";
import { useGlobalContext } from "../LoginPage/GlobalContext";
// import { ClientContext } from "../ClientList/clientContext.jsx/ClientContext"

const api_url = process.env.REACT_APP_API_URL;
function Profile() {
  const navigate = useNavigate();
  // const { profilesData } = useContext(ClientContext);
  const [profilesData,setProfilesData] = useState([]);
  const tableRef = useRef(null);
  const { profileId, setProfileId } = useGlobalContext();

  const onEditClick = (_id) => {
    setProfileId(_id);
    navigate("/editprofile");
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
      tableRef.current = $("#userTable").DataTable({
        paging: true,
        pageLength: 10,
        searching: true,
        columns: [
          { data: "serialNumber" },
          { data: "profileName" },
          { data: "createdAt" },
          { data: "updatedAt" },
          {
            data: null,
            render: function (data, type, row) {
              return '<button class="btn btn-success">Edit</button>';
            },
          },
        ],
        rowCallback: function (row, data) {
          const editButton = $('<button class="btn btn-success">Edit</button>');
          editButton.on("click", () => onEditClick(data._id));
          $("td:last-child", row).html(editButton);
        },
      });

      fetch(`${api_url}/getprofiles`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received from the server:", data);
          setProfilesData(data);

          tableRef.current.clear().draw();

          let serialNumber = 1;

          data.forEach((user) => {
            const rowData = {
              serialNumber: serialNumber++,
              _id: user._id,
              profileName: user.profileName,
              createdAt: new Date(user.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              updatedAt: new Date(user.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            };

            tableRef.current.row
              .add({
                ...rowData,
                "": '<button class="edit-button">Edit</button>',
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
      <div className="table-button-container">
        <div className="niveshartha-btn-container">
          <Link to="/addprofile">
            <button className="niveshartha_btn_add">Add Profile</button>
          </Link>
        </div>
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
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

export default Profile;
