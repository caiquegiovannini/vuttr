import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Textarea from '../Textarea';
import Button from '../Button';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './styles.css';

const AddNewTool = ({ onClose }) => {
  const [toolName, setToolName] = useState('');
  const [toolLink, setToolLink] = useState('');
  const [toolDescription, setToolDescription] = useState('');
  const [tags, setTags] = useState('');

  function clearAllFields() {
    setToolName('');
    setToolLink('');
    setToolDescription('');
    setTags('');
  }

  function closeModal() {
    clearAllFields();
    onClose(false);
  }

  function handleAddTool(event) {
    event.preventDefault();

    const tagsArray = tags.length > 0 ? tags.split(' ') : [];

    console.log({
      toolName,
      toolLink,
      toolDescription,
      tagsArray,
    });
  }

  return (
    <section className="modal-overlay">
      <div className="modal">
        <header className="modal__header">
          <h4>+ Add new tool</h4>

          <Button
            onClick={closeModal}
            type="transparent"
          >
            <CloseIcon style={{ width: '1rem', height: '1rem' }} />
          </Button>
        </header>

        <form className="modal__form" onSubmit={handleAddTool}>
          <Input
            id="name"
            label="Tool name"
            value={toolName}
            onChange={(event) => setToolName(event.target.value)}
          />
          <Input
            id="link"
            label="Tool link"
            placeholder="https://"
            value={toolLink}
            onChange={(event) => setToolLink(event.target.value)}
          />
          <Textarea
            id="description"
            label="Tool description"
            value={toolDescription}
            onChange={(event) => setToolDescription(event.target.value)}
          />
          <Input
            id="tags"
            label="Tags"
            placeholder="separate tags by space"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
          <div className="modal__form__button">
            <Button
              type="add"
              isSubmit
            >
              Add tool
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

AddNewTool.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddNewTool;
