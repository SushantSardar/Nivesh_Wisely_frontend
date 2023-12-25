import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Home from "../Home/Home";
import { useNavigate } from "react-router-dom";
import { error } from "jquery";

const api_url = process.env.REACT_APP_API_URL;

const AddUser = () => {
  const [message, setMessage] = useState("");
  const [switchState, setSwitchState] = useState(true);

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `${api_url}/adduser`;

      const data = new FormData(e.currentTarget);

      const payload = {
        name: data.get("name"),
        email: data.get("email").toLocaleLowerCase(),
        mobileNumber: data.get("mobileNumber"),
        userName: data.get("userName"),
        password: data.get("password"),
        profile: data.get("profile"),
        active: switchState,
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
        setMessage("Data Submitted Sucessfully");
        console.log("responseData", responseData);
        setMessage("Data Submitted Sucessfully");
        navigate("/users");
        console.log("responseData", responseData);
      }
      console.log("Product added successfully!!");
    } catch (error) {
      setMessage("Failed to submit data");
      console.error("Error", error);
    }
  };

  const [profileData, setProfileData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/getprofiles`);
        if (!response.ok) {
          throw new Error(`http error,${response.status}`);
        }
        const result = await response.json();
        setProfileData(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
                  <Input id="exampleSelect" name="name" type="text" required='true'></Input>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">Email</Label>
                  <Input
                    // id="exampleState"
                    name="email"
                    type="email"
                    required='true'
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
                    required='true'
                    min={0}
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
                    required='true'
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
                    required='true'
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
                    required='true'
                  >
                    <option selected disabled value="">
                      --Select--
                    </option>

                    {profileData.map((item) => (
                      <option key={item._id}>{item.profileName}</option>
                    ))}

                    {/* <option>Resolve</option>
                  <option>Not Resolve</option> */}
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
                    style={{
                      border: "1px solid gray",
                    }}
                    type="switch"
                    required='true'
                    name="active"
                    checked={switchState}
                    onChange={() => {
                      setSwitchState(!switchState);
                    }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={12} className="d-flex justify-content-center">
                <button className="btn btn-success" type="submit">
                  Save
                </button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                {/* <button className='btn btn-danger'>Cancel</button><br /><br /> */}
                {message && <p>{message}</p>}
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
