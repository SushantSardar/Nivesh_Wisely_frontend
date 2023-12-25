import React, { useContext } from "react";
import { useGlobalContext } from "../LoginPage/GlobalContext";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { ClientContext } from "../ClientList/clientContext.jsx/ClientContext"
const api_url = process.env.REACT_APP_API_URL;

const EditFaq = () => {
  const { userId, setUserId } = useGlobalContext();
  const { profilesData} = useContext(ClientContext);
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
    if (!userId) {
      console.log("user not found");
      navigate("/users");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/getuser/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result, "first");
        setOneClientData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = name === "active" ? !oneClientData.active : value;
    setOneClientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: oneClientData.name,
        email: oneClientData.email.toLowerCase(),
        mobileNumber: oneClientData.mobileNumber,
        userName: oneClientData.userName,
        password: oneClientData.password,
        profile: oneClientData.profile,
        active: oneClientData.active,
      };

      console.log(payload, JSON.stringify(payload));

      const response = await fetch(`${api_url}/updateuser/${userId}`, {
        method: "PUT",
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
        setMessage("Data submitted successfully");
        navigate("/users");
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
            <Row className="mt-5">
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">Name</Label>
                  <Input
                    id="exampleSelect"
                    name="name"
                    type="text"
                    value={oneClientData.name}
                    onChange={(e) => handleInputChange(e)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">Email</Label>
                  <Input
                    // id="exampleState"
                    name="email"
                    type="email"
                    value={oneClientData.email}
                    onChange={(e) => handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleZip">Mobile Number</Label>
                  <Input
                    // id="exampleSelect"
                    name="mobileNumber"
                    type="number"
                    min={0}
                    value={oneClientData.mobileNumber}
                    onChange={(e) => handleInputChange(e)}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleSelect">User Name</Label>
                  <Input
                    // id="exampleSelect"
                    placeholder=" Enter here"
                    name="userName"
                    type="text"
                    value={oneClientData.userName}
                    onChange={(e) => handleInputChange(e)}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input
                    placeholder=" Enter here"
                    type="password"
                    name="password"
                    value={oneClientData.password}
                    onChange={(e) => handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">Profile</Label>
                  <Input
                    // id="exampleSelect"
                    name="profile"
                    type="select"
                    value={oneClientData.profile}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option selected disabled value="">
                      --Select--
                    </option>
                    {profilesData.map((item) => (
                      <option key={item._id}>{item.profileName}</option>
                    ))}
                  </Input>
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
                    // style={{ backgroundColor: '', border: "1px solid gray" }}
                    type="switch"
                    name="active"
                    checked={oneClientData.active}
                    onChange={(e) => handleInputChange(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <br />
            <Row className="mt-4">
              <Col md={4}></Col>
              <Col md={2} className="d-flex justify-content-center">
                <button className="btn btn-success">
                  Go Back
                </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                <button className="btn btn-success" type="submit">
                  Save
                </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                {message && <p>{message}</p>}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditFaq;
