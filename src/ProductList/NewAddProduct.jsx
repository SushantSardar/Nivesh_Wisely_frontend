import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import Home from "../Home/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const api_url = process.env.REACT_APP_API_URL;

const NewAddProduct = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [fileSizeError, setFileSizeError] = useState("");
  // const [switchState, setSwitchState] = useState(true)
  const [uploadFile, setFileUpload] = useState("");

  const [clientData, setClientData] = useState({
    productName: "",
    productType: "",
    description: "",
    shortDescription: "",
    uploadFile: "",
    caps: [],
  });

  const handleAdd = () => {
    setClientData({
      ...clientData,
      caps: [
        ...clientData.caps,
        {
          capCategory: "",
          capPrice: "",
          capDuration: "",
          isActive: false,
        },
      ],
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

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...clientData.caps];
    updatedProducts[index][field] = value;
    setClientData({
      ...clientData,
      caps: updatedProducts,
    });
  };

  //function for deleting caps

  const handleDelete = (index) => {
    const updateDeletedProducts = [...clientData.caps];
    updateDeletedProducts.splice(index, 1);
    setClientData({
      ...clientData,
      caps: updateDeletedProducts,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `${api_url}/newProduct`;
      const data = new FormData(e.currentTarget);

      const maxFileSize = 20 * 1024;
      const file = data.get("productImage");

      if (file && file.size > maxFileSize) {
        setFileSizeError(
          "File size exceeds the allowed limit (20KB). Please select a smaller file."
        );
        return; // Exit the function if file size is too large
      }
      const payload = {
        productName: data.get("productName"),
        productType: data.get("productType"),
        description: data.get("description"),
        shortDescription: data.get("shortDescription"),
        uploadFile: uploadFile,
        caps: clientData.caps.map((product) => ({
          capCategory: product.capCategory,
          capPrice: product.capPrice,
          capDuration: product.capDuration,
          isActive: product.isActive,
        })),
      };
      console.log("payload", payload);

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
        setMessage("Data submitted sucessfully");
        navigate("/productlist");
        console.log("responseData", responseData);
        e.target.reset();
      }
      console.log("Product added successfully!!");
    } catch (error) {
      setMessage("Failed to submit Data !! Check your Image Size");
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

  return (
    <div>
      <Home />
      <div className="form-container">
        <div className="form-align">
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Product Name</Label>
                  <Input
                    placeholder=" Enter Product"
                    type="text"
                    id="ProductNameInput"
                    name="productName"
                    required='true'
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleSelect">Product Type</Label>
                  <Input
                    id="ProductTypeInput"
                    type="select"
                    name="productType"
                    placeholder="please select"
                    required='true'
                  >
                    <option selected disabled value="">
                      --Select--
                    </option>
                    <option value={"Product"}>Product</option>
                    <option value={"Service"}>Service</option>
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
                    placeholder="Leave a comment here"
                    id="DescriptionInput"
                    name="description"
                    rows={4}
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleCity">Short Description</Label>
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="ShortDescriptionInput"
                    name="shortDescription"
                    required='true'
                    rows={4}
                  ></textarea>
                  <FormText
                    color="muted"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    Text limit 0-50 Words only
                  </FormText>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleFile">Upload Image</Label>
                  <Input
                    id="ImageInput"
                    name="uploadFile"
                    type="file"
                    accept="image/*"
                    onChange={imageChangeHandler}
                    // required='true'
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
            {/* Add category fields */}
            {clientData.caps.map((product, index) => (
              <Fragment key={index}>
                <Row>
                  <Col md={4}>
                    <h5>Cap Details</h5>
                  </Col>
                  <Col md={4}>
                    <button
                      type="button"
                      style={{
                        border: "none",
                        padding: "10px",
                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "flex",
                        alignItems: "end",
                      }}
                      onClick={() => handleDelete(index)}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          color: "red",
                          fontSize: "14px",
                        }}
                      />
                    </button>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label> Cap Category </Label>
                      <Input
                        type="select"
                        name={`caps[${index}].capCategory`}
                        value={product.capCategory}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "capCategory",
                            e.target.value
                          )
                        }
                      >
                        <option selected disabled value="">
                          --Select--
                        </option>
                        <option>Small Cap</option>
                        <option>Mid Cap</option>
                        <option>Large Cap</option>
                        <option>All In One</option>
                        <option>Cash</option>
                        <option>Future</option>
                        <option>Option</option>
                        <option>Others</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleState">Cap Price</Label>
                      <Input
                        id="exampleState"
                        name={`caps[${index}].capPrice`}
                        type="number"
                        min={0}
                        value={product.capPrice}
                        onChange={(e) =>
                          handleProductChange(index, "capPrice", e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
                  {/* ... (other product input fields) */}
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleState">Cap Duration</Label>
                      <Input
                        id="exampleState"
                        name={`caps[${index}].capDuration`}
                        type="number"
                        min={0}
                        value={product.capDuration}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "capDuration",
                            e.target.value
                          )
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col
                    md={2}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <FormGroup switch>
                      <br />
                      <Label>DeActive / Active </Label>

                      <Input
                        style={{
                          border: "1px solid gray",
                        }}
                        type="switch"
                        checked={product.isActive}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "isActive",
                            e.target.checked
                          )
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
              </Fragment>
            ))}
            <br />
            <Row>
              <Col md={4}></Col>
              <Col md={3}>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAdd}
                >
                  Add Category
                </button>
              </Col>
              <Col md={3}>
                {
                  clientData.caps.length !== 0 ?
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{
                    backgroundColor: "#259D90",
                    border: "1px solid lightgray",
                  }}
                >
                  Submit
                </button> : ""
                }
                <br />
                <p>{message}</p>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewAddProduct;
