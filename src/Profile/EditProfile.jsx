import React, { useContext } from "react";
import { useGlobalContext } from "../LoginPage/GlobalContext";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { ClientContext } from "../ClientList/clientContext.jsx/ClientContext"

const api_url = process.env.REACT_APP_API_URL;

const actions = {
  client: "Client",
  product: "Product",
  sendCall: "Send Call",
  liveCall: "Live Call",
  user: "User",
  profile: "Profile",
  review: "Review",
  faq: "FAQ",
  complaint: "Complaint",
  suggestion: "Suggestion",
  complaintTable: "Compaint Table",
  annualComplaintTable: "Annual Complaint Table",
  dashboardComplaintTable: "Dashboard Complaint Table",
  factSheet: "Fact Sheet",
  notification: "Common Notification",
};

const EditProfile = () => {
  const navigate = useNavigate();
  const { profileId, setProfileId } = useGlobalContext();
  const [oneClientData, setOneClientData] = useState({});
  const { profilesData, setProfilesData } = useContext(ClientContext);
  const [message, setMessage] = useState();

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

  const handleGoBack = () => {
    navigate("/profile")
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/getprofiles`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProfilesData(data);

        if (!profileId) {
          console.log("user not found");
          navigate("/profile");
        }

        const foundProfile = data.find((profile) => profile._id === profileId);
        setOneClientData(foundProfile);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [profileId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `${api_url}/updateprofile/${profileId}`;

      const payload = {
        profileName: oneClientData.profileName,
        status: oneClientData.status,
      };

      console.log("payload", payload);
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      if (responseData) {
        setMessage("Data submitted sucessfully");
        setProfilesData((prevProfilesData) => {
          return prevProfilesData.map((profile) =>
            profile._id === profileId ? { ...profile, status: oneClientData.status } : profile
          );
        });
        console.log("responseData", responseData);
      }
      console.log("Clients added successfully!!");
      setProfileId(null);
      navigate("/profile")
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
                    value={oneClientData.profileName}
                    onChange={(e) => setOneClientData({ ...oneClientData, profileName: e.target.value })}
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
                    md={6}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    }}
                  >
                    {["create", "view", "edit"].map((actionType) => (
                      <FormGroup check inline key={actionType}>
                        <Input
                          type="checkbox"
                          name={`${action}${actionType}`}
                          className="custom-checkbox"
                          checked={oneClientData.status?.[action]?.[actionType]}
                          onChange={(e) => setOneClientData({ ...oneClientData, status: { ...oneClientData.status, [action]: { ...oneClientData.status?.[action], [actionType]: e.target.checked, }, }, })}
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
              <Col md={2} className="d-flex justify-content-center">
                <button
                  className="btn btn-success"
                  onClick={handleGoBack}
                >
                  Go back
                </button>
                <br />
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                <button
                  onClick={() => alert("Are you sure to save this Profile?")}
                  className="btn btn-success"
                  type="submit"
                >
                  Save
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

export default EditProfile;
