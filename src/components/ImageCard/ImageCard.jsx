import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ imageUrl, altText }) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={altText} className={styles.image} />
    </div>
  );
};

export default ImageCard;
