import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBJumbotron } from 'mdbreact';
import { Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { initialFormValues } from '../utils/config';
import { axiosPostQuery } from '../utils/axiosQuery';
import { contact } from '../utils/routes';
import {
  cancelNewContact,
  onContactSaved
} from '../redux/actions/contact-actions';
import ReduxContactForm from '../component/contactForm/ContactForm';

class FromContainer extends Component {
  state = { navbarTabId: 'pwd' };

  // Not the best way, but a way...
  // Re-render two times
  shouldComponentUpdate = (nextProps, nextState) => {
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
  mySubmit = values => {
    const { isClient, onContactSaved } = this.props;
    const contactType = {
      ...values,
      licences: values.licences.map(val => {
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
      }),
      type: isClient ? 'Client' : 'Supplier'
    };
    //run post request to save contact
    axiosPostQuery(contact.add, contactType)
      .then(results => {
        if (results) {
          this.props.renderToaster(
            Intent.SUCCESS,
            `Ajout du nouveau contact ${values.name}`
          );
        }

        onContactSaved();
      })
      .catch(error => {
        // Error handler
        if (error) {
          this.props.renderToaster(Intent.DANGER, `${error}`);
        } else {
          this.props.renderToaster(Intent.DANGER, 'Le Server ne répond pas');
        }
      });
  };

  render() {
    const { renderToaster, onCancelNewContact, isClient } = this.props;

    return (
      <MDBContainer className='text-center'>
        <MDBRow>
          <MDBCol>
            <MDBJumbotron className='p-4'>
              <div>
                <ReduxContactForm
                  color={isClient ? 'danger' : 'primary'}
                  disabled={false}
                  formName='contact'
                  initialValues={initialFormValues}
                  isForm={true}
                  navbarTabId={this.handleTabChange}
                  onCancelNewContact={onCancelNewContact}
                  onSubmit={this.mySubmit}
                  renderToaster={renderToaster}
                  selectedTabId={this.state.navbarTabId}
                />
              </div>
            </MDBJumbotron>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

/* Redux Management */
const mapStateToProps = state => ({
  isSupplier: state.contact.isSupplier,
  isClient: state.contact.isClient
});

const mapActionToProps = {
  onCancelNewContact: cancelNewContact,
  onContactSaved: onContactSaved
};

/* Component Export */
export default connect(
  mapStateToProps,
  mapActionToProps
)(FromContainer);
