import React from 'react';
import Column from '../../../column/Column';

/** ****************************************************************
 *
 * @function renderColumn
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a Column into a List
 *
 * *****************************************************************/
const renderColumn = props => {
  const {
    renderToaster,
    input: { name, onChange, value },
    meta: { error, touched },
    placeholder,
    disabled
  } = props;
  return (
    <td className='align-vertical'>
      <Column
        onChange={onChange}
        renderToaster={renderToaster}
        text={value}
        maxLength={50}
        name={name}
        placeholder={placeholder}
        status={disabled}
        error={error}
        touched={touched}
      />
    </td>
  );
};

export default renderColumn;
