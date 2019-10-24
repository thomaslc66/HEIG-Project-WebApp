import React, { Component } from 'react';
import { MDBIcon } from 'mdbreact';
import AutosizeInput from 'react-input-autosize';

class RowWithIcon extends Component {
  render() {
    const {
      icon,
      color,
      placeholder,
      status,
      text,
      name,
      error,
      className,
    } = this.props;
    return (
      <React.Fragment>
        <MDBIcon
          icon={icon}
          size="lg"
          className={`icon text-${color} ${className}`}
        />
        <AutosizeInput
          className="list_input"
          placeholder={placeholder}
          disabled={status}
          value={text}
          name={name}
          onChange={e => this.props.onChange(e)}
        />
        <span className="info_error">{error}</span>
      </React.Fragment>
    );
  }
}

export default RowWithIcon;
