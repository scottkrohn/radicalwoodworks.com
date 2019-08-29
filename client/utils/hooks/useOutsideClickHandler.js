import React, { useEffect } from 'react';

export default (ref, onOutsideClick) => {
  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [onOutsideClick]);

  const handleClick = (event) => {
    if (ref && ref.current && !ref.current.contains(event.target)) {
      onOutsideClick();
    }
  };
};
