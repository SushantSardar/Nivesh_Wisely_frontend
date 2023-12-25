import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Home from "../Home/Home";
const api_url = process.env.REACT_APP_API_URL;

const AddSupport = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = `${api_url}/addsupport`;

      const data = new FormData(e.currentTarget);
      const payload = {
        product: data.get("product"),
        quantity: data.get("quantity"),
        buySell: data.get("buySell"),
        script: data.get("script"),
        aboveBelowAt: data.get("aboveBelowAt"),
        price: data.get("price"),
        withTarget: data.get("withTarget"),
        withStopLoss: data.get("withStopLoss"),
        description: data.get("description"),
        // image: data.get('image'),
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
        console.log("responseData", responseData);
      }
      console.log("support added successfully!!");
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <Home />
      <div className="form-container">
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            <Col md={3}></Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleSelect">Product</Label>
                <Input id="exampleSelect" name="product" type="select">
                  <option>--Select--</option>
                  <option>Product-1</option>
                  <option>Product-2</option>
                  <option>Product-3</option>
                  <option>Product-4</option>
                  <option>Product-5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="examplePassword">Quantity</Label>
                <Input
                  placeholder=" Enter here"
                  type="number"
                  name="quantity"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleCity">Buy/Sell</Label>
                <Input id="exampleSelect" name="buySell" type="select">
                  <option>--Select--</option>
                  <option>Buy</option>
                  <option>Sell</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleState">Script</Label>
                <Input id="exampleState" name="script" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip">Above/Below/At</Label>
                <Input id="exampleSelect" name="aboveBelowAt" type="select">
                  <option>--Select--</option>
                  <option>Above</option>
                  <option>Below</option>
                  <option>At</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleCity">Price</Label>
                <Input id="exampleSelect" name="price" type="number"></Input>
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleState">With Target</Label>
                <Input id="exampleState" name="withTarget" type="number" />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Label for="exampleZip">With Stop Loss</Label>
                <Input
                  id="exampleSelect"
                  name="withStopLoss"
                  type="number"
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleSelect">Sample</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}></Col>
            <Col md={7}>
              <FormGroup>
                <Label for="exampleSelect">Description</Label>
                <Input
                  id="textArea"
                  name="description"
                  type="textArea"
                  style={{ height: "100px" }}
                ></Input>
              </FormGroup>
            </Col>
          </Row>
          {/* <Row>
          <Col md={3}>
          </Col>
          <Col md={3}>
            <FormGroup>
              <textarea rows={5} cols={135}></textarea>
            </FormGroup>
          </Col>
        </Row> */}
          <Row>
            <Col md={3}></Col>
            <Col md={3}>
              <FormGroup>
                <Label for="exampleFile">Upload Image</Label>
                <Input id="exampleFile" name="image" type="file" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={3}></Col>
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
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddSupport;
