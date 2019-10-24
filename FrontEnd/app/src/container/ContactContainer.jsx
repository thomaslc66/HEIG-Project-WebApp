import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBJumbotron } from 'mdbreact';
import { connect } from 'react-redux';
import { Intent } from '@blueprintjs/core';
import { axiosPostQuery } from '../utils/axiosQuery';
import { contact } from '../utils/routes';
import {
  cancelNewContact,
  onContactEdited,
  setEdition
} from '../redux/actions/contact-actions';
import ReduxContactForm from '../component/contactForm/ContactForm';

class ContactContainer extends Component {
  state = { navbarTabId: 'pwd', disableState: true };

  // Not the best way, but a way...
  // Re-render two times
  shouldComponentUpdate = (nextProps, nextState) => {
    //reset the navbar the default one
    if (this.state.navbarTabId === 'lcs') {
      this.setState({
        navbarTabId: 'pwd'
      });
    }
    return true;
  };

  handleTabChange = tabId => {
    this.setState({
      navbarTabId: tabId
    });
  };

  /** ************************************************************
   * @function mySubmit
   * @param {*} values values recieved from the form
   * @description submit handle to ad a new contact or supplier
   *
   ************************************************************** */
  submit = values => {
    const { onContactEdited } = this.props;

    if (this.state.disableState) {
      const licences =
        values._type !== 'Supplier'
          ? values.licences.map(val => {
              return {
                buyDate: val.buyDate,
                computer: val.computer,
                key: val.key,
                programRef: {
                  program: val.programRef.program._id,
                  version: val.programRef.version._id,
                  productor: val.programRef.productor._id
                }
              };
            })
          : [];
      const contactType = {
        ...values,
        licences: licences
      };

      //run post request to save contact
      axiosPostQuery(contact.update, contactType)
        .then(results => {
          if (results) {
            this.props.renderToaster(
              Intent.SUCCESS,
              `Modification du nouveau contact ${values.name}`
            );
          }

          onContactEdited();
        })
        .catch(error => {
          // Error handler
          if (error) {
            this.props.renderToaster(Intent.DANGER, `${error.message}`);
          } else {
            this.props.renderToaster(Intent.DANGER, 'Le Server ne répond pas');
          }
        });
    }
  };

  editContactInfo = () => {
    this.setState(prevState => ({
      disableState: !prevState.disableState
    }));
    this.props.setEdition();
  };

  render() {
    const {
      renderToaster,
      deleteContact,
      onCancelNewContact,
      contacts,
      formName
    } = this.props;

    const constructedList = contacts.map((contact, index) => {
      return (
        <MDBContainer className='text-center' key={`key_${index}`}>
          <MDBRow>
            <MDBCol>
              <MDBJumbotron className='p-4'>
                <div>
                  <ReduxContactForm
                    client={contact._type === 'Client' ? true : false}
                    color={contact._type === 'Client' ? 'danger' : 'primary'}
                    checked={!this.state.disableState}
                    deleteContact={deleteContact}
                    disabled={this.state.disableState}
                    editContactInfo={this.editContactInfo}
                    formName={formName}
                    initialValues={contact}
                    isFrom={false}
                    navbarTabId={this.handleTabChange}
                    onCancelNewContact={onCancelNewContact}
                    onSubmit={this.submit}
                    renderToaster={renderToaster}
                    selectedTabId={this.state.navbarTabId}
                  />
                </div>
              </MDBJumbotron>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      );
    });

    return (
      <div>
        <div>{constructedList}</div>
      </div>
    );
  }
}

/* Redux Management */
const mapStateToProps = state => ({
  contacts: state.contact.results,
  isClient: state.contact.isClient
});

const mapActionToProps = {
  onCancelNewContact: cancelNewContact,
  onContactEdited: onContactEdited,
  setEdition: setEdition
};

/* Component Export */
export default connect(
  mapStateToProps,
  mapActionToProps
)(ContactContainer);
