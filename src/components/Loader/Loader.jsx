import React from 'react';
import {Oval} from 'react-loader-spinner';
import styles from './Loader.module.css';

const LoaderComponent = () => {
  return (
    <div className={styles.loader}>
      <Oval
        type="ThreeDots" 
        color="#00BFFF"
        height={100}
        width={100}
      />
    </div>
  );
};

export default LoaderComponent;
