import React, { useState, useEffect } from "react";
import "./sendCall.css";
import { Button, Col, Form, FormGroup, Input, Label, Row, FormText } from "reactstrap";
import Home from "../Home/Home";
import ConfirmationPopup from "./ConfirmationPopup";
import { useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;
const SendCall = () => {
  const navigate = useNavigate();

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [dealType, setDealtype] = useState("");
  const [script, setScript] = useState("");
  const [position, setPosition] = useState("");
  const [price1, setPrice1] = useState("");
  const [target, setTarget] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [uploadFile, setFileUpload] = useState("");
  const [actualProductList, setActualProductList] = useState([]);
  const [fileSizeError, setFileSizeError] = useState("");

  const togglePopup = () => setPopupOpen(!isPopupOpen);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(document.querySelector("#productForm"));

    const maxFileSize = 20 * 1024;
    const file = data.get("productImage");

    if (file && file.size > maxFileSize) {
      setFileSizeError(
        "File size exceeds the allowed limit (20KB). Please select a smaller file."
      );

      return;
    }
    setDealtype(e.currentTarget.dealType.value);
    setScript(e.currentTarget.script.value);
    setPosition(e.currentTarget.position.value);
    setPrice1(e.currentTarget.price1.value);
    setTarget(e.currentTarget.target.value);
    setStopLoss(e.currentTarget.stopLoss.value);
    togglePopup();
  };

  const handlePopupConfirm = async () => {
    try {
      let url = `${api_url}/sendcall`;
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
        uploadFile: uploadFile,
        pnl: 0,
        statusValue: data.get("statusValue"),
      };
      console.log(payload);

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
      }
      console.log("Product added successfully!!");
      navigate("/livecall");
    } catch (error) {
      console.error("Error", error);
    }
  };
  let imageChangeHandler = async (event) => {
    let imageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", () => {
      if (reader.result) {
        setFileUpload(reader.result);
      } else {
        alert("error");
      }
    });
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




  //fetching data from database for selectbox

  useEffect(() => {
    const uniqueProductKeys = new Set();
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/newProductList`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        const result2 = await result.flatMap((item) =>
          item.caps.map((cap) => {
            const key = `${item.productName}-${cap.capCategory}`;
            if (!uniqueProductKeys.has(key)) {
              uniqueProductKeys.add(key);
              return {
                value: key,
                label: `${item.productName} - ${cap.capCategory}`,
              };
            }
            return null;
          })
        );
        const finallist = await result2.filter((item) => item !== null);
        setActualProductList(finallist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Home />
      <div className="form-container">
        <div className="form-align">
          <Form
            id="productForm"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Product</Label>
                  <Input
                    id="exampleSelect"
                    name="productName"
                    type="select"
                    required="true"
                  >
                    <option selected disabled value="">
                      --Select--
                    </option>
                    {actualProductList.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Quantity</Label>
                  <Input
                    placeholder=" Enter Quantity"
                    type="number"
                    name="quantity"
                    required="true"
                    min={0}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">Buy/Sell</Label>
                  <Input
                    id="exampleSelect"
                    name="dealType"
                    type="select"
                    placeholder="Select"
                    required="true"
                  >
                    <option selected disabled value="">
                      --Select--
                    </option>
                    <option>Buy</option>
                    <option>Sell</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">Script</Label>
                  <Input id="exampleState" name="script" required="true" />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleZip">Above/Below/At</Label>
                  <Input
                    id="exampleSelect"
                    name="position"
                    type="select"
                    required="true"
                  >
                    <option selected disabled value="">
                      --Select--
                    </option>
                    <option>Above</option>
                    <option>Below</option>
                    <option>At</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">Price-1</Label>
                  <Input
                    id="exampleSelect"
                    name="price1"
                    type="number"
                    min={0}
                    required="true"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">Price-2</Label>
                  <Input
                    disabled
                    id="exampleSelect"
                    name="price2"
                    type="number"
                    min={0}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">Price-3</Label>
                  <Input
                    id="exampleSelect"
                    name="price3"
                    disabled
                    type="number"
                    min={0}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleState">With Target</Label>
                  <Input
                    id="exampleState"
                    name="target"
                    type="number"
                    required="true"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleZip">With Stop Loss</Label>
                  <Input
                    id="exampleSelect"
                    name="stopLoss"
                    type="number"
                    required="true"
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
          <Col md={3}>
          </Col>
          <Col md={3}>
            <FormGroup>
              <Label for="exampleSelect">
                Sample
              </Label>
            </FormGroup>
          </Col>
        </Row> */}
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleCity">Rationally</Label>
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    rows={4}
                    name="description"
                    required="true"
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleFile">Upload Image</Label>
                  <Input
                    id="exampleFile"
                    name="uploadFile"
                    type="file"
                    required="true"
                    onChange={imageChangeHandler}
                  />
                  {fileSizeError ? (
                    <div style={{ color: "red" }}>{fileSizeError}</div>
                  ) : (
                    <FormText
                      color="muted"
                      style={{ display: "flex", justifyContent: "end" }}
                    >
                      Image size should be less than 20KB.
                    </FormText>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={12} className="d-flex justify-content-center">
                <FormGroup>
                  <Button type="submit" className="save_btn">
                    Send{" "}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>

          {/* Confirmation Popup */}
          <ConfirmationPopup
            isOpen={isPopupOpen}
            toggle={togglePopup}
            onConfirm={handlePopupConfirm}
            dealTypeValue={dealType}
            scriptTypeValue={script}
            positionTypeValue={position}
            priceTypeValue={price1}
            targetTypeValue={target}
            stopLossValue={stopLoss}
          />
        </div>
      </div>
    </div>
  );
};

export default SendCall;
