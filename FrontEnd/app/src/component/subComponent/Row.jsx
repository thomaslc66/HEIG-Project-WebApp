import React, { Component } from 'react';
import AutosizeInput from 'react-input-autosize';

class Row extends Component {
  render() {
    console.log(this.props);
    const {
      placeholder,
      onChange,
      status,
      text,
      name,
      error,
      ...restProps
    } = this.props;
    return (
      <React.Fragment>
        <AutosizeInput
          {...restProps}
          className="list_input"
          placeholder={placeholder}
          disabled={status}
          value={text}
          name={name}
          onChange={onChange}
        />
        <span className="info_error">{error}</span>
      </React.Fragment>
    );
  }
}

export default Row;
