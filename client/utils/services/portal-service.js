import React, { useState } from 'react';
import ReactDOM from 'react-dom';

export const getModalRootContainer = function() {
  return IS_CLIENT ? document.getElementById('modal-root') : null;
};

export const createPortal = function(element, container) {
  return IS_CLIENT ? ReactDOM.createPortal(element, container) : null;
};
