import React, { Component } from 'react';
import './DeleteRow.css';
import { MDBIcon } from 'mdbreact';

class DeleteRow extends Component {
  render() {
    const { disabled, index } = this.props;
    if (disabled) {
      return <td className="align-vertical">{index + 1}</td>;
    } else {
      return (
        <td className="align-vertical">
          <MDBIcon
            index={index}
            icon="trash-alt"
            className="text-danger "
            onClick={() => this.props.deleteARow()}
          />
        </td>
      );
    }
  }
}

export default DeleteRow;
