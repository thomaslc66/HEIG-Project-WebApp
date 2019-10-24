import React, { Component } from 'react';
import { MDBIcon } from 'mdbreact';
import AutosizeInput from 'react-input-autosize';
import copy from 'copy-to-clipboard';
import { Intent } from '@blueprintjs/core';

class Column extends Component {
  state = {
    isHovered: false,
  };

  /***********************************************************************
   *
   * Methods that can render a alert when user want to delete a contact
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
      isHovered: !prevState.isHovered,
    }));
  };

  render() {
    const {
      text,
      indexPath,
      status,
      name,
      index,
      maxLength,
      onClick,
      icon,
      placeholder,
    } = this.props;
    console.log(this.props);

    return (
      <td>
        <AutosizeInput
          className="list_input"
          disabled={status}
          onClick={onClick}
          value={text}
          name={name}
          onChange={e => {
            this.props.onChange(e, indexPath);
          }}
          index={index}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        <MDBIcon
          far
          icon="clone"
          className={
            this.state.isHovered ? 'icon_clone_hover' : 'icon_clone text-muted'
          }
          onClick={() => this.copyText(text)}
          onMouseEnter={this.handleHover}
          onMouseLeave={this.handleHover}
        />
      </td>
    );
  }
}

export default Column;
