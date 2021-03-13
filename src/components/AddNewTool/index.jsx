import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { addTool } from '../../services/api';

import Modal from '../Modal';
import Input from '../Input';
import Textarea from '../Textarea';
import Button from '../Button';

import './styles.css';

const AddNewTool = ({ setModalIsOpen }) => {
  const [title, setTitle] = useState('');
  const [link, setlink] = useState('');
  const [description, setdescription] = useState('');
  const [tags, setTags] = useState('');

  function clearAllFields() {
    setTitle('');
    setlink('');
    setdescription('');
    setTags('');
  }

  function closeModal() {
    clearAllFields();
    setModalIsOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const tagsArray = tags.length > 0 ? tags.split(' ') : [];
    const toolObject = {
      title,
      link,
      description,
      tags: tagsArray,
    };

    try {
      await addTool(toolObject);
    } catch (error) {
      console.error(error);
    } finally {
      closeModal();
    }
  }

  return (
    <Modal
      title="+ Add new tool"
      hasCLoseButton
      closeModal={closeModal}
    >
      <form className="modal__form" onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Tool name"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Input
          id="link"
          label="Tool link"
          placeholder="https://"
          value={link}
          onChange={(event) => setlink(event.target.value)}
        />
        <Textarea
          id="description"
          label="Tool description"
          value={description}
          onChange={(event) => setdescription(event.target.value)}
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
    </Modal>
  );
};

AddNewTool.propTypes = {
  setModalIsOpen: PropTypes.func.isRequired,
};

export default AddNewTool;
