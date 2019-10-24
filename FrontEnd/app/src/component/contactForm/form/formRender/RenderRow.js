import React from 'react';
import Row from '../../../row/Row';

/** ****************************************************************
 *
 * @function renderRow
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a Row. Row are used to
 *            display contact title and don't have a copy functionality
 *
 * *****************************************************************/
const renderRow = props => {
  const {
    placeholder,
    type,
    input: { onChange, name, value },
    meta: { touched, error },
    disabled
  } = props;
  return (
    <Row
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      type={type}
      error={touched && error}
      text={value}
      status={disabled}
    />
  );
};

export default renderRow;
