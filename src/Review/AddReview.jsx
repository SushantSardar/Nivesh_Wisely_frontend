import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, FormText, Input, Label, Row } from "reactstrap";
import Home from "../Home/Home";
import { useNavigate } from "react-router-dom";
const api_url = process.env.REACT_APP_API_URL;

const AddReview = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `${api_url}/addreview`;
      const data = new FormData(e.currentTarget);

      const payload = {
        customerName: data.get("customerName"),
        rating: data.get("rating"),
        reviewDescription: data.get("reviewDescription"),
        approvalValue: "",
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
        console.log("responseData", responseData);
        setMessage("Data submitted sucessfully");
        navigate("/reviews");
        console.log("responseData", responseData);
      }
      console.log("Review added successfully!!");
    } catch (error) {
      setMessage("Failed to submit Data");
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
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleSelect">Name Of The Customer</Label>
                  <Input
                    id="exampleSelect"
                    name="customerName"
                    type="text"
                    required="true"
                  
                ></Input>
                </FormGroup>
              </Col>
              {/* <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Rating</Label>
                  <Input
                    placeholder=" Enter here"
                    type="number"
                    required="true"
                 
                  min={1}
                    max={5}
                    name="rating"
                  />
                  <FormText
                    color="muted"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    Rating between 1-5
                  </FormText>
                </FormGroup>
              </Col> */}
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleCity">Review Description</Label>
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    name="reviewDescription"
                    // required="true"
              
                  rows={4}
                  ></textarea>
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
                <p>{message}</p>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
