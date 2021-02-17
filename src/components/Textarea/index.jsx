import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

const Textarea = ({
  id, label, onChange, className,
}) => (
  <div className={`textarea ${className}`}>
    <label
      htmlFor={id}
      className="textarea__label"
    >
      {label}
    </label>

    <textarea
      id={id}
      onChange={onChange}
      className="textarea__field"
    />
  </div>
);

Textarea.defaultProps = {
  label: '',
  className: '',
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Textarea;
