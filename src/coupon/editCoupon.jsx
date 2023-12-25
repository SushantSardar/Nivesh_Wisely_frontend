import React, { useEffect, useState } from 'react'
import Home from '../Home/Home'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import "../dataTable.css";
import { useGlobalContext } from '../LoginPage/GlobalContext';
const api_url = process.env.REACT_APP_API_URL;

const EditCoupon = () => {

    const { couponId, setCouponId } = useGlobalContext();

    const [message,setMessage] = useState("")
    const navigate = useNavigate();
    const [couponDetails, setCouponDetails] = useState({});

    const [adminName,setAdminName] = useState(() =>
    sessionStorage.getItem("displayName"));

    const handleGoBack = () => {
      navigate("/coupon")
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCouponDetails((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        // couponName: oneClientData.couponName,
        discount: couponDetails.discount,
        // createdBy: oneClientData.createdBy,
        updatedBy: adminName,
      };

      console.log(payload, JSON.stringify(payload));

      const response = await fetch(
        `${api_url}/editCoupon/${couponId}`,
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
        navigate("/coupon");
      }
    } catch (error) {
      setMessage("Failed to submit Data");
      console.error("Error", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${api_url}/showSingleCoupon/${couponId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
    //   console.log("result",result);
      setCouponDetails(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
                                        disabled
                                        value={couponDetails.couponName} 
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
                                        value={couponDetails.discount} 
                                        onChange={(e) => handleInputChange(e)}
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
                                        disabled 
                                        value={couponDetails.createdBy} 
                                    />
                                </FormGroup>
                            </Col>
                           
                        </Row>
                        <Row>
                        <Col md={4}>
                                <FormGroup>
                                    <Label for="examplePassword"> Updated By </Label>
                                    <Input
                                        placeholder=" Enter here"
                                        type="text"
                                        name="updatedBy"
                                        required='true' 
                                        value={adminName} 
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                       
                        <br />
                        <Row>
                            <Col md={4}></Col>
                            <Col md={2} className="d-flex justify-content-center">
                                <button
                                    className="btn btn-success"
                                    style={{
                                        backgroundColor: "#259D90",
                                        border: "1px solid lightgray",
                                    }}
                                    onClick={handleGoBack}
                                >
                                    Go back
                                </button>
                                <br />
                            </Col>
                            <Col md={2} className="d-flex justify-content-center">
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
                        {message}
                
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditCoupon