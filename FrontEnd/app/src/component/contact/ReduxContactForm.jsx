import React, { Component } from "react";
import { Field, FieldArray, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import {
  MDBIcon,
  MDBRow,
  MDBCol,
  Button,
  MDBTable,
  MDBTableBody
} from "mdbreact";
import { Tabs, Tab } from "@blueprintjs/core";
import Row from "../subComponent/Row";
import InfoRow from "../subComponent/InfoRow";
import {
  Classes,
  Position,
  Popover,
  PopoverInteractionKind,
  Intent
} from "@blueprintjs/core";
import TableHeader from "../subComponent/TableHeader";
import DeleteRow from "../subComponent/DeleteRow";
import Column from "../subComponent/Column";
import ProgramSelector from "../subComponent/ProgramSelector";
import { PLACEHOLDER, FILEDS } from "../../utils/string";

/****************************
 *
 * Intitals values
 *
 * **************************/
const initialLicencesValues = {
  buydate: "",
  program: {
    version: { version: "" },
    program: { name: "" },
    productor: { name: "" },
    isProgramSelectorOpen: false
  },
  key: "",
  computer: ""
};

/** ****************************************************************
 *
 * @function renderRow
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a Row. Row are used to
 *            display contact title and don't have a copy functionality
 *
 * *****************************************************************/
const renderRow = props => {
  const {
    placeholder,
    type,
    input: { onChange, name, value },
    meta: { error }
  } = props;
  return (
    <Row
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      type={type}
      error={error}
      text={value}
    />
  );
};

/** ****************************************************************
 *
 * @function renderInfoRow
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a InfoRow. InfoRow are used to
 *            display contact information
 *
 * *****************************************************************/
const renderInfoRow = props => {
  const {
    placeholder,
    type,
    input: { onChange, name, value },
    meta: { error },
    renderToaster,
    icon
  } = props;
  return (
    <InfoRow
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      type={type}
      error={error}
      text={value}
      renderToaster={renderToaster}
      icon={icon}
    />
  );
};

/** ****************************************************************
 *
 * @function renderColumn
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a Column into a List
 *
 * *****************************************************************/
const renderColumn = props => {
  const {
    index,
    renderToaster,
    name,
    input: { onChange, value },
    placeholder,
    ...restProps
  } = props;
  return (
    <Column
      onChange={onChange}
      renderToaster={renderToaster}
      text={value}
      minLength={1}
      maxLength={50}
      name={name}
      placeholder={placeholder}
    />
  );
};

/** ****************************************************************
 *
 * @function renderCredentialList
 * @param {*} props all props from the calling <FieldArray> component
 * @abstract Method that render a List of Credentials
 *
 * *****************************************************************/
const renderCredentialList = props => {
  const {
    fields,
    meta: { error },
    renderToaster,
    color
  } = props;

  const {
    CREDENTIALS: { LOGIN, PASSWORD, ACCOUNT }
  } = PLACEHOLDER;

  return (
    <React.Fragment>
      <MDBRow className='password_title'>
        <MDBCol className='text-right'>
          <button
            type='button'
            className='link-button'
            onClick={() => fields.push({})}
          >
            <MDBIcon
              icon='plus-square'
              size='lg'
              className={`text-${color} add_icon`}
            />
            Nouveau
          </button>
        </MDBCol>
      </MDBRow>
      <MDBTable responsive>
        <TableHeader
          headerList={["#", LOGIN, PASSWORD, ACCOUNT]}
          color={`${color}-color`}
        />
        <MDBTableBody>
          {fields.map((data, index) => {
            return (
              <tr key={"key_" + index}>
                <DeleteRow deleteARow={() => fields.remove(index)} />
                <Field
                  name={`${data}.login`}
                  component={renderColumn}
                  renderToaster={renderToaster}
                  placeholder={LOGIN}
                />
                <Field
                  name={`${data}.password`}
                  component={renderColumn}
                  renderToaster={renderToaster}
                  placeholder={PASSWORD}
                />
                <Field
                  name={`${data}.account`}
                  component={renderColumn}
                  renderToaster={renderToaster}
                  placeholder={ACCOUNT}
                />
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </React.Fragment>
  );
};

/** ****************************************************************
 *
 * @function renderLicencesList
 * @param {*} props all props from the calling <FieldArray> component
 * @abstract Method that render a List of Licences
 *
 * *****************************************************************/
const renderLicencesList = props => {
  const {
    fields,
    meta: { error },
    renderToaster,
    color,
    setChange
  } = props;
  return (
    <React.Fragment>
      <MDBRow className='password_title'>
        <MDBCol className='text-right'>
          <button
            type='button'
            className='link-button'
            onClick={() => {
              /* We push a new row with the initial licences values */
              fields.push(initialLicencesValues);
            }}
          >
            <MDBIcon
              icon='plus-square'
              size='lg'
              className={`text-${color} add_icon`}
            />
            Nouveau
          </button>
        </MDBCol>
      </MDBRow>
      <MDBTable responsive>
        <TableHeader
          headerList={["#", "Date d'achat", "Programme", "Clef", "Ordinateur"]}
          color={`${color}-color`}
        />
        <MDBTableBody>
          {fields.map((data, index) => {
            return (
              <tr key={"key_" + index}>
                <DeleteRow deleteARow={() => fields.remove(index)} />
                <Field
                  name={`${data}.buyDate`}
                  component={renderColumn}
                  renderToaster={() => renderToaster()}
                  placeholder="Date d'achat"
                />
                <Field
                  name={`${data}.program`}
                  component={renderProgramPopOver}
                  renderToaster={() => renderToaster()}
                  setChange={(name, value) => setChange(name, value)}
                />
                <Field
                  name={`${data}.key`}
                  component={renderColumn}
                  renderToaster={() => renderToaster()}
                  placeholder='Clef'
                />
                <Field
                  name={`${data}.computer`}
                  component={renderColumn}
                  renderToaster={() => renderToaster()}
                  placeholder='Ordinateur'
                />
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </React.Fragment>
  );
};

/** ****************************************************************
 *
 * @function renderProgramPopOver
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a PopOver to select the program
 *
 * *****************************************************************/
const renderProgramPopOver = props => {
  const {
    input: { value, name },
    onClick,
    setChange,
    ...restProps
  } = props;
  console.log("inpout", props.input);
  return (
    <Popover
      interactionKind={PopoverInteractionKind.CLICK}
      popoverClassName='bp3-popover-content-sizing'
      position={Position.RIGHT_TOP}
      isOpen={value.isProgramSelectorOpen}
    >
      <Button
        intent={Intent.PRIMARY}
        onClick={() => {
          //we open the program selector
          setChange(`${name}.isProgramSelectorOpen`, true);
        }}
      >
        {(value.productor.name && value.program.name) || "Choix du programme"}
      </Button>
      <div>
        <h5>Choix du programme</h5>
        <Field
          name={name}
          component={renderProgramSelector}
          setChange={setChange}
        />
        <Button
          className='bp3-popover-dismiss'
          onClick={() => {
            //we close the programSelector
            setChange(`${name}.isProgramSelectorOpen`, false);
          }}
        >
          Valider
        </Button>
      </div>
    </Popover>
  );
};

/** ****************************************************************
 *
 * @function renderProgramSelector
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a ProgramSelector to select the program
 *
 * *****************************************************************/
const renderProgramSelector = props => {
  const {
    input: {
      name,
      value: { productor, program, version }
    },
    setChange,
    ...restProps
  } = props;
  console.log("renderProg", props);
  return (
    <ProgramSelector
      onProductorItemSelect={productor =>
        setChange(`${name}.productor`, productor)
      }
      productorName={productor.name || "Séléctionner un producteur..."}
      onProgramItemSelect={program => setChange(`${name}.program`, program)}
      programName={program.name || "Séléctionner un programme..."}
      onVersionItemSelect={version => setChange(`${name}.version`, version)}
      versionName={version.name || "Séléctionner un version..."}
    />
  );
};

/******************************************************************
 *
 * @class ReduxContactForm
 * @classdesc Class that generate a From to display contact
 *
 * ****************************************************************/
class ReduxContactForm extends Component {
  state = { navbarTabId: "pwd" };
  // arrow method to switch between password and licences tab
  handleTabChange = navbarTabId => this.setState({ navbarTabId });

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
    //contact is the name of the form
    this.props.change("contact", name, value);
  };

  //render method of the class
  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      renderToaster,
      color,
      initialValues
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

    return (
      <form onSubmit={handleSubmit}>
        <MDBRow className='align-items-center horizontal_bar_margin'>
          <MDBCol className='col-2'>
            <img className='supp_icon' alt='Logo' />
          </MDBCol>
          <MDBCol className='text-left'>
            <h3>
              <Field
                name={NAME}
                type='text'
                component={renderRow}
                placeholder={CONTACT_NAME}
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
              />
              <Field
                name={EMAIL}
                placeholder={CONTACT_EMAIL}
                type='text'
                component={renderInfoRow}
                renderToaster={renderToaster}
                icon='envelope'
              />
              <Field
                name='url'
                placeholder={CONTACT_WEBSITE}
                type='text'
                component={renderInfoRow}
                renderToaster={renderToaster}
                icon='link'
              />
            </MDBTableBody>
          </MDBTable>
        </div>
        <Tabs
          id='CredentialsManager'
          onChange={e => this.handleTabChange(e)}
          selectedTabId={this.state.navbarTabId}
        >
          {/* Managing password */}

          <Tab
            className='my-table-panel'
            id='pwd'
            title='Password'
            panel={
              <FieldArray
                name='credentials'
                component={renderCredentialList}
                color={color}
                renderToaster={() => renderToaster()}
              />
            }
          />
          {/* Managing licences */}
          <Tab
            className='my-table-panel'
            id='lcs'
            title='Licences'
            panel={
              <FieldArray
                name='licences'
                component={renderLicencesList}
                color={color}
                renderToaster={renderToaster}
                setChange={(name, value) => this.setFormChange(name, value)}
              />
            }
          />
        </Tabs>
        <Button type='submit'>Valider</Button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  change
};

export default reduxForm({
  form: "contact"
})(
  connect(
    null,
    mapDispatchToProps
  )(ReduxContactForm)
);
