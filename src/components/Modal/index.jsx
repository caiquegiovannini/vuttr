import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './styles.css';

const Modal = ({
  title, hasCLoseButton, closeModal, children,
}) => (
  <section className="modal-overlay">
    <div className="modal">
      <header className="modal__header">
        <h4>{title}</h4>

        {hasCLoseButton && (
        <Button
          onClick={closeModal}
          type="transparent"
        >
          <CloseIcon style={{ width: '1rem', height: '1rem' }} />
        </Button>
        )}
      </header>

      {children}
    </div>
  </section>
);

Modal.defaultProps = {
  title: '',
  hasCLoseButton: false,
};

Modal.propTypes = {
  title: PropTypes.string,
  hasCLoseButton: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
