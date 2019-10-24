/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { Alert, Intent, Position, Toaster } from '@blueprintjs/core';
import { connect } from 'react-redux';
import Home from './container/home/Home';
import { axiosPostQuery } from './utils/axiosQuery';
import {
  deleteContactFromResults,
  setContactToDelete,
  resetContactToDelete,
  handleMoveCancel,
} from './redux/actions/contact-actions';
import { contact } from './utils/routes';
import SideMenu from 'react-sidemenu';

class App extends Component {
  state = {
    isProgramSelectorOpen: false,
  };

  /** *********************************************************************
   *
   * Method that can render a toaster from @blueprint/core on any pages.
   *
   *
   * ******************************************************************* */
  renderToaster = (intent, message) => {
    this.toaster.show({
      intent,
      message,
    });
  };

  /** *********************************************************************
   *
   * Methods that can render a alert when user want to delete a contact
   *
   * ********************************************************************** */
  handleMoveConfirm = () => {
    this.deleteContact();
  };

  onProgramConfirm = () => {
    this.setState({ isProgramSelectorOpen: false });
  };

  onProgramOpen = () => {
    this.setState({ isProgramSelectorOpen: true });
  };

  /** *********************************************************************
   * @name deleteContact
   * @description Methods that can render a alert when user
   * want to delete a contact. The method delete the user from the database
   *
   * ********************************************************************** */
  deleteContact = () => {
    const {
      onDeleteContactFromResults,
      onResetContactToDelete,
      contactToDelete,
    } = this.props;

    // Send query to the backend
    axiosPostQuery(contact.delete, { contactID: contactToDelete._id })
      .then(response => {
        if (response.status === 200) {
          this.toaster.show({
            intent: Intent.SUCCESS,
            message: `${contactToDelete.name} a été effacé`,
          });

          onDeleteContactFromResults(contactToDelete);
          onResetContactToDelete();
        }
      })
      .catch(() => {
        this.toaster.show({
          intent: Intent.DANGER,
          message: `${contactToDelete.name} n'a pas pu être effacé`,
        });
        onResetContactToDelete();
      });
  };

  render() {
    const {
      isOpen,
      contactToDelete,
      canEscapeKeyCancel,
      onSetContactToDelete,
      onHandleMoveCancel,
    } = this.props;

    return (
      <div className="App">
        <Home
          renderToaster={this.renderToaster}
          deleteContact={onSetContactToDelete}
        />
        <Toaster
          position={Position.BOTTOM}
          ref={element => {
            this.toaster = element;
          }}
        />
        <Alert
          cancelButtonText="Annuler"
          confirmButtonText="Confirmer"
          icon="trash"
          intent={Intent.DANGER}
          isOpen={isOpen}
          canEscapeKeyCancel={canEscapeKeyCancel}
          onCancel={onHandleMoveCancel}
          onConfirm={this.handleMoveConfirm}>
          <p>
            Êtes-vous sur de vouloir effacer <b>{contactToDelete.name}</b>{' '}
            définitivement ? Cette opération est irréversible !
          </p>
        </Alert>
      </div>
    );
  }
}

/* Redux Management */
const mapStateToProps = state => ({
  contactToDelete: state.contact.contact,
  canEscapeKeyCancel: state.contact.canEscapeKeyCancel,
  canOutsideClickCancel: state.contact.canOutsideClickCancel,
  isOpen: state.contact.isOpen,
});

const mapActionToProps = {
  onSetContactToDelete: setContactToDelete,
  onHandleMoveCancel: handleMoveCancel,
  onResetContactToDelete: resetContactToDelete,
  onDeleteContactFromResults: deleteContactFromResults,
};

/* Component Export */
export default connect(
  mapStateToProps,
  mapActionToProps
)(App);
