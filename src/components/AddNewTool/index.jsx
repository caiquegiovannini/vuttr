import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './AddNewTool.css';

const AddNewTool = ({ onClose }) => {
  function handleAddTool(event) {
    event.preventDefault();
  }

  return (
    <section className="modal-overlay">
      <div className="modal">
        <header className="modal__header">
          <h4>+ Add new tool</h4>
          <button type="button" onClick={() => onClose(false)}>
            <CloseIcon style={{ width: '1rem', height: '1rem' }} />
          </button>
        </header>

        <form onSubmit={handleAddTool}>
          <label htmlFor="name">
            Tool Name
            <input type="text" id="name" />
          </label>
          <button type="submit" className="button">Add tool</button>
        </form>
      </div>
    </section>
  );
};

AddNewTool.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddNewTool;
