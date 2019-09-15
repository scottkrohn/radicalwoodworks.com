import React, { useRef, useState } from 'react';
import { getModalRootContainer, createPortal } from '../../utils/services/portal-service';

import styles from './modal.scss';
import useStyles from 'isomorphic-style-loader/useStyles';
import useOutsideClickHandler from '../../utils/hooks/useOutsideClickHandler';

const Modal = ({ children }) => {
  useStyles(styles);
  const [showing, setShowing] = useState(false);

  const hide = () => {
    showing && setShowing(false);
  };

  const show = () => {
    !showing && setShowing(true);
  };

  const contentRef = useRef(null);
  useOutsideClickHandler(contentRef, hide);

  const modifiedChildren = React.Children.map(children, (child) => {
    if (child.type === ModalTrigger) {
      const triggerActions = { hide, show };
      return React.cloneElement(child, { triggerActions });
    } else if (child.type === ModalContent) {
      const contentActions = { hide };
      return React.cloneElement(child, { contentActions });
    }
  });

  const Trigger = () => {
    return modifiedChildren.find((child) => {
      return child.type === ModalTrigger;
    });
  };

  const Content = () => {
    return modifiedChildren.find((child) => {
      return child.type === ModalContent;
    });
  };

  return (
    <div>
      <Trigger className={styles.ModalTrigger} />
      {showing &&
        createPortal(
          <div className={styles.ModalOverlay}>
            <div
              ref={contentRef}
              className={styles.ModalContent}
            >
              <Content />
            </div>
          </div>,
          getModalRootContainer()
        )}
    </div>
  );
};

export const ModalTrigger = ({ children, triggerActions }) => {
  return typeof children === 'function' ? children(triggerActions) : children;
};

export const ModalContent = ({ children, contentActions }) => {
  return typeof children === 'function' ? children(contentActions) : children;
};

export default Modal;
