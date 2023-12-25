import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const api_url = process.env.REACT_APP_API_URL;

const FactSheet = () => {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [uploadFile, setUploadFile] = useState("");
  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    try {
      const url = `${api_url}/factsheet`;

      if (products.length === 0) {
        setMessage("No products added. Please add products before saving.");
        return;
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products), // Send the products as JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Products added successfully:", responseData);
      setMessage("Data Submitted Successfully");
      navigate("/profile");
    } catch (error) {
      setMessage("Failed to submit data");
      console.error("Error", error);
    }
  };

  const handleAdd = () => {
    const product = {
      productName: "",
      category: "",
      uploadFile: uploadFile,
    };
    setProducts([...products, product]);
  };

  //delete function

  const handleDelete = (index) => {
    setProducts((prev) => prev.filter((val, i) => i !== index));
  };

  const handleFieldChange = (index, key, value) => {
    const updatedProduct = { ...products[index], [key]: value };
    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;
    console.log(updatedProducts);
    setProducts(updatedProducts);
  };
  let imageChangeHandler = (event, index) => {
    let imageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.addEventListener("load", () => {
      if (reader.result) {
        setUploadFile(reader.result);
        handleFieldChange(index, "uploadFile", reader.result.toString());
      } else {
        alert("error");
      }
    });
  };
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/newProductList`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          const result = await response.json();
          setProductData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(products)

  return (
    <div>
      <Home />
      <div className="form-container">
        <div className="form-align">
        <Form onSubmit={handleSubmit}  id="factSheetForm">
          {products.map((product, index) => (  
              <Row key={index}>
                <Col md={4}>
                  <FormGroup>
                    <Label for={`productName${index}`}>Product Name</Label>
                    <Input
                      required="true"
                      id={`productName${index}`}
                      type="select"
                      value={product.productName}
                      onChange={(e) =>
                        handleFieldChange(index, "productName", e.target.value)
                      }
                    >
                      <option selected disabled value="">
                        --Select--
                      </option>
                      {Array.from(
                        new Set(
                          productData.map((product) => product.productName)
                        )
                      ).map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for={`category${index}`}>Category</Label>
                    <Input
                      required="true"
                      id={`category${index}`}
                      type="text"
                      value={product.category}
                      onChange={(e) =>
                        handleFieldChange(index, "category", e.target.value)
                      }
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for={`uploadFile${index}`}>uploadFile</Label>
                    <Input
                      required="true"
                      id={`uploadFile${index}`}
                      type="file"
                      onChange={(e) => imageChangeHandler(e, index)}
                    />
                  </FormGroup>
                </Col>
                <Col md={1}>
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
          ))}
          <Row> 
            <Col md={4}></Col>
            <Col md={3}>
              <button type="button" className="btn btn-success" onClick={handleAdd}>
                Add Product
              </button>
            </Col>
            <br />
            <Col md={3}>
           <button type="submit" className="btn btn-success">Send</button>
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

export default FactSheet;
