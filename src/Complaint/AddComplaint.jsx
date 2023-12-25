import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Home from "../Home/Home";
import { useNavigate } from "react-router-dom";

const api_url = process.env.REACT_APP_API_URL;

const AddComplaint = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlegoback = () => {
    navigate("/complaint");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `${api_url}/addcomplaint`;
      const data = new FormData(e.currentTarget);
      const payload = {
        clientName: data.get("clientName"),
        status: data.get("status"),
        complaintDescription: data.get("complaintDescription"),
        solution: data.get("solution"),
        solvedBy: data.get("solvedBy"),
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
        navigate("/complaint");
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
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Client Name</Label>
                  <Input
                    placeholder=" Enter here"
                    type="text"
                    name="clientName"
                    required='true'
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">Status</Label>
                  <Input id="exampleSelect" name="status"
                    type="select"
                    required='true'
                  >
                    <option selected disabled value="">
                      --Select--
                    </option>
                    <option>Open</option>
                    <option>In Process</option>
                    <option>Resolve</option>
                    <option>Not Resolve</option>
                    <option>Rejected</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row></Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>Description</Label>
                  <textarea
                    class="form-control"
                    placeholder="Leave a comment here"
                    rows={4}
                    name="complaintDescription"
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>Solution</Label>
                  <textarea
                    class="form-control"
                    placeholder="Leave a solution here"
                    rows={4}
                    name="solution"
                    required='true'
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleState">Solved By</Label>
                  <Input id="exampleState" name="solvedBy"
                    type="text"
                    required='true'
                  />
                </FormGroup>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={4}></Col>
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
                <p>{message}</p>
              </Col>
              <Col md={4}></Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddComplaint;
