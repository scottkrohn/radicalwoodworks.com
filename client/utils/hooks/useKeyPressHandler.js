import React, { useEffect } from 'react';
export default (keyCode, onKeyPress) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onKeyPress]);

  const handleKeyPress = (event) => {
    if (event && event.keyCode === keyCode) {
      onKeyPress();
    }
  };
};
