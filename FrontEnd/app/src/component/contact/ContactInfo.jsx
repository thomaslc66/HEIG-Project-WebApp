import React, { Component } from 'react';
import InfoRow from '../subComponent/InfoRow';
import { MDBTableBody, MDBTable } from 'mdbreact';

class ContactInfo extends Component {
  render() {
    const { status, value, color, errors } = this.props;
    return (
      <MDBTable responsive className="infoTable">
        <MDBTableBody>
          <InfoRow
            color={color}
            icon="phone"
            renderToaster={this.props.renderToaster}
            text={value.phone}
            status={status}
            onChange={this.props.onChange}
            name="phone"
            error={errors.phoneError}
          />
          <InfoRow
            color={color}
            icon="envelope"
            renderToaster={this.props.renderToaster}
            text={value.email}
            status={status}
            onChange={this.props.onChange}
            name="email"
            error={errors.emailError}
          />
          <InfoRow
            color={color}
            icon="link"
            renderToaster={this.props.renderToaster}
            text={value.url}
            status={status}
            onChange={this.props.onChange}
            name="url"
            error={errors.urlError}
          />
        </MDBTableBody>
      </MDBTable>
    );
  }
}

export default ContactInfo;
