import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Input = ({
  id, label, type, value, onChange, placeholder, className,
}) => (
  <div className={`input ${className}`}>
    <label
      htmlFor={id}
      className="input__label"
    >
      {label}
    </label>

    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={() => onChange}
      className="input__field"
    />
  </div>
);

Input.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  className: '',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default Input;
