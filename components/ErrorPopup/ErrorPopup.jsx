import React from 'react';
import styles from './ErrorPopup.module.css';

const ErrorPopup = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ErrorPopup;