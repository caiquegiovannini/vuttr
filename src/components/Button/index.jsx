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
  isSubmit: false,
  type: 'default',
  onClick: null,
};

Button.propTypes = {
  isSubmit: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
