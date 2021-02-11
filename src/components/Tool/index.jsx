import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './Tool.css';

const Tool = ({ tool }) => {
  const {
    title, link, description, tags,
  } = tool;

  return (
    <div className="tool">
      <header className="tool__header">
        <a href={link}>
          <h4>{title}</h4>
        </a>
        <button type="button" className="tool__header__remove">
          <CloseIcon style={{ width: '1.2rem', height: '1.2rem', marginRight: '0.5rem' }} />
          remove
        </button>
      </header>

      <p className="tool__description">
        {description}
      </p>

      {tags && (
        <div className="tool__tags">
          {tags.map((tag) => (
            <strong key={tag} className="tool__tags__tag">{`#${tag}`}</strong>
          ))}
        </div>
      )}
    </div>
  );
};

Tool.propTypes = {
  tool: PropTypes.shape({
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Tool;
