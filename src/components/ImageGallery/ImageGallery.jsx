import React, { forwardRef } from 'react';
import ImageCard from "../ImageCard/ImageCard";
import styles from './ImageGallery.module.css';

const ImageGallery = forwardRef(({ images, onImageClick }, ref) => {
  const handleClick = (image) => {
    if (onImageClick) {
      onImageClick(image);
    }
  };

  return (
    <ul ref={ref} className={styles.gallery}>
      {images.map((image, index) => (
        <li key={index} className={styles.item}>
          <ImageCard 
            imageUrl={image.urls.small} 
            altText={image.alt_description}
            onClick={() => handleClick(image)} // Добавлен обработчик клика на изображение
          />
        </li>
      ))}
    </ul>
  );
});

ImageGallery.displayName = 'ImageGallery';

export default ImageGallery;
