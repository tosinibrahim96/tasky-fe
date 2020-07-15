import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalContainer = ({
  children,
  handleShow,
  handleClose,
  title,
  footer,
  leftButtonLabel,
  leftButtonVariant,
  rightButtonLabel,
  rightButtonVariant,
  handleClick,
}) => {
  return (
    <Modal show={handleShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        {footer === false ? (
          ""
        ) : (
          <>
            <Button onClick={handleClose} variant={leftButtonVariant}>
              {leftButtonLabel}
            </Button>
            <Button onClick={handleClick} variant={rightButtonVariant}>
              {rightButtonLabel}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export { ModalContainer };
