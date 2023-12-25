import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, ModalHeader, Form, ModalBody, ModalFooter, Row, Col, Input, FormGroup, Label } from 'reactstrap';
import { useNavigate } from "react-router-dom"

const api_url = process.env.REACT_APP_API_URL

const ReviewPopup = ({ isOpen, toggle, onClose, newapprovalValue, reviewIdValue }) => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate()

  const HandleStatus = (e) => {
    const value = e.target.value
    setStatus(value)
    console.log(value)
  }
  useEffect(() => {
    console.log(status)
  }, [status])
 
  const handlePopupConfirm = async () => {
    try {
      //  data submission logic here
      const data = new FormData(document.querySelector('#actionForm'));
      let url = `${api_url}/updateReview/${reviewIdValue}`;

      const payload = {
        approvalValue: data.get('approvalValue'),

      };
      console.log(payload)

      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Product added successfully!!');
      if (responseData) {
        console.log('responseData', responseData);
        navigate("/reviews")
        toggle();
      }
      // navigate('/reviews')
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Review Action</ModalHeader>
      <ModalBody>
        <Form id='actionForm'>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="exampleCity">
                  Action
                </Label>
                <Input
                  id="exampleSelect"
                  name="approvalValue"
                  type="select"
                  onChange={HandleStatus}
                >
                  <option selected disabled value="">
                    --Select--
                  </option>
                  <option>
                    Approved
                  </option>
                  <option>
                    Not Approved
                  </option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
        <button className='btn btn-success' onClick={handlePopupConfirm} >
          Submit
        </button>
        <button className='btn btn-danger' onClick={onClose} >
          Close
        </button>
      </ModalFooter>
    </Modal>

  );
};

export default ReviewPopup;
