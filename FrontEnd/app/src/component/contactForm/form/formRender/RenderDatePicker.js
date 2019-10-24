import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/** ****************************************************************
 *
 * @function renderDatePicker
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a Column into a List
 *
 * *****************************************************************/
const renderDatePicker = props => {
  const {
    input: { onChange, value },
    meta: { error, touched },
    placeholder,
    disabled
  } = props;

  return (
    <td className='align-vertical'>
      <DatePicker
        onChange={onChange}
        selected={value ? new Date(value) : null}
        placeholderText={placeholder}
        disabled={disabled}
        dateFormat='dd/MM/yyyy'
        className={touched && error ? 'list_input_error' : 'input_date_picker'}
      />
    </td>
  );
};

export default renderDatePicker;
