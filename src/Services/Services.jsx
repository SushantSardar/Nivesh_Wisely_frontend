import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Home from "../Home/Home";

const api_url = process.env.REACT_APP_API_URL;

const Services = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `${api_url}/sendservices`;
      const data = new FormData(e.currentTarget);
      const payload = {
        productName: data.get("productName"),
        productType: data.get("productType"),
        category: data.get("category"),
        price: data.get("price"),
        duration: data.get("duration"),
        isActive: data.get("isActive"),
        description: data.get("description"),
        shortDescription: data.get("shortDescription"),

        // productImage: data.append('productImage', file),
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
      }
      console.log("Product added successfully!!");
    } catch (error) {
      setMessage("Failed to submit Data");
      console.error("Error", error);
    }
  };

  return (
    <div>
      <Home />
      <div className="form-container">
        <Form encType="multipart/form-data">
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleCity">Service Name</Label>
                <Input id="exampleSelect" name="name" type="text"></Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleZip">Accuracy</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCity">Description</Label>
                <textarea
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="DescriptionInput"
                  name="description"
                  rows={4}
                ></textarea>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <h5>Small Cap</h5>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleCity">Day-7</Label>
                <Input id="exampleSelect" name="name" type="number"></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleState">Day-30</Label>
                <Input
                  // id="exampleState"
                  name="name"
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-90</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-180</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-360</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <h5>Mid Cap</h5>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleCity">Day-7</Label>
                <Input id="exampleSelect" name="name" type="number"></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleState">Day-30</Label>
                <Input
                  // id="exampleState"
                  name="name"
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-90</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-180</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-360</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <h5>Large Cap</h5>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleCity">Day-7</Label>
                <Input id="exampleSelect" name="name" type="number"></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleState">Day-30</Label>
                <Input
                  // id="exampleState"
                  name="name"
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-90</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-180</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-360</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <h5>All In Cap</h5>
            </Col>
          </Row>
          <Row>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleCity">Day-7</Label>
                <Input id="exampleSelect" name="name" type="number"></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleState">Day-30</Label>
                <Input
                  // id="exampleState"
                  name="name"
                  type="number"
                />
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-90</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-180</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
            <Col md={1}>
              <FormGroup>
                <Label for="exampleZip">Day-360</Label>
                <Input
                  // id="exampleSelect"
                  name="mobileNumber"
                  type="number"
                  min={0}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}>
              <button
                className="btn btn-primary"
                type="submit"
                style={{
                  backgroundColor: "#259D90",
                  border: "1px solid lightgray",
                }}
              >
                Submit
              </button>
              <br />
              <br />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Services;
