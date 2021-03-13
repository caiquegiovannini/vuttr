import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Button = ({
  isSubmit, isLoading, onClick, children, type,
}) => {
  const buttonTypes = {
    default: '',
    add: 'button--add',
    cancel: 'button--cancel',
    delete: 'button--delete',
    transparent: 'button--transparent',
  };

  return (
    <button
      className={`button ${buttonTypes[type]}`}
      disabled={isLoading}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  isSubmit: false,
  isLoading: false,
  type: 'default',
  onClick: null,
};

Button.propTypes = {
  isSubmit: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
