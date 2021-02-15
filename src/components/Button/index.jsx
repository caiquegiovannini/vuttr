import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Button = ({
  isSubmit, onClick, children, type,
}) => {
  const buttonTypes = {
    default: '',
    add: 'button--add',
    transparent: 'button--transparent',
  };

  return (
    <button
      className={`button ${buttonTypes[type]}`}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  isSubmit: null,
  type: 'default',
};

Button.propTypes = {
  isSubmit: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Button;
