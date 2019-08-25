import React from 'react';

const SubmitButton = ({ className, children, onClick }) => {
  return (
    <button
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SubmitButton;
