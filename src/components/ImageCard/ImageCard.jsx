import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ imageUrl, altText, onClick }) => {
  return (
    <img
      src={imageUrl}
      alt={altText}
      className={styles.image}
      onClick={onClick}
    />
  );
};

export default ImageCard;
