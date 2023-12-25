import React from "react";
import { useGlobalContext } from "../LoginPage/GlobalContext";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home";

const api_url = process.env.REACT_APP_API_URL;

const EditFaq = () => {
  const { faqId, setFaqId } = useGlobalContext();
  const [message, setMessage] = useState();
  const [oneClientData, setOneClientData] = useState([]);

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/faq");
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
    if (!faqId) {
      console.log("complaint not found");
      navigate("/faq");
    }
  }, []);

  //fetch the particular client based on clientId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/getquestion/${faqId}`);
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
        question: oneClientData.question,
        description: oneClientData.description,
        pageFor: oneClientData.pageFor,
      };

      console.log(payload, JSON.stringify(payload));

      const response = await fetch(`${api_url}/updateFaq/${faqId}`, {
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
        // navigate('/newproductlist')
        setMessage("Data submitted successfully");
        navigate("/faq");
      }
    } catch (error) {
      setMessage("Failed to submit Data");
      console.error("Error", error);
    }
  };

  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api_url}/newProductList`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setProductData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
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
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleCity">Question</Label>
                  <Input
                    id="exampleSelect"
                    name="question"
                    type="text"
                    value={oneClientData.question}
                    onChange={(e) => handleInputChange(e)}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleCity">Description</Label>
                  <textarea
                    class="form-control"
                    name="description"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    rows={4}
                    value={oneClientData.description}
                    onChange={(e) => handleInputChange(e)}
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleSelect">Page For</Label>
                  <Input
                    id="exampleSelect"
                    name="pageFor"
                    type="select"
                    value={oneClientData.pageFor}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option selected disabled value="">
                      --Select--
                    </option>
                    {Array.from(
                      new Set(productData.map((product) => product.productName))
                    ).map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                    <option>
                      More
                    </option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <br />
            <Row className="mt-3">
              <Col md={4}></Col>
              <Col md={2} className="d-flex justify-content-center">
                <FormGroup>
                  <Button className="btn btn-success" onClick={handleGoBack}>
                    Go back
                  </Button>
                  &nbsp; &nbsp; &nbsp;&nbsp;
                </FormGroup>
              </Col>
              <Col md={2} className="d-flex justify-content-center">
                <FormGroup>
                  <Button type="submit" className="btn btn-success">
                    Save{" "}
                  </Button>
                  &nbsp; &nbsp; &nbsp;&nbsp;
                </FormGroup>
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

export default EditFaq;
