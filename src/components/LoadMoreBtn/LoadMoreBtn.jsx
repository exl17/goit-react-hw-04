import React from 'react';
import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick(e);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
