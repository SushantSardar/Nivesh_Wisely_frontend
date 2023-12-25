import React, { useContext, useEffect, useState } from 'react'
import { ClientContext } from "./clientContext.jsx/ClientContext"
import Home from '../Home/Home';
import Moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;

const EditClient = () => {
    const navigate = useNavigate();
    const { clientForEdit, productOptionData, allClientsData, setAllClientsData } = useContext(ClientContext);

    if (!clientForEdit) {
        navigate("/clientlist;")
    }

    const [message, setMessage] = useState('');
    const [editFormData, setEditFormData] = useState(clientForEdit)
    const [addOneProduct, setAddOneProduct] = useState(true);

    const handleDelete = (index) => {
        const newData = editFormData.products.filter((elem, ind) => ind != index)
        setEditFormData({ ...editFormData, products: newData })
        setAddOneProduct(true);
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


    const handleAdd = () => {

        const tempDate = new Date('en-IN', { timeZone: 'Asia/Kolkata' });
        const year = tempDate.getFullYear();
        const month = (tempDate.getMonth() + 1).toString().padStart(2, '0');
        const day = tempDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        const today = formattedDate;

        setEditFormData({
            ...editFormData, products: [
                ...editFormData.products,
                {
                    productName: "",
                    productPrice: "",
                    productDuration: "",
                    fromDate: today,
                    toDate: today,
                    serviceEndDate: today,
                    paidAmount: "",
                    dueAmount: "",
                    serviceStatus: "",
                    kycStatus: "",
                    saStatus: "",
                },
            ],
        });
        setAddOneProduct(false);
    };

    const [adminName, setAdminName] = useState(() =>
        sessionStorage.getItem("displayName"));


    const handleCancel = () => {
        navigate("/clientlist");
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                userName: editFormData.userName,
                email: editFormData.email,
                clientPhoneNumber: editFormData.clientPhoneNumber,
                createdBy: editFormData.createdBy,
                updatedBy: adminName,
                products: editFormData.products.map((product) => ({
                    productName: product.productName,
                    productPrice: product.productPrice,
                    productDuration: product.productDuration,
                    fromDate: Moment(product.fromDate).toISOString(),
                    toDate: Moment(product.toDate).toISOString(),
                    serviceEndDate: Moment(product.serviceEndDate).toISOString(),
                    paidAmount: product.paidAmount,
                    dueAmount: product.dueAmount,
                    serviceStatus: product.serviceStatus,
                    kycStatus: product.kycStatus,
                    saStatus: product.saStatus,
                })),
            };
            console.log('✌️payload --->', payload);
            const response = await fetch(`${api_url}/clients/${editFormData._id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const responseData = await response.json();
            setMessage('Data submitted successfully');
            const newData = allClientsData.map((elem) => editFormData._id == elem._id ? responseData.updatedClient : elem)
            setAllClientsData(newData)
            if (responseData) {
                navigate("/clientlist");
            }

        } catch (error) {
            setMessage('Failed to submit Data');
            console.error('Error', error);
        }
        setAddOneProduct(true);
    };

    const handledate = (fromDate) => {
        const dateSubString = fromDate.substring(0, 10);

        return dateSubString
    }


    return (
        <div>
            <Home />
            {editFormData && <div className="form-container">
                <div className="form-align">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={3}>
                                <h4>Edit General Information</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleCity">User Name</Label>
                                    <Input
                                        name="userName"
                                        type="text"
                                        onChange={(e) => setEditFormData({ ...editFormData, userName: e.target.value })}
                                        defaultValue={editFormData.userName}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleState">Email</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        disabled
                                        // onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                        defaultValue={editFormData.email}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="exampleZip">Mobile Number</Label>
                                    <Input
                                        name="clientPhoneNumber"
                                        type="number"
                                        min={0}
                                        onChange={(e) => setEditFormData({ ...editFormData, clientPhoneNumber: e.target.value })}
                                        defaultValue={editFormData.clientPhoneNumber}

                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md={3}>
                                <h4>Edit Product Information</h4>
                            </Col>
                        </Row>

                        {editFormData.products?.map((product, index) => {
                            return (
                                <div key={index}>
                                    <Row>
                                        <Col md={3}>
                                            <h5>Product Details</h5>
                                        </Col>
                                        <Col md={2}>
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
                                                <Label>Product Name</Label>
                                                <Input
                                                    type={product._id ? "text" : "select"}
                                                    disabled={product._id}
                                                    required
                                                    name={`products[${index}].productName`}
                                                    // defaultValue={product.productName}
                                                    // defaultValue={product._id ? `${product.productName}$ ${product.productDuration} ${handledaysleft(product.toDate, product.fromDate)}` : null}
                                                    defaultValue={product._id ? `${product.productName} $ ${product.productDuration}` : null}
                                                    onChange={(e) =>
                                                        setEditFormData({ ...editFormData, products: editFormData.products.map((elem, ind) => ind == index ? { ...elem, productName: e.target.value, productDuration: +e.target.options[e.target.selectedIndex].dataset.myDataAttribute.split("-")[2], productPrice: +e.target.options[e.target.selectedIndex].dataset.myDataAttribute.split("-")[3] } : elem) })

                                                    }
                                                >
                                                    <option selected required disabled >
                                                        --Select--
                                                    </option>
                                                    {productOptionData?.map((item) => (
                                                        <option key={item.name} className="dropdown_option"
                                                            data-my-data-attribute={item.name + "-" + item.capDuration + "-" + item.capPrice}
                                                            value={item.name}
                                                        >
                                                            {item.name}${item.capDuration}
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
                                                    type="number"
                                                    disabled
                                                    name={`products[${index}].productPrice`}
                                                    min={0}
                                                    value={product.productPrice}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleCity">Paid Amount</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    type="number"
                                                    min={0}
                                                    required
                                                    name={`products[${index}].paidAmount`}
                                                    defaultValue={product.paidAmount}
                                                    onChange={(e) => setEditFormData({ ...editFormData, products: editFormData.products.map((elem) => elem._id == product._id ? { ...elem, paidAmount: e.target.value, dueAmount: product.productPrice - e.target.value } : elem) })}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleState">Due Amount</Label>
                                                <Input
                                                    id="exampleState"
                                                    type="number"
                                                    disabled
                                                    name={`products[${index}].dueAmount`}
                                                    min={0}
                                                    value={product.productPrice - product.paidAmount}
                                                // onChange={(e) => setEditFormData({ ...editFormData, products: editFormData.products.map((elem,ind) => ind == index ? { ...elem, dueAmount: e.target.value } : elem) })}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleCity">From date <span style={{ fontSize: "12px", fontWeight: 600 }}> (DD/MM/YYYY) </span></Label>
                                                <Input
                                                    id="exampleSelect"
                                                    type="date"
                                                    required
                                                    name={`products[${index}].fromDate`}
                                                    defaultValue={handledate(product.fromDate)}
                                                    // value={ handledate(product.fromDate)}
                                                    onChange={(e) => setEditFormData({ ...editFormData, products: editFormData.products.map((elem) => elem._id == product._id ? { ...elem, fromDate: e.target.value } : elem) })}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleState">To date <span style={{ fontSize: "12px", fontWeight: 600 }}> (DD/MM/YYYY) </span></Label>
                                                <Input
                                                    id="exampleState"
                                                    type="date"
                                                    required
                                                    name={`products[${index}].toDate`}
                                                    defaultValue={handledate(product.toDate)}
                                                    // value={handledate(product.toDate)}
                                                    // defaultValue={product.toDate.format("YYYY-MM-DD")}
                                                    onChange={(e) => setEditFormData({ ...editFormData, products: editFormData.products.map((elem) => elem._id == product._id ? { ...elem, toDate: e.target.value } : elem) })}
                                                />
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleState">Service End date <span style={{ fontSize: "12px", fontWeight: 600 }}> (DD/MM/YYYY) </span></Label>
                                                <Input
                                                    id="exampleState"
                                                    type="date"
                                                    name={`products[${index}].toDate`}
                                                    defaultValue={handledate(product.serviceEndDate)}
                                                    // value={handledate(product.serviceEndDate)}
                                                    // defaultValue={product.toDate.format("YYYY-MM-DD")}
                                                    onChange={(e) => setEditFormData({ ...editFormData, products: editFormData.products.map((elem) => elem._id == product._id ? { ...elem, serviceEndDate: e.target.value } : elem) })}
                                                />
                                            </FormGroup>
                                        </Col> */}
                                    </Row>
                                    <Row>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleCity">Service Status</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    type="select"
                                                    required
                                                    name={`products[${index}].serviceStatus`}
                                                    value={product.serviceStatus}
                                                    onChange={(e) => { setEditFormData({ ...editFormData, products: editFormData.products.map((elem) => elem._id == product._id ? { ...elem, serviceStatus: e.target.value } : elem) }) }}
                                                >
                                                    <option selected disabled value="">
                                                        --Select--
                                                    </option>
                                                    <option>Active</option>
                                                    <option>Expired</option>
                                                    <option>Hold</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleState">Kyc Status</Label>
                                                <Input
                                                    id="exampleState"
                                                    type="select"
                                                    required
                                                    name={`products[${index}].kycStatus`}
                                                    defaultValue={product.kycStatus}
                                                    onChange={(e) => setEditFormData({ ...editFormData, products: editFormData.products.map((elem) => elem._id == product._id ? { ...elem, kycStatus: e.target.value } : elem) })}
                                                >
                                                    <option  value="">
                                                       --Select--
                                                    </option>
                                                    <option selected>Yes</option>
                                                    {/* <option>No</option> */}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="exampleState">SA Status</Label>
                                                <Input
                                                    id="exampleState"
                                                    type="select"
                                                    required
                                                    name={`products[${index}].saStatus`}
                                                    defaultValue={product.saStatus}
                                                    onChange={(e) => setEditFormData({ ...editFormData, products: editFormData.products.map((elem) => elem._id == product._id ? { ...elem, saStatus: e.target.value } : elem) })}
                                                >
                                                    <option  value="">
                                                        --Select--
                                                    </option>
                                                    <option selected>Yes</option>
                                                    {/* <option>No</option> */}
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <hr />
                                </div>
                            )
                        })}
                        <br />
                        <Row>
                            <Col md={4}></Col>
                            <Col md={2}>
                                <button
                                    className="btn btn-success"
                                    type="cancel"
                                    style={{
                                        backgroundColor: "#259D90",
                                        border: "1px solid lightgray",
                                    }}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </Col>
                            <Col md={2}>
                                {
                                    addOneProduct ?
                                        <button
                                            className="btn btn-success"
                                            onClick={handleAdd}
                                        >
                                            Add Product
                                        </button> : " "
                                }
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
            </div>}
        </div>
    )
}

export default EditClient;