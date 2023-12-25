import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { renderToString } from "react-dom/server";
import $ from "jquery";
import "../dataTable.css";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import Home from "../Home/Home";
import { useGlobalContext } from "../LoginPage/GlobalContext";

const api_url = process.env.REACT_APP_API_URL;
function Faq() {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const { faqId, setFaqId } = useGlobalContext();
  const [faqData, setFaqData] = useState([]);

  const onEditClick = (_id) => {
    console.log("Edit click");
    setFaqId(_id);
    navigate("/editfaq");
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
        fixedHeader: true,
        columns: [
          { data: "serialNumber" },
          { data: "question" },
          { data: "description" },
          { data: "pageFor" },
          { data: "createdAt" },
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
          editButton.on("click", () => onEditClick(data._id));
          $("td:last-child", row).html(editButton);
        },
      });

      fetch(`${api_url}/getquestion`)
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
              question: product.question,
              description: product.description,
              pageFor: product.pageFor,
              createdAt: new Date(product.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
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
          <Link to="/addfaq">
            <button className="niveshartha_btn_add">Add Faq</button>
          </Link>
        </div>
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Question</th>
                <th>Description</th>
                <th>pageFor</th>
                <th>Date</th>
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

export default Faq;
