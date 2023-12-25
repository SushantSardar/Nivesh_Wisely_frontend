import React, { useEffect, useRef } from 'react'
import Home from '../Home/Home'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import { useGlobalContext } from '../LoginPage/GlobalContext';

const api_url = process.env.REACT_APP_API_URL;

const CouponList = () => {
    const navigate = useNavigate();

    const { couponId, setCouponId } = useGlobalContext();

    const onEditClick = (_id) => {
        console.log("Edit click");
        setCouponId(_id);
        console.log("Edit click",couponId);
        navigate("/editCoupon");
      };

      
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
              { data: "couponName" },
              { data: "discount" },
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
        fetch(`${api_url}/showCoupon`)
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
            data.forEach((coupons) => {
              const rowData = {
                serialNumber: serialNumber++, // Increment the serial number
                _id: coupons._id,
                couponName: coupons.couponName,
                discount: coupons.discount,
                createdBy: coupons.createdBy,
                updatedBy: coupons.updatedBy,
                createdAt: new Date(coupons.createdAt).toLocaleString(),
                updatedAt: new Date(coupons.updatedAt).toLocaleString()   
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
                    <Link to="/addCoupon">
                        <button className="niveshartha_btn_add">Add Coupon</button>
                    </Link>
                </div>
                <div className="user-table-container">
                    <table id="userTable" className="display" style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Coupon Name</th>
                                <th>Discount</th>
                                <th>CreatedBy</th>
                                <th>UpdatedBy</th>
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
    )
}

export default CouponList