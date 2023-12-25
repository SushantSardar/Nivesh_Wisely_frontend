import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Home from "../Home/Home";
const api_url = process.env.REACT_APP_API_URL;

const AddFaq = () => {
  const [message, setMessage] = useState("");
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
      let url = `${api_url}/askquestion`;
      const data = new FormData(e.currentTarget);
      const payload = {
        question: data.get("question"),
        description: data.get("description"),
        pageFor: data.get("pageFor"),
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
        navigate("/faq");
        console.log("responseData", responseData);
      }
      console.log("Query added successfully!!");
    } catch (error) {
      setMessage("Failed to add data");
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
                  <Input id="exampleSelect" name="question" type="text" required='true'></Input>
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
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleSelect">Page For</Label>
                  <Input id="exampleSelect" name="pageFor" type="select" required='true'>
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
              <Col md={12} className="d-flex justify-content-center">
                <FormGroup>
                  <Button type="submit" className="save_btn">
                    Save{" "}
                  </Button>
                  &nbsp; &nbsp; &nbsp;&nbsp;
                  {/* <Button className=' cancel_btn '>Cancel  </Button> */}
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

export default AddFaq;
