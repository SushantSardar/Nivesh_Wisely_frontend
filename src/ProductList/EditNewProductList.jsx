import React from "react";
import { useGlobalContext } from "../LoginPage/GlobalContext";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const api_url = process.env.REACT_APP_API_URL;

const EditNewProductList = () => {
  const { productListId, setProductListId } = useGlobalContext();
  const [fileSizeError, setFileSizeError] = useState("");
  const [message, setMessage] = useState();
  // const [switchState, setSwitchState] = useState(true)
  const [currentProductData, setCurrentProductData] = useState(null);
  const [uploadFile, setFileUpload] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (!productListId) {
      console.log("product not found");
      navigate("/productlist");
    }
  }, []);

  const handleGoBack = () => {
    navigate("/productlist")
  }

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

  //fetch the particular client based on clientId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api_url}/newProductList/${productListId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("result", result);
        setCurrentProductData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //Add products

  const handleAdd = () => {
    setCurrentProductData({
      ...currentProductData,
      caps: [
        ...currentProductData.caps,
        {
          capCategory: "",
          capPrice: "",
          capDuration: "",
          isActive: false,
        },
      ],
    });
  };

  //function for delete caps

  const handleDelete = (index) => {
    const updateDeletedProducts = [...currentProductData.caps];
    updateDeletedProducts.splice(index, 1);
    setCurrentProductData({
      ...currentProductData,
      caps: updateDeletedProducts,
    });
  };

  //fetch request for products to display in select box
  /* 
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/products/all`)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setProductData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 */
  //PUT request for clients

  const handleCapsChange = (index, field, value) => {
    const updatedCaps = [...currentProductData.caps];
    updatedCaps[index][field] = value;
    setCurrentProductData({
      ...currentProductData,
      caps: updatedCaps,
    });
  };

  const handleInputChange = (fieldName, value) => {
    setCurrentProductData({
      ...currentProductData, [fieldName]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        productName: currentProductData.productName,
        productType: currentProductData.productType,
        description: currentProductData.description,
        shortDescription: currentProductData.shortDescription,
        uploadFile: currentProductData.uploadFile,
        caps: currentProductData.caps.map((product) => ({
          capCategory: product.capCategory,
          capPrice: product.capPrice,
          capDuration: product.capDuration,
          isActive: product.isActive,
        })),
      };

      console.log(payload, JSON.stringify(payload));

      const response = await fetch(
        `${api_url}/updateProduct/${productListId}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      if (responseData) {
        setMessage("Data submitted successfully");
        navigate("/productlist");
      }
    } catch (error) {
      setMessage("Failed to submit Data");
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
  console.log(currentProductData?.uploadFile, "wkdegjqwegd");
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
                    value={currentProductData?.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}

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
                    value={currentProductData?.productType}
                    onChange={(e) => handleInputChange("productType", e.target.value)}

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
                    value={currentProductData?.description}
                    name="description"
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
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
                    value={currentProductData?.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    rows={2}
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
              <Col md={6}>
                <br />
                <img style={{ height: "50px", width: "50px" }} src={uploadFile ? uploadFile : currentProductData?.uploadFile} alt="" />
              </Col>
            </Row>
            {/* Add category fields */}
            {currentProductData?.caps?.map((cap, index) => (
              <div key={index}>
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
                        value={cap.capCategory}
                        onChange={(e) =>
                          handleCapsChange(index, "capCategory", e.target.value)
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
                        value={cap.capPrice}
                        onChange={(e) =>
                          handleCapsChange(index, "capPrice", e.target.value)
                        }
                      />
                    </FormGroup>
                  </Col>
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
                        value={cap.capDuration}
                        onChange={(e) =>
                          handleCapsChange(index, "capDuration", e.target.value)
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
                        checked={cap.isActive}
                        onChange={(e) =>
                          handleCapsChange(index, "isActive", e.target.checked)
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
              </div>
            ))}

            <br />
            <Row>
              <Col md={3}></Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleGoBack}
                >
                  Go back
                </button>
              </Col>
              <Col md={2}>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleAdd}
                >
                  Add Category
                </button>
              </Col>
              <Col md={2}>
                <button
                  className="btn btn-success"
                  type="submit"
                  style={{
                    backgroundColor: "#259D90",
                    border: "1px solid lightgray",
                  }}
                >
                  Submit
                </button>
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

export default EditNewProductList;
