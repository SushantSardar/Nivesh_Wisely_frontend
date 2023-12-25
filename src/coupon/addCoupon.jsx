import React, { useState } from 'react'
import Home from '../Home/Home'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import "../dataTable.css";
const api_url = process.env.REACT_APP_API_URL;

const AddCoupon = () => {

    const [message,setMessage] = useState("")
    const navigate = useNavigate();

    const [adminName,setAdminName] = useState(() =>
    sessionStorage.getItem("displayName"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `${api_url}/addCoupon`;
      const data = new FormData(e.currentTarget);
      const payload = {
        couponName: data.get("couponName"),
        discount: data.get("discount"),
        createdBy: adminName,
        updatedBy: data.get(""),
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
        navigate("/coupon");
        console.log("responseData", responseData);
      }
      console.log("Complaint added successfully!!");
    } catch (error) {
      setMessage("Failed to submit data");
      console.error("Error", error);
    }
  };
    return (
        <div>
            <Home />
            <div className="form-container">
                <div className="form-align">
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
              
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="examplePassword">Coupon Name</Label>
                                    <Input
                                        placeholder=" Enter here"
                                        type="text"
                                        name="couponName"
                                        required='true' 
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="examplePassword">Discount</Label>
                                    <Input
                                        placeholder=" Enter here"
                                        type="number"
                                        name="discount"
                                        required='true' 
                                        max={100}
                                    />
                                </FormGroup>
                            </Col>
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
                            <Col md={12} className="d-flex justify-content-center">
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
                            </Col>
                        </Row>
                            <Col md={4}>

                                    <p>{message}</p>
                            </Col>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default AddCoupon