import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as CloseIcon } from '../../assets/icons/close.svg';

import './styles.css';

const ToolCard = ({
  tool, openRemovalConfirmation,
}) => {
  const {
    title, link, description, tags,
  } = tool;

  return (
    <div className="tool">
      <header className="tool__header">
        <a href={link}>
          <h4 className="tool__title">{title}</h4>
        </a>
        <button
          type="button"
          className="tool__header__remove"
          onClick={() => openRemovalConfirmation(tool)}
        >
          <CloseIcon style={{ width: '1.1rem', height: '1.1rem', marginRight: '0.5rem' }} />
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

ToolCard.propTypes = {
  tool: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  openRemovalConfirmation: PropTypes.func.isRequired,
};

export default ToolCard;
