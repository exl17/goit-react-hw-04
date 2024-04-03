import React from 'react';
import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    
  },
};

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      className={styles['react-modal-content']}
      overlayClassName={styles['react-modal-overlay']}
    >
      {image && <img src={image.urls.regular} alt={image.alt_description} />}
    </Modal>
  );
};

export default ImageModal;
