import React from 'react';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './AddNewTool.css';

function AddNewTool() {
  function handleAddTool(event) {
    event.preventDefault();
  }

  return (
    <section className="modal-overlay">
      <div className="modal">
        <header className="modal__header">
          <h4>+ Add new tool</h4>
          <button type="button">
            <CloseIcon style={{ width: '1rem', height: '1rem' }} />
          </button>
        </header>

        <form onSubmit={handleAddTool}>
          <label htmlFor="name">Tool Name</label>
          <input type="text" id="name" />

          <button type="submit" className="button">Add tool</button>
        </form>
      </div>
    </section>
  );
}

export default AddNewTool;
