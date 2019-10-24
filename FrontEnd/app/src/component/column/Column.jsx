import React, { Component } from 'react';
import './Column.css';
import { MDBIcon } from 'mdbreact';
import AutosizeInput from 'react-input-autosize';
import copy from 'copy-to-clipboard';
import { Intent } from '@blueprintjs/core';

class Column extends Component {
  state = {
    isHovered: false
  };

  /***********************************************************************
   *
   * @function copyText
   * @abstract methods to copy the text
   *
   * ********************************************************************** */
  copyText = value => {
    if (value) {
      copy(value);
      this.props.renderToaster(
        Intent.SUCCESS,
        `Copie réussie - plus qu'a coller`
      );
    } else {
      this.props.renderToaster(Intent.WARNING, `Rien à copier`);
    }
  };

  handleHover = () => {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered
    }));
  };

  /************************************************
   * @function render
   * @abstract main method to render the component
   ************************************************/
  render() {
    const {
      text,
      onChange,
      maxLength,
      status,
      name,
      onClick,
      placeholder,
      error,
      touched
    } = this.props;
    //***/
    return (
      <React.Fragment>
        <AutosizeInput
          className={touched && error ? 'list_input_error' : 'list_input'}
          disabled={status}
          onClick={onClick}
          value={text}
          name={name}
          onChange={onChange}
          placeholderIsMinWidth
          maxLength={maxLength || 30}
          type='text'
          placeholder={placeholder}
        />
        {(touched &&
          (error && (
            <MDBIcon far icon='times-circle' className={`icon text-danger`} />
          ))) || (
          <MDBIcon
            far
            icon='clone'
            className={
              this.state.isHovered
                ? 'icon_clone_hover'
                : 'icon_clone text-muted'
            }
            onClick={() => this.copyText(text)}
            onMouseEnter={this.handleHover}
            onMouseLeave={this.handleHover}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Column;
