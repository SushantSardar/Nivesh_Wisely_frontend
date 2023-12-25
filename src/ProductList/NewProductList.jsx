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
function NewProductList() {
  const tableRef = useRef(null);
  const navigate = useNavigate();

  const { productListId, setProductListId } = useGlobalContext();

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
    setProductListId(_id);
    console.log("Edit click");
    navigate("/editnewproductlist");
  };

  useEffect(() => {
    if (!tableRef.current) {
      tableRef.current = $("#userTable").DataTable({
        paging: true,
        pageLength: 10,
        searching: true,
        fixedHeader: true,
        columns: [
          { data: "serialNumber" },
          { data: "productName" },
          { data: "productType" },
          // { data: "description" },
          { data: "createdAt" },
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

      fetch(`${api_url}/newProductList`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data received from the server:", data);

          let serialNumber = 1;
          data.forEach((product) => {
            const rowData = {
              serialNumber: serialNumber++,
              _id: product._id,
              productName: product.productName,
              productType: product.productType,
              description: product.description,
              createdAt: new Date(product.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
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
          <Link to="/newProduct">
            <button className="niveshartha_btn_add">Add ProductList</button>
          </Link>
        </div>
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product Name</th>
                <th>productType</th>
                {/* <th>Description</th> */}
                <th>CreatedAt</th>
                <th>Action 1</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
    </div>
  );
}

export default NewProductList;
