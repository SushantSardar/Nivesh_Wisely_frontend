import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const ImgPopUp = ({isOpenImg,toggleImg,onCloseImg,imgData,imgValue}) => {
  
  return (
    <Modal isOpen={isOpenImg} toggle={toggleImg}>
      <ModalHeader> Product Image</ModalHeader>
      <ModalBody>
        <div style={{display:'flex',justifyContent:'center'}}>
          <img src={imgData.uploadFile} alt="" />
        </div>
      </ModalBody>
      <ModalFooter>
        {/* <button className='btn btn-success'  >
          Send
        </button>       */}
        <button className='btn btn-danger' onClick={onCloseImg}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default ImgPopUp;
