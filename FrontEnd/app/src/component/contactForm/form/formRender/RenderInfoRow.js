import React from 'react';
import InfoRow from '../../../row/InfoRow/InfoRow';

/** ****************************************************************
 *
 * @function renderInfoRow
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a InfoRow. InfoRow are used to
 *            display contact information
 *
 * *****************************************************************/
const renderInfoRow = props => {
  const {
    placeholder,
    type,
    input: { onChange, name, value },
    meta: { touched, error },
    renderToaster,
    icon,
    disabled
  } = props;
  return (
    <InfoRow
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      type={type}
      error={touched && error}
      text={value}
      renderToaster={renderToaster}
      icon={icon}
      status={disabled}
    />
  );
};

export default renderInfoRow;
