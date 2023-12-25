import React from "react";
import { useGlobalContext } from "../LoginPage/GlobalContext";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";

const api_url = process.env.REACT_APP_API_URL;

const EditComplaint = () => {
  const { complaintId, setcomplaintId } = useGlobalContext();
  const [message, setMessage] = useState();
  const [oneClientData, setOneClientData] = useState([]);

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

  useEffect(() => {
    if (!complaintId) {
      console.log("complaint not found");
      navigate("/complaint");
    }
  }, []);

  const handlegoback = () => {
    navigate("/complaint");
  }

  //fetch the particular client based on clientId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${api_url}/showcomplaints/${complaintId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        setOneClientData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //PUT request for clients
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOneClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        clientName: oneClientData.clientName,
        status: oneClientData.status,
        complaintDescription: oneClientData.complaintDescription,
        solution: oneClientData.solution,
        solvedBy: oneClientData.solvedBy,
      };

      console.log(payload, JSON.stringify(payload));

      const response = await fetch(
        `${api_url}/updatecomplaint/${complaintId}`,
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
        navigate("/complaint");
      }
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
                  <Label for="examplePassword">Client Name</Label>
                  <Input
                    placeholder=" Enter here"
                    type="text"
                    name="clientName"
                    value={oneClientData.clientName}
                    onChange={(e) => handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">Status</Label>
                  <Input
                    id="exampleSelect"
                    name="status"
                    type="select"
                    value={oneClientData.status}
                    onChange={(e) => handleInputChange(e)}
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
                    value={oneClientData.complaintDescription}
                    onChange={(e) => handleInputChange(e)}
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
                    value={oneClientData.solution}
                    onChange={(e) => handleInputChange(e)}
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleState">Solved By</Label>
                  <Input
                    id="exampleState"
                    name="solvedBy"
                    type="text"
                    value={oneClientData.solvedBy}
                    onChange={(e) => handleInputChange(e)}
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

export default EditComplaint;
