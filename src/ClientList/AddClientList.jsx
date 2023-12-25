import React, { Fragment, useContext, useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ClientContext } from "./clientContext.jsx/ClientContext"
import Home from "../Home/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { cleanData } from "jquery";
const api_url = process.env.REACT_APP_API_URL;
const ISTMoment = (dateString) => moment(dateString).utcOffset(330, true);

const AddClientList = () => {
  const { setAllClientsData, allClientsData } = useContext(ClientContext);
  const navigate = useNavigate()
  const [message, setMessage] = useState('');
  const [selectedProduct_Price, setSelectedProduct_Price] = useState(0)
  const [selectedProduct_Duration, setSelectedProduct_Duration] = useState(0);
  const [selectedProduct_Name, setSelectedProduct_Name] = useState("");
  const [serEndDate, setSerEndDate] = useState("");
  const [productData, setProductData] = useState([]);
  const [productOptionData, setProductOptionData] = useState([]);

  const [clientData, setClientData] = useState({
    userName: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    products: [],
    createdBy: "",
    updatedBy: "",
  });


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


  const [adminName, setAdminName] = useState(() =>
    sessionStorage.getItem("displayName"));


  const handlegoback = () => {
    navigate("/clientlist");
  }

  const handleDelete = (index) => {
    const updatedProducts = [...clientData.products];
    updatedProducts.splice(index, 1); // Remove the product at the specified index
    setClientData({
      ...clientData,
      products: updatedProducts,
    });
  };
  const handleAdd = (index) => {
    setClientData({
      ...clientData,
      products: [
        ...clientData.products,
        {
          productName: "",
          productPrice: "",
          productDuration: "",
          fromDate: ISTMoment(),
          toDate: ISTMoment(),
          paidAmount: "",
          dueAmount: "",
          serviceStatus: "",
          kycStatus: "",
          saStatus: "",
        },
      ],
    });
  };

  const handleProductChange = (index, field, value) => {
    // console.log('✌️value --->', value);
    // console.log('✌️field --->', field);
    const updatedProducts = [...clientData.products];

    if (field === "fromDate") {
      updatedProducts[index][field] = ISTMoment(value);
    } else {
      updatedProducts[index][field] = value;
    }

    if (field === "fromDate" || field === "paidAmount") {
      const subscriptiondays =
        (selectedProduct_Duration * clientData.products[index].paidAmount) /
        selectedProduct_Price;
      const serviceEndDate = ISTMoment(
        updatedProducts[index]["fromDate"].format("YYYY-MM-DD")
      ).add(subscriptiondays, "days");
      setSerEndDate(serviceEndDate);
      updatedProducts[index]["toDate"] = ISTMoment(
        serviceEndDate.format("YYYY-MM-DD")
      );
    }
    if (field === "productDuration") {
      updatedProducts[index][field] = value;
    }

    setClientData({
      ...clientData,
      products: updatedProducts,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const lowerCaseEmail = clientData.clientMail.toLowerCase();
      const payload = {
        userName: clientData.userName,
        password: clientData.password,
        name: clientData.name,
        email: lowerCaseEmail,
        clientPhoneNumber: clientData.clientPhoneNumber,
        createdBy: adminName,
        updatedBy: clientData.updatedBy,
        products: clientData.products.map((product, index) => ({
          productName: product.productName,
          productPrice: product.productPrice,
          productDuration: product.productDuration,
          fromDate: product.fromDate,
          toDate: product.toDate,
          paidAmount: product.paidAmount,
          serviceEndDate: product.toDate,
          dueAmount: product.productPrice - product.paidAmount,
          serviceStatus: product.serviceStatus,
          kycStatus: product.kycStatus,
          saStatus: product.saStatus,
        })),
      };
      console.log('✌️payload --->', payload);

      const response = await fetch(`${api_url}/addclientlist`, {
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
      // ____________________Data population can be added________________
      // setAllClientsData({...allClientsData,});
      if (responseData) {
        navigate("/clientlist");
        setMessage("Data submitted successfully");
      }
    } catch (error) {
      setMessage("Failed to submit Data");
      console.error("Error", error);
    }
  };

  useEffect(() => {
    // console.log(clientData);
  }, [clientData]);

  // fetching products from productlist

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/newProductList`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        const newArray = result.flatMap((item) => {
          return item.caps.map((cap) => ({
            name: `${item.productName}-${cap.capCategory}`,
            capPrice: cap.capPrice,
            capDuration: cap.capDuration,
          }));
        });
        setProductOptionData(newArray);
        setProductData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChoseProduct = (index, event) => {
    // console.log('✌️index --->', index);

    const selectedProduct =
      event.target.options[event.target.selectedIndex].dataset.myDataAttribute;
    const selectedProductParts = selectedProduct.split("-");
    const selectedProduct_name = selectedProductParts[0];
    const selectedProduct_catergory = selectedProductParts[1];
    setSelectedProduct_Name(
      selectedProduct_name + "-" + selectedProduct_catergory
    );
    const selectedProduct_duration = parseInt(selectedProductParts[2]);

    const selectedProductData = productData.find(
      (product) => product.productName === selectedProduct_name
    );

    if (selectedProductData) {
      const selectedProductCaps = selectedProductData.caps.filter(
        (cap) => cap.capCategory === selectedProduct_catergory
      );
      const selectedCap = selectedProductCaps.find(
        (cap) => cap.capDuration === selectedProduct_duration
      );
      if (selectedCap) {
        const selectedPrice = selectedCap.capPrice;
        setSelectedProduct_Price(selectedPrice);
        handleProductChange(index, "productPrice", selectedPrice);

        handleProductChange(index, "dueAmount", 0);
        setSelectedProduct_Duration(selectedProduct_duration);
        handleProductChange(index, "productDuration", selectedCap.capDuration);
      }
    }
  };

  return (
    <div>
      <Home />
      <div className="form-container">
        <div className="form-align">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <h4>App Credentials</h4>
              </Col>
            </Row>
            <Row>
              {/* <Col md={6}>
                <FormGroup>
                  <Label>User Name</Label>
                  <Input
                    type="text"
                    name="userName"
                    required='true'
                    value={clientData.userName}
                    onChange={(e) =>
                      setClientData({ ...clientData, userName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col> */}
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleState">Email</Label>
                  <Input
                    name="email"
                    type='email'
                    required='true'
                    value={clientData.clientMail}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        clientMail: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    required="true"
                    value={clientData.password}
                    onChange={(e) =>
                      setClientData({ ...clientData, password: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <h4>General Information</h4>
              </Col>
            </Row>
            <Row>
              {/* <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">Name</Label>
                  <Input
                    name="name"
                    type="name"
                    required='true'
                    value={clientData.name}
                    onChange={(e) =>
                      setClientData({ ...clientData, name: e.target.value })
                    }
                  ></Input>
                </FormGroup>
              </Col> */}
              <Col md={6}>
                <FormGroup>
                  <Label>User Name</Label>
                  <Input
                    type="text"
                    name="userName"
                    required='true'
                    value={clientData.userName}
                    onChange={(e) =>
                      setClientData({ ...clientData, userName: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="exampleZip">Mobile Number</Label>
                  <Input
                    name="clientPhoneNumber"
                    type="number"
                    required='true'
                    min={0}
                    value={clientData.clientPhoneNumber}
                    onChange={(e) =>
                      setClientData({
                        ...clientData,
                        clientPhoneNumber: e.target.value,
                      })
                    }
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={3}>
                <h4>Product Information</h4>
              </Col>
            </Row>
            {/* Add product fields */}
            {clientData.products.map((product, index) => {
              return (<Fragment key={index}>
                <Row>
                  <Col md={3}>
                    <h5>Product Details</h5>
                  </Col>
                  <Col md={2}>
                    <button
                      type='button'
                      style={{
                        border: 'none', padding: '10px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'end',

                      }}
                      onClick={() => handleDelete(index)}>
                      <FontAwesomeIcon icon={faTrash} style={{
                        color: 'red',
                        fontSize: '14px'

                      }} />
                    </button></Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label>Product Name</Label>
                      <Input
                        type="select"
                        name={`products[${index}].productName`}
                        // value={product.productName}
                        onChange={(e) => {
                          handleChoseProduct(index, e);
                          handleProductChange(
                            index,
                            "productName",
                            e.target.value
                          );
                        }}
                      >
                        <option selected disabled value="">
                          --Select--
                        </option>
                        {productOptionData?.map((item) => (
                          <option
                            key={item.name}
                            className="dropdown__option"
                            data-my-data-attribute={
                              item.name +
                              "-" +
                              item.capDuration +
                              "-" +
                              item.capPrice
                            }
                            value={item.name}
                          >
                            {item.name}${item.capDuration}{" "}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleState">Product Price</Label>
                      <Input
                        id="exampleState"
                        name={`products[${index}].productPrice`}
                        type="number"
                        min={0}
                        value={product.productPrice}
                        // readOnly
                        disabled
                        onChange={(e) => handleChoseProduct(index, e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleCity">
                        Paid Amount
                      </Label>
                      <Input
                        id="exampleSelect"
                        name={`products[${index}].paidAmount`}
                        type="number"
                        min={0}
                        required='true'
                        value={product.paidAmount}
                        onChange={(e) => handleProductChange(index, 'paidAmount', e.target.value)}
                      >
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleState">
                        Due Amount
                      </Label>
                      <Input
                        id="exampleState"
                        name={`products[${index}].dueAmount`}
                        type='number'
                        min={0}
                        disabled
                        value={product.productPrice - product.paidAmount}
                        onChange={(e) => handleChoseProduct(index, e)}
                      // onChange={() => handleProductChange(index, 'dueAmount', product.productPrice-product.paidAmount)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleCity">
                        From date <span style={{ fontSize: "12px", fontWeight: 600 }}> (DD/MM/YYYY) </span>
                      </Label>
                      <Input
                        id="exampleSelect"
                        name={`products[${index}].fromDate`}
                        type="date"
                        required='true'
                        value={product.fromDate.format("YYYY-MM-DD")}
                        onChange={(e) => handleProductChange(index, 'fromDate', e.target.value)}

                      >
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleState">
                        To date <span style={{ fontSize: "12px", fontWeight: 600 }}> (DD/MM/YYYY) </span>
                      </Label>
                      <Input
                        id="exampleState"
                        name={`products[${index}].toDate`}
                        type='date'
                        min={0}
                        value={product.toDate.format("YYYY-MM-DD")}
                        disabled
                        onChange={(e) => handleProductChange(index, 'toDate', e.target.value)}

                      />
                    </FormGroup>
                  </Col>
                  {/* <Col md={4}>
                    <FormGroup>
                      <Label for="exampleState">
                        Service End date <span style={{ fontSize: "12px", fontWeight: 600 }}> (DD/MM/YYYY) </span>
                      </Label>
                      <Input
                        id="exampleState"
                        name={`products[${index}].toDate`}
                        type='date'
                        min={0}
                        disabled
                        // defaultValue={product.toDate}
                        value={product.toDate.format("YYYY-MM-DD")}
                      // onChange={(e) => handleProductChange(index, 'toDate', e.target.value)}

                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleCity">
                        Service Status
                      </Label>
                      <Input
                        id="exampleSelect"
                        name={`products[${index}].serviceStatus`}
                        type="select"
                        required='true'
                        value={product.serviceStatus}
                        onChange={(e) => handleProductChange(index, 'serviceStatus', e.target.value)}
                      >
                        <option selected disabled value="">
                          --Select--
                        </option>
                        <option >Active</option>
                        <option >Expired</option>
                        <option >Hold</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleState">
                        Kyc Status
                      </Label>
                      <Input
                        id="exampleState"
                        name={`products[${index}].kycStatus`}
                        type='select'
                        required='true'
                        value={product.kycStatus}
                        onChange={(e) => handleProductChange(index, 'kycStatus', e.target.value)}>

                        <option  value="">
                          --Select--
                        </option>
                        <option selected >Yes</option>
                        {/* <option >No</option> */}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="exampleState">
                        SA Status
                      </Label>
                      <Input
                        id="exampleState"
                        name={`products[${index}].saStatus`}
                        type='select'
                        required='true'
                        value={product.saStatus}
                        onChange={(e) => handleProductChange(index, 'saStatus', e.target.value)}>

                        <option  value="">
                          --Select--
                        </option>
                        <option selected>Yes</option>
                        {/* <option >No</option> */}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
              </Fragment>)
            }
            )}
            <br />
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="examplePassword"> Created By </Label>
                  <Input
                    placeholder=" Enter here"
                    type="text"
                    name="createdBy"
                    required='true'
                    value={adminName}
                    disabled
                  />
                </FormGroup>
              </Col>

            </Row>
            <br />
            <Row>
              <Col md={3}></Col>
              <Col md={2}>
                <button
                  className="btn btn-primary"
                  type="btn"
                  style={{ backgroundColor: '#259D90', border: '1px solid lightgray' }}
                  onClick={handlegoback}
                >
                  Go Back
                </button>
              </Col>
              <Col md={2}>
                <button type="button" className="btn btn-success" onClick={() => handleAdd(clientData.products.length)}>
                  Add Product
                </button>
              </Col>
              <Col md={2}>
                {
                  clientData.products.length !== 0 ?
                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{
                        backgroundColor: "#259D90",
                        border: "1px solid lightgray",
                      }}
                    >
                      Submit
                    </button> : " "
                }
                <p>{message}</p>
              </Col>
              <Col md={3}></Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddClientList;
