import React, { Component } from 'react';
import './SideBar.css';
import {
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdown,
  MDBDropdownToggle,
} from 'mdbreact';
import { connect } from 'react-redux';
import {
  queryAllContactName,
  runSearch,
  submenuList,
} from '../../redux/actions/contact-actions';
import { Intent, Tree } from '@blueprintjs/core';

class SideBar extends Component {
  handleClick = e => {
    if (this.props.isNewContactOn) {
      this.props.renderToaster(
        Intent.WARNING,
        "Ajout de contact en cours. Merci d'annuler ou terminer"
      );
    } else if (this.props.isEditingOn) {
      this.props.renderToaster(
        Intent.WARNING,
        'Edition du contact en cours. Merci de terminer'
      );
    } else {
      this.props.onSearchQuery(e.target.firstChild.data);
    }
  };

  componentWillMount() {
    this.props.getAllContactName();
  }

  render() {
    const clientName = this.props.allContactName.map((val, i) => (
      <MDBDropdownItem key={'key' + i} onClick={e => this.handleClick(e)}>
        {val.name}
      </MDBDropdownItem>
    ));

    return (
      <MDBDropdown className="sideBar">
        <MDBDropdownToggle caret color="primary">
          Contacts
        </MDBDropdownToggle>
        <MDBDropdownMenu basic className="force-scroll">
          <MDBDropdownItem divider />
          <p className="client_name_sideBar">{clientName}</p>
        </MDBDropdownMenu>
      </MDBDropdown>
    );
  }
}

/* Redux Management */
const mapStateToProps = state => {
  return {
    allContactName: state.contact.allContactName,
    sideMenu: state.contact.sideMenu,
    isNewContactOn: state.contact.isNewContactOn,
    isEditingOn: state.contact.isEditingOn,
  };
};

const mapDispacthToProps = {
  getAllContactName: queryAllContactName,
  onSearchQuery: runSearch,
  getAllMenu: submenuList,
};

/* Component Export */
export default connect(
  mapStateToProps,
  mapDispacthToProps
)(SideBar);
