import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import Modal from '../Modal';

import './styles.css';

const RemoveConfirmation = ({
  title, cancel, remove, isRemoving,
}) => (
  <Modal
    title="X Remove tool"
    closeModal={cancel}
  >
    <p className="remove-text">
      Are you sure you want to remove
      {' '}
      <strong>{title}</strong>
      ?
    </p>

    <div className="remove-button-group">
      <Button
        type="delete"
        onClick={remove}
        isLoading={isRemoving}
      >
        Yes, remove
      </Button>
      <Button
        type="cancel"
        onClick={cancel}
        isLoading={isRemoving}
      >
        Cancel
      </Button>
    </div>
  </Modal>
);

RemoveConfirmation.propTypes = {
  title: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  isRemoving: PropTypes.bool.isRequired,
};

export default RemoveConfirmation;
