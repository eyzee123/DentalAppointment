// src/components/shared/Button.js
import React from 'react';
import './Button.css';

const Button = ({ text, icon: Icon, onClick, type = 'button', variant = 'primary' }) => {
  return (
    <button className={`custom-button ${variant}`} type={type} onClick={onClick}>
      {Icon && <Icon className="button-icon" />}
      {text}
    </button>
  );
};

export default Button;
