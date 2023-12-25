import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Home from "../Home/Home";
import { useNavigate } from "react-router-dom";
const api_url = process.env.REACT_APP_API_URL;

const actions = {
  client: "Client",
  product: "Product",
  sendCall: "Send Call",
  liveCall: "Live Call",
  user: "User",
  profile:"Profile",
  review: "Review",
  faq: "FAQ",
  complaint : "Complaint",
  suggestion : "Suggestion",
  complaintTable : "Compaint Table",
  annualComplaintTable : "Annual Complaint Table",
  dashboardComplaintTable : "Dashboard Complaint Table",
  factSheet : "Fact Sheet",
  notification : "Common Notification",
};

const AddProfile = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [statusData, setStatusData] = useState({
    client: {
      create: false,
      view: false,
      edit: false,
    },
    product: {
      create: false,
      view: false,
      edit: false,
    },
    sendCall: {
      create: false,
      view: false,
      edit: false,
    },
    liveCall: {
      create: false,
      view: false,
      edit: false,
    },
    user: {
      create: false,
      view: false,
      edit: false,
    },
    profile: {
      create: false,
      view: false,
      edit: false,
    },
    review: {
      create: false,
      view: false,
      edit: false,
    },
    faq: {
      create: false,
      view: false,
      edit: false,
    },
    complaint: {
      create: false,
      view: false,
      edit: false,
    },
    suggestion: {
      create: false,
      view: false,
      edit: false,
    },
    complaintTable: {
      create: false,
      view: false,
      edit: false,
    },
    annualComplaintTable: {
      create: false,
      view: false,
      edit: false,
    },
    dashboardComplaintTable: {
      create: false,
      view: false,
      edit: false,
    },
    factSheet: {
      create: false,
      view: false,
      edit: false,
    },
    notification: {
      create: false,
      view: false,
      edit: false,
    },
  });

  const handleCancel = () => {
    navigate("/profile");
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
      let url = `${api_url}/addprofile`;

      const data = new FormData(e.currentTarget);

      const statusData = {
        client: {
          create: data.get("clientCreate") === "on",
          view: data.get("clientView") === "on",
          edit: data.get("clientEdit") === "on",
        },
        product: {
          create: data.get("productCreate") === "on",
          view: data.get("productView") === "on",
          edit: data.get("productEdit") === "on",
        },
        sendCall: {
          create: data.get("sendCallCreate") === "on",
          view: data.get("sendCallView") === "on",
          edit: data.get("sendCallEdit") === "on",
        },
        liveCall: {
          create: data.get("liveCallCreate") === "on",
          view: data.get("liveCallView") === "on",
          edit: data.get("liveCallEdit") === "on",
        },
        user: {
          create: data.get("userCreate") === "on",
          view: data.get("userView") === "on",
          edit: data.get("userEdit") === "on",
        },
        profile: {
          create: data.get("profileCreate") === "on",
          view: data.get("profileView") === "on",
          edit: data.get("profileEdit") === "on",
        },
        review: {
          create: data.get("reviewCreate") === "on",
          view: data.get("reviewView") === "on",
          edit: data.get("reviewEdit") === "on",
        },
        faq: {
          create: data.get("faqCreate") === "on",
          view: data.get("faqView") === "on",
          edit: data.get("faqEdit") === "on",
        },     
        complaint: {
          create: data.get("complaintCreate") === "on",
          view: data.get("complaintView") === "on",
          edit: data.get("complaintEdit") === "on",
        },
        suggestion: {
          create: data.get("suggestionCreate") === "on",
          view: data.get("suggestionView") === "on",
          edit: data.get("suggestionEdit") === "on",
        },
        complaintTable: {
          create: data.get("complaintTableCreate") === "on",
          view: data.get("complaintTableView") === "on",
          edit: data.get("complaintTableEdit") === "on",
        },
        annualComplaintTable: {
          create: data.get("annualComplaintTableCreate") === "on",
          view: data.get("annualComplaintTableView") === "on",
          edit: data.get("annualComplaintTableEdit") === "on",
        },
        dashboardComplaintTable: {
          create: data.get("dashboardComplaintTableCreate") === "on",
          view: data.get("dashboardComplaintTableView") === "on",
          edit: data.get("dashboardComplaintTableEdit") === "on",
        },
        factSheet: {
          create: data.get("factSheetCreate") === "on",
          view: data.get("factSheetView") === "on",
          edit: data.get("factSheetEdit") === "on",
        },
        notification: {
          create: data.get("notificationCreate") === "on",
          view: data.get("notificationView") === "on",
          edit: data.get("notificationEdit") === "on",
        },
      };

      const payload = {
        profileName: data.get("profileName"),
        status: statusData,
      };

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
        navigate("/profile");
        console.log("responseData", responseData);
      }
      console.log("Clients added successfully!!");
    } catch (error) {
      setMessage("Unable to add Data");
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
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">Profile Name</Label>
                  <Input
                    id="exampleSelect"
                    name="profileName"
                    type="text"
                    required='true'
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            {/* ___________________________________________________________Mapping over the rows_______________________________________________________ */}
            {Object.keys(statusData).map((action) => (
              <>
                <Label for={`status-${action}`}>{actions[action]}</Label>
                <Row key={action}>
                  <Col
                    md={8}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    }}
                  >
                    {["Create", "View", "Edit"].map((actionType) => (
                      <FormGroup check inline key={actionType}>
                        <Input
                          type="checkbox"
                          name={`${action}${actionType}`}
                        />
                        <Label check>{actionType}</Label>
                      </FormGroup>
                    ))}
                  </Col>
                </Row>
                <br />
              </>
            ))}
            <br />
            <Row>
              <Col md={3} className="d-flex justify-content-center">
                <button
                  className="btn btn-success"
                  type="cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </Col>
              <Col md={3} className="d-flex justify-content-center">
                <button
                  onClick={() => alert("Are you sure to save this Profile?")}
                  className="btn btn-success"
                  type="submit"
                >
                  Save
                </button>
                <br />
                &nbsp; &nbsp; &nbsp; &nbsp;
                {/* <button type='btn' className='cancel_btn'>Cancel</button><br /><br /> */}
                <p>{message}</p>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProfile;
