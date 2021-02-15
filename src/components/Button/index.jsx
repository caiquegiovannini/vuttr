import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Button = ({
  isSubmit, onClick, children, className,
}) => (
  <button
    className={className}
    type={isSubmit ? 'submit' : 'button'}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.defaultProps = {
  isSubmit: null,
};

Button.propTypes = {
  isSubmit: PropTypes.string,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default Button;
