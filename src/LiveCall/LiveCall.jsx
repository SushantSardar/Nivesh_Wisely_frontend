import React, { useRef, useEffect, useState } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import "../dataTable.css";
import Home from "../Home/Home";
import Popup from "./Popup";
import ImgPopUp from "./ImgPopUp";
import { useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;

function LiveCall() {
  const tableRef = useRef(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [imgPopupOpen, setImgPopupOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [SelectedProductName, setSelectedProductName] = useState({});
  const [selectedQty, setSelectedQty] = useState({});
  const [selectedDealtype, setSelectedDealtype] = useState({});
  const [selectedScript, setSelectedScript] = useState({});
  const [selectedPosition, setSelectedPosition] = useState({});
  const [selectedPrice1, setSelectedPrice1] = useState({});
  const [selectedTarget, setSelectedTarget] = useState({});
  const [selectedStoploss, setSelectedStoploss] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});
  const [selectedImg, setSelectedImg] = useState({});
  const [selectedDescription, SetSelectedDescription] = useState({});
  // const [selectedCusotmizeValue , setSelectedCustomizeValue] = useState({})

  const togglePopup = () => setPopupOpen(!isPopupOpen);
  const imgtogglePopup = () => {
    console.log("ImgPopUp toggled");
    setImgPopupOpen(!imgPopupOpen);
  };

  const handleImgPopup = (rowData) => {
    console.log(rowData);
    setSelectedRowData(rowData);
    setSelectedImg(rowData.uploadFile);
    imgtogglePopup(); // Make sure imgtogglePopup is defined and working as expected
  };

  const handleUpdatePnl = async (pnl, rowData) => {
    // try {
    //   let url = `${api_url}/updatecall/${rowData._id}`;
    //   console.log(url);
    //   const payload = {
    //     pnl: pnl,
    //   };
    //   // console.log("pnl",payload.pnl);
    //   const response = await fetch(url, {
    //     method: 'PUT',
    //     body: JSON.stringify(payload),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   const responseData = await response.json();
    //   if (responseData) {
    //     console.log('responseData', responseData);
    //   }
    //   console.log('pnl added successfully!!');
    // } catch (error) {
    //   console.error('Error', error);
    // }
  };

  const navigate=useNavigate()

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

  useEffect(() => {
    console.log(SelectedProductName);
  }, [SelectedProductName]);

  const handleEditClick = (rowData) => {
    console.log(rowData);
    setSelectedRowData(rowData);
    setSelectedProductName(rowData.productName);
    setSelectedQty(rowData.quantity);
    setSelectedDealtype(rowData.dealType);
    setSelectedScript(rowData.script);
    setSelectedPosition(rowData.position);
    setSelectedPrice1(rowData.price1);
    setSelectedTarget(rowData.target);
    setSelectedStoploss(rowData.stopLoss);
    setSelectedStatus(rowData.statusValue);
    SetSelectedDescription(rowData.description);

    togglePopup();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/getcalls`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log("Data received from the server:", data);

        let serialNumber = 1;

        const formattedData = data.map((product) => {
          let pnl;
          const quantity = product.quantity;
          const price1 = product.price1;

          if (product.statusValue === "Target HIT") {
            pnl = (product.target - price1) * quantity;
          } else if (product.statusValue === "Stop Loss") {
            pnl = (product.stopLoss - price1) * quantity;
          } else if (product.statusValue === "Customize") {
            const dummyValue = product.customizeValue; // Replace with your actual dummy value
            pnl = (dummyValue - price1) * quantity;
          } else {
            pnl = 0; // Set default value
          }
          // handleUpdatePnl(pnl);

          return {
            serialNumber: serialNumber++,
            productId: product._id,
            productName: product.productName,
            quantity: product.quantity,
            dealType: product.dealType,
            script: product.script,
            position: product.position,
            price1: product.price1,
            price2: product.price2,
            price3: product.price3,
            target: product.target,
            stopLoss: product.stopLoss,
            createdAt: new Date(product.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            description: product.description,
            uploadFile: product.uploadFile,
            statusValue: product.statusValue,
            pnl: pnl,
            created_by: product.created_by,
            updated_by: product.updated_by,
          };
        });

        tableRef.current = $("#userTable").DataTable({
          paging: true,
          pageLength: 10,
          searching: true,
          fixedHeader: true,
          destroy: true,
          data: formattedData,
          columns: [
            { data: "serialNumber" },
            { data: "productName" },
            { data: "quantity" },
            { data: "dealType" },
            { data: "script" },
            { data: "position" },
            { data: "price1" },
            // { data: 'price2' },
            // { data: 'price3' },
            { data: "target" },
            { data: "stopLoss" },
            { data: "createdAt" },
            // { data: "description" },
            // { data: 'uploadFile' },
            { data: "statusValue" },
            { data: "pnl" }, // P&L column
            {
              data: null,
              render: function (data, type, row) {
                return '<button class="edit-button">img</button>';
              },
            },
            {
              data: null,
              render: function (data, type, row) {
                return '<button class="edit-button">Action</button>';
              },
            },
          ],
          rowCallback: function (row, data) {
            const imgButton = $('<button class="btn btn-success">Img</button>');
            imgButton.on("click", () => handleImgPopup(data));
            $("td:nth-child(13)", row).html(imgButton); // Assuming "Img" button is the 12th column

            const editButton = $(
              '<button class="btn btn-success">Action</button>'
            );
            editButton.on("click", () =>
              handleEditClick(data, row.productName)
            );
            $("td:last-child", row).html(editButton);

            const pnlCell = $("td:nth-child(12)", row); // Adjust the column index accordingly
            const pnlValue = data.pnl;
            const statusValue = data.statusValue;

            if (pnlValue > 0) {
              pnlCell
                .text(`+${pnlValue}`)
                .css("color", statusValue === "Target HIT" ? "green" : "black");
            } else {
              pnlCell
                .text(`${pnlValue}`)
                .css("color", statusValue === "Stop Loss" ? "red" : "black");
            }

            // Format based on the status
            const statusCell = $("td:nth-child(11)", row); // Adjust the column index accordingly

            if (statusValue === "Target HIT") {
              statusCell.css("color", "green");
            } else if (statusValue === "Stop Loss") {
              statusCell.css("color", "red");
            } else {
              statusCell.css("color", "black");
            }
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      if (tableRef.current) {
        $("#userTable").DataTable().destroy();
      }
    };
  }, [isPopupOpen]);
  return (
    <div>
      <div>
        <Home />
        <div className="user-table-container">
          <table id="userTable" className="display" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product Name</th>
                <th>Qty</th>
                <th>Type</th>
                <th>Script</th>
                <th>Position</th>
                <th>P1</th>
                {/* <th>P2</th>
              <th>P3</th> */}
                <th>Target</th>
                <th>Stoploss</th>
                <th>createdAt</th>
                <th>Status</th>
                <th>P&L</th>
                <th>Img</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody />
          </table>
        </div>
      </div>
      <div>
        {/* Popup component using Reactstrap */}
        <Popup
          isOpen={isPopupOpen}
          toggle={togglePopup}
          data={selectedRowData}
          onClose={togglePopup}
          productNameValue={SelectedProductName}
          quantityValue={selectedQty}
          dealTypeValue={selectedDealtype}
          scriptValue={selectedScript}
          positionValue={selectedPosition}
          price1Value={selectedPrice1}
          targetValue={selectedTarget}
          stoplossValue={selectedStoploss}
          newStatusValue={selectedStatus}
          descriptionValue={selectedDescription}
        />
        <ImgPopUp
          isOpenImg={imgPopupOpen}
          toggleImg={imgtogglePopup}
          onCloseImg={imgtogglePopup}
          imgData={selectedRowData}
          imgValue={selectedImg}
        />
      </div>
    </div>
  );
}

export default LiveCall;
