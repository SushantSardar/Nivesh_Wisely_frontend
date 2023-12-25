import React, { useContext, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import Home from "../Home/Home";
import { ClientContext } from "./clientContext.jsx/ClientContext"
import { Link, useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;

function AllClients() {
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { allClientsData, setClientForEdit } = useContext(ClientContext)

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


  const handleEditclient = async (data) => {
    const selectedClient = await allClientsData.filter(client => client._id === data._id);
    await setClientForEdit(selectedClient[0]);
    navigate("/editclient")
  };

  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const data = allClientsData;

        if (tableRef.current) {
          tableRef.current.clear().draw();
        }

        let serialNumber = 1;

        data.forEach((user) => {
          console.log("user", user);
          const firstProduct = user.products[0] || {};
          console.log("firstProduct", firstProduct);
          const rowData = {
            serialNumber: serialNumber++,
            _id: user._id,
            userName: user.userName,
            productName: firstProduct.productName || "",
            fromDate: new Date(firstProduct.fromDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            toDate: new Date(firstProduct.toDate).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            serviceStatus: firstProduct.serviceStatus || "",
            createdAt: new Date(user.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            createdBy: user.createdBy || "",
            updatedAt: new Date(user.updatedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            updatedBy: user.updatedBy || "",
            productPrice: firstProduct.productPrice || "",
          };
          tableRef.current.row
            .add({
              ...rowData,
              "": "",
            })
            .draw();
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!tableRef.current) {
      tableRef.current = $("#userTable").DataTable({
        paging: true,
        pageLength: 10,
        searching: true,
        columns: [
          { data: "serialNumber" },
          { data: "userName" },
          { data: "productName" },
          { data: "fromDate" },
          { data: "toDate" },
          { data: "serviceStatus" },
          { data: "createdAt" },
          { data: "createdBy" },
          { data: "updatedAt" },
          { data: "updatedBy" },
          { data: "productPrice" },
          {
            data: null,
            render: (data, type, row) =>
              renderToString(
                <button
                  className="btn btn-success"
                  onClick={() => console.log("Hello world")}
                >
                  Edit
                </button>
              ),
          },
        ],
        rowCallback: function (row, data) {
          const editButton = $('<button class="btn btn-success">Edit</button>');
          editButton.on("click", () => handleEditclient(data));
          $("td:last-child", row).html(editButton);
        },
      });

    }
    fetchClientList();
  }, [allClientsData]);

  return (
    <div>
      <Home />
      <div className="table-button-container">
        <div className="niveshartha-btn-container">
          <Link to="/addclientlist">
            <button className="niveshartha_btn_add">Add Client</button>
          </Link>
        </div>
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>User Name</th>
                <th>Product Subscribed</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Service Status</th>
                <th>Created At</th>
                <th>Created By</th>
                <th>Updated At</th>
                <th>Updated By</th>
                <th>Price</th>
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

export default AllClients;
