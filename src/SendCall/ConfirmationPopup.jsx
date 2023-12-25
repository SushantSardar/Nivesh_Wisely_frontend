// ConfirmationPopup.js
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';

const ConfirmationPopup = ({ isOpen, toggle, onConfirm, dealTypeValue, scriptTypeValue, positionTypeValue, priceTypeValue, targetTypeValue, stopLossValue }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}><h4>Send Call</h4></ModalHeader>
            <ModalBody>
                <Row>
                    <Col>
                        <h5>{dealTypeValue}&nbsp;
                        {scriptTypeValue}&nbsp;
                        {positionTypeValue}&nbsp;
                        {priceTypeValue}&nbsp;
                        Target  {targetTypeValue}&nbsp;
                        Stop Loss  {stopLossValue}</h5></Col>
                </Row><br />
            </ModalBody>
            <ModalFooter>
                <Button color="success" onClick={() => { onConfirm(); toggle(); }}>
                    Send
                </Button>
                <Button color="danger" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmationPopup;
