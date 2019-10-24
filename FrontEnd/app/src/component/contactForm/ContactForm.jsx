import React, { Component } from 'react';
import { Field, FieldArray, reduxForm, change, submit } from 'redux-form';
import { connect } from 'react-redux';
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBTable,
  MDBTableBody,
  MDBBtn
} from 'mdbreact';
import { Tabs, Tab, Intent } from '@blueprintjs/core';
import { ButtonGroup, Switch, Button } from '@blueprintjs/core';
import { PLACEHOLDER, FILEDS, BUTTON } from '../../utils/string';
import renderRow from './form/formRender/RenderRow';
import renderInfoRow from './form/formRender/RenderInfoRow';
import renderCredentialList from './form/formRender/RenderCredentialList';
import renderLicencesList from './form/formRender/RenderLicencesList';
import validate from './form/validation/Validation';

/******************************************************************
 *
 * @class ContactForm
 * @classdesc Class that generate a From to display contact
 *
 * ****************************************************************/
class ContactForm extends Component {
  /** ****************************************************************
   *
   * @function setFormChange
   * @param {*} name name of the designed field in the store
   * @param {*} value new value to assign to the filed
   * @abstract This method get the name of the field to change
   *          and the newValue to assign to this field in the store
   *
   * *****************************************************************/
  setFormChange = (name, value) => {
    this.props.change(name, value);
  };

  //render method of the class
  render() {
    const {
      checked,
      client,
      color,
      contact,
      deleteContact,
      disabled,
      editContactInfo,
      handleSubmit,
      isClient,
      isForm,
      navbarTabId,
      onCancelNewContact,
      pristine,
      renderToaster,
      reset,
      selectedTabId,
      submitting
    } = this.props;

    //String import
    const {
      CONTACT_NAME,
      CONTACT_NOTE,
      CONTACT_PHONE,
      CONTACT_EMAIL,
      CONTACT_WEBSITE
    } = PLACEHOLDER;

    const { NAME, NOTE, PHONE, EMAIL, WEBSITE } = FILEDS;
    const { CANCEL, DELETE, EDIT, RESET, VALIDATE } = BUTTON;

    return (
      <form onSubmit={handleSubmit}>
        <MDBRow className='align-items-center horizontal_bar_margin'>
          <MDBCol className='col-2'>
            <img className='supp_icon' alt='Logo' src={contact.logo} />
          </MDBCol>
          <MDBCol className='col-10 text-left'>
            <h3>
              <Field
                name={NAME}
                type='text'
                component={renderRow}
                placeholder={CONTACT_NAME}
                disabled={disabled}
              />
            </h3>
            <div className='lead'>
              <MDBIcon icon='comments' className='icon_note' />
              <div className='edit display_info_inline'>
                <Field
                  name={NOTE}
                  type='text'
                  component={renderRow}
                  placeholder={CONTACT_NOTE}
                  disabled={disabled}
                />
              </div>
            </div>
          </MDBCol>
        </MDBRow>
        <hr className='my-2' />
        <div className='left_info_align'>
          <MDBTable responsive className='infoTable'>
            <MDBTableBody>
              <Field
                name={PHONE}
                placeholder={CONTACT_PHONE}
                type='text'
                component={renderInfoRow}
                renderToaster={renderToaster}
                icon='phone'
                disabled={disabled}
              />
              <Field
                name={EMAIL}
                placeholder={CONTACT_EMAIL}
                type='text'
                component={renderInfoRow}
                renderToaster={renderToaster}
                icon='envelope'
                disabled={disabled}
              />
              <Field
                name={WEBSITE}
                placeholder={CONTACT_WEBSITE}
                type='text'
                component={renderInfoRow}
                renderToaster={renderToaster}
                icon='link'
                disabled={disabled}
              />
            </MDBTableBody>
          </MDBTable>
        </div>
        <Tabs
          id='CredentialsManager'
          onChange={e => navbarTabId(e)}
          selectedTabId={selectedTabId}
          renderActiveTabPanelOnly={true}
        >
          {/* Managing password & isClient == false */}
          <Tab
            className='my-table-panel'
            id='pwd'
            title='Password'
            panel={
              <FieldArray
                name='credentials'
                component={renderCredentialList}
                color={color}
                renderToaster={renderToaster}
                disabled={disabled}
              />
            }
          />
          {/* Managing licences & isClient == true */}
          {isClient || client ? (
            <Tab
              className='my-table-panel'
              id='lcs'
              title='Licences'
              panel={
                <FieldArray
                  name='licences'
                  component={renderLicencesList}
                  color={color}
                  setChange={(name, value) => this.setFormChange(name, value)}
                  renderToaster={renderToaster}
                  disabled={disabled}
                />
              }
            />
          ) : (
            <div />
          )}
        </Tabs>
        <hr className='my-0 p-2' />
        {isForm === true ? (
          <React.Fragment>
            <MDBBtn
              type='submit'
              disabled={pristine || submitting}
              color='primary'
            >
              {VALIDATE}
            </MDBBtn>
            <MDBBtn
              type='button'
              onClick={() => onCancelNewContact()}
              color='warning'
            >
              {CANCEL}
            </MDBBtn>
          </React.Fragment>
        ) : (
          <ButtonGroup className='edition_button' minimal='true'>
            <Button
              icon='delete'
              intent='danger'
              onClick={() => {
                deleteContact(contact);
              }}
            >
              {DELETE}
            </Button>
            <Switch
              className='switchEdit'
              icon='edit'
              onChange={() => {
                if (!checked) {
                  this.props.submit('search');
                  editContactInfo();
                } else {
                  //We check that the form is valid
                  if (this.props.valid) {
                    this.props.submit('search');
                    editContactInfo();
                  } else {
                    renderToaster(
                      Intent.WARNING,
                      'Vérifier le formulaire. Merci'
                    );
                  }
                }
              }}
              innerLabel='edit'
              checked={checked}
            >
              {EDIT}
            </Switch>
          </ButtonGroup>
        )}
        {checked ? (
          <React.Fragment>
            <MDBBtn type='button' onClick={() => reset()} color='warning'>
              {RESET}
            </MDBBtn>
          </React.Fragment>
        ) : null}
      </form>
    );
  }
}

/* Redux Management */
const mapStateToProps = (state, props) => {
  return {
    isClient: state.contact.isClient,
    form: props.formName,
    contact: {
      _id: props.initialValues._id,
      name: props.initialValues.name,
      logo: props.initialValues.logo
    },
    nameList: state.contact.allContactName,
    onSubmit: props.onSubmit
  };
};

const mapDispatchToProps = {
  change,
  submit
};

/* Component Export */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ enableReinitialize: true, validate })(ContactForm));
