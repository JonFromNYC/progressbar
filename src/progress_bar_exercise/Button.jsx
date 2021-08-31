import React from 'react';
import './Button.styles.css';

const Button = ({status, onClick, look}) => {
  return (
    <button 
      // className="btn"
      className={look}
      onClick={onClick}
    >
    {status}
    </button>
  )
};

export default Button;