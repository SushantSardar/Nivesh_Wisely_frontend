import React, { useEffect, useState } from 'react'
import Home from '../Home/Home'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../LoginPage/GlobalContext';
import "../dataTable.css";
const api_url = process.env.REACT_APP_API_URL;

const EditComplaintRow = () => {

    const { complaintRowId, setComplaintRowId } = useGlobalContext();

    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    const [complaintRowDetails, setComplaintRowDetails] = useState({});

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log("name", name, value)
    //     setComplaintRowDetails((prevData) => ({
    //         ...prevData,
    //         [name]: value,
    //     }));
    // };

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

    const [adminName,setAdminName] = useState(() =>
    sessionStorage.getItem("displayName"));

    // useEffect(()=>{
    //     setAdminName(() => sessionStorage.getItem("displayName"));
    // },[])

    const handleGoBack = ()=> {
        navigate("/complaintTable")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
        //   const payload = {
        //     ReceivedFrom: complaintRowDetails.ReceivedFrom,
        //     CarriedFromPrevMonth: complaintRowDetails.CarriedFromPrevMonth,
        //     Received: complaintRowDetails.Received,
        //     Resolved: complaintRowDetails.CarriedFromPrevMonth,
        //     Pending: complaintRowDetails.CarriedFromPrevMonth,
        //     // createdBy: complaintRowDetails.createdBy,
        //     updatedBy: complaintRowDetails.updatedBy,
        //   };
        const data = new FormData(e.currentTarget);
        const payload = {
            ReceivedFrom: data.get("receivedFrom"),
            CarriedFromPrevMonth: data.get("CarriedFFPM"),
            Received: data.get("received"),
            Resolved: data.get("resolved"),
            Pending: data.get("pending"),
            createdBy: complaintRowDetails.createdBy,
            updatedBy: adminName,
        };

          console.log(payload, JSON.stringify(payload));

          const response = await fetch(
            `${api_url}/editComplaintRowById/${complaintRowId}`,
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
            navigate("/complaintTable");
          }
        } catch (error) {
          setMessage("Failed to submit Data");
          console.error("Error", error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(
                `${api_url}/showComplaintRowById/${complaintRowId}`
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            //   console.log("result",result);
            setComplaintRowDetails(result);
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
                                    <Label for="examplePassword">Month & Year</Label>
                                    <Input
                                        placeholder=" Enter here"
                                        type="text"
                                        name="receivedFrom"
                                        required='true'
                                        defaultValue={complaintRowDetails.ReceivedFrom}

                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="examplePassword">Carried Forward From Prev Month</Label>
                                    <Input
                                        placeholder=" Enter here"
                                        type="text"
                                        name="CarriedFFPM"
                                        required='true'
                                        max={100}
                                        defaultValue={complaintRowDetails.CarriedFromPrevMonth}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="examplePassword"> Received </Label>
                                    <Input
                                        placeholder=" Enter here"
                                        type="text"
                                        name="received"
                                        required='true'
                                        defaultValue={complaintRowDetails.Received}
                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="examplePassword">Resolved</Label>
                                    <Input
                                        placeholder=" Enter here"
                                        type="text"
                                        name="resolved"
                                        required='true'
                                        defaultValue={complaintRowDetails.Resolved}

                                    />
                                </FormGroup>
                            </Col>
                            <Col md={4}>
                                <FormGroup>
                                    <Label for="examplePassword">Pending</Label>
                                    <Input
                                        placeholder=" Enter here"
                                        type="text"
                                        name="pending"
                                        required
                                        defaultValue={complaintRowDetails.Pending}

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
                                        Value={complaintRowDetails.createdBy}
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
                                        disabled
                                        value={adminName}
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
                                    Go Back
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
                        <Col md={4}>

                            <p>{message}</p>
                        </Col>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default EditComplaintRow