import React, { useEffect, useState } from "react";
import {  Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, FormGroup, Form, Label, Input,} from "reactstrap";
import { useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;


const Popup = ({
  isOpen,
  toggle,
  data: rowData,
  onClose,
  productNameValue,
  quantityValue,
  dealTypeValue,
  scriptValue,
  positionValue,
  price1Value,
  targetValue,
  stoplossValue,
  newStatusValue,
  descriptionValue,
  customizeValue,
}) => {
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [saveButtonDisabled, setSaveButtonDisabled] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    dealType: "",
    script: "",
    position: "",
    price1: "",
    price2: "",
    price3: "",
    target: "",
    stopLoss: "",
    description: "",
    statusValue: "",
    customizeValue: "",
  });
  console.log(rowData);

  useEffect(() => {
    console.log(status);
  }, [status]);

  const HandleStatus = (e) => {
    const value = e.target.value;
    setStatus(value);
    console.log(value);
  };
  const handlePopupConfirm = async () => {
    try {

      toggle();
      //  data submission logic here
      const data = new FormData(document.querySelector("#productForm"));

      const payload = {
        productName: data.get("productName"),
        quantity: data.get("quantity"),
        dealType: data.get("dealType"),
        script: data.get("script"),
        position: data.get("position"),
        price1: data.get("price1"),
        price2: data.get("price2"),
        price3: data.get("price3"),
        target: data.get("target"),
        stopLoss: data.get("stopLoss"),
        description: data.get("description"),
        statusValue: data.get("statusValue"),
        customizeValue: data.get("customizeValue"),
        // uploadFile:data.get('uploadFile'),
      };
      let pnl;

      if (payload.statusValue === "Target HIT") {
        pnl = (payload.target - payload.price1) * payload.quantity;
      } else if (payload.statusValue === "Stop Loss") {
        pnl = (payload.stopLoss - payload.price1) * payload.quantity;
      } else if (payload.statusValue === "Customize") {
        pnl = (payload.customizeValue - payload.price1) * payload.quantity;
      } else {
        pnl = 0; // Set default value
      }

      payload.pnl = pnl;

      console.log("payload", payload);
      let url = `${api_url}/sendcall`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
     

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData) {
        console.log("responseData", responseData);
        setFormData({
          productName: "",
          quantity: "",
          dealType: "",
          script: "",
          position: "",
          price1: "",
          price2: "",
          price3: "",
          target: "",
          stopLoss: "",
          description: "",
          statusValue: "",
          customizeValue: "",
        });
      }
      
      
      console.log("Product added successfully!!");
      
      // navigate("/livecall");
      
    } catch (error) {
      console.error("Error", error);
      setSaveButtonDisabled(false);
    }
  };

  return (
    <Modal size="lg" isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Edit Data</ModalHeader>
      <ModalBody>
        <div>
          <Form id="productForm" encType="multipart/form-data">
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label>Product</Label>
                  <Input
                    id="exampleSelect"
                    name="productName"
                    type="text"
                    required="true"
                    defaultValue={productNameValue}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="examplePassword">Quantity</Label>
                  <Input
                    placeholder=" Enter Quantity"
                    type="number"
                    name="quantity"
                    required="true"
                    defaultValue={quantityValue}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">Buy/Sell</Label>
                  <Input
                    id="exampleSelect"
                    name="dealType"
                    type="input"
                    defaultValue={dealTypeValue}
                  >
                    <option>--Select--</option>
                    <option>Buy</option>
                    <option>Sell</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">Script</Label>
                  <Input
                    id="exampleState"
                    name="script"
                    defaultValue={scriptValue}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleZip">Above/Below/At</Label>
                  <Input
                    id="exampleSelect"
                    name="position"
                    type="text"
                    defaultValue={positionValue}
                  >
                    <option>--Select--</option>
                    <option>Above</option>
                    <option>Below</option>
                    <option>At</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">Price-1</Label>
                  <Input
                    id="exampleSelect"
                    name="price1"
                    type="number"
                    min={0}
                    defaultValue={price1Value}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">With Target</Label>
                  <Input
                    id="exampleState"
                    name="target"
                    type="number"
                    defaultValue={targetValue}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleZip">With Stop Loss</Label>
                  <Input
                    id="exampleSelect"
                    name="stopLoss"
                    type="number"
                    defaultValue={stoplossValue}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    id="exampleSelect"
                    name="statusValue"
                    type="select"
                    required="true"
                    placeholder="please select the Field"
                    onChange={HandleStatus}
                  >
                    <option selected disabled defaultValue="">
                      --Select--
                    </option>
                    <option>Target HIT</option>
                    <option>Stop Loss</option>
                    <option>Executed</option>
                    {(newStatusValue === "Executed") |
                      (newStatusValue === "Stop Loss") |
                      (newStatusValue === "Target HIT") ? (
                      ""
                    ) : (
                      <>
                        <option>Avoid</option>
                        <option>Customize</option>
                      </>
                    )}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleCity">Description</Label>
                  <textarea
                    class="form-control"
                    // placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    rows={2}
                    name="description"
                    defaultValue={descriptionValue}
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {/* <Col md={4}>
                    <FormGroup>
                      <Label for="exampleZip">
                        Status Value
                      </Label>
                      <Input
                        type="text"
                        defaultValue={newStatusValue}
                      >
                      </Input>
                    </FormGroup>
                  </Col> */}
              {status === "Customize" ? (
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleZip">Customize</Label>
                    <Input type="Number" name="customizeValue"></Input>
                  </FormGroup>
                </Col>
              ) : null}
            </Row>
          </Form>
        </div>
      </ModalBody>
      <ModalFooter>
        {newStatusValue === "Target HIT" ? (
          <p>
            <button  className="btn btn-success" onClick={handlePopupConfirm} disabled={saveButtonDisabled}>
              Save
            </button>
          </p>
        ) : newStatusValue === "Stop Loss" ? (
          <p>
            <button className="btn btn-success" onClick={handlePopupConfirm} disabled={saveButtonDisabled}>
              Save
            </button>
          </p>
        ) : newStatusValue === "Executed" ? (
          <p>
            <button className="btn btn-success" onClick={handlePopupConfirm} disabled={saveButtonDisabled}>
              Save
            </button>
          </p>
        ) : newStatusValue === "Avoid" ? (
          <p></p>
        ) : (
          <>
            {status === "Customize" ? (
              <>
                <button
                  className="btn btn-success"
                  onClick={handlePopupConfirm} disabled={saveButtonDisabled}
                >
                  Save
                </button>
              </>
            ) : (
              <button className="btn btn-success" onClick={handlePopupConfirm} disabled={saveButtonDisabled}>
                Send
              </button>
            )}
          </>
        )}
        <button className="btn btn-danger" onClick={onClose}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default Popup;
