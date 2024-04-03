import React from 'react';
import styles from './ImageCard.module.css';

const ImageCard = ({ imageUrl, altText, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageUrl} alt={altText} className={styles.image} />
    </div>
  );
};

export default ImageCard;
