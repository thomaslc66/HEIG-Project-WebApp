import React from 'react';
import renderColumn from './RenderColumn';
import DeleteRow from '../../../row/deleteRow/DeleteRow';
import TableHeader from '../../../tableHeader/TableHeader';
import { Field } from 'redux-form';
import { MDBRow, MDBCol, MDBTable, MDBTableBody, MDBIcon } from 'mdbreact';
import { Button } from '@blueprintjs/core';
import renderDatePicker from './RenderDatePicker';
import renderProgramPopOver from './RenderProgramPopOver';
import { NEW, PLACEHOLDER } from '../../../../utils/string';

/****************************
 *
 * Intitals values
 *
 * **************************/
const initialLicencesValues = {
  buyDate: '',
  programRef: {
    version: { name: '' },
    program: { name: '' },
    productor: { name: '' },
    isProgramSelectorOpen: false
  },
  key: '',
  computer: ''
};

/******************************************************
 *
 * @function notEmpty
 * @param {string} value
 * @abstract validation function
 *
 ******************************************************/
const notEmpty = value => {
  return value ? undefined : 'Obligatoire';
};

/** ****************************************************************
 *
 * @function renderLicencesList
 * @param {*} props all props from the calling <FieldArray> component
 * @abstract Method that render a List of Licences
 *
 * *****************************************************************/
const renderLicencesList = props => {
  const { fields, renderToaster, color, setChange, disabled } = props;
  const {
    LICENCES: { BUY_DATE, PROGRAM, COMPUTER, KEY }
  } = PLACEHOLDER;

  return (
    <React.Fragment>
      <MDBRow className='password_title'>
        <MDBCol className='text-right'>
          {!disabled && (
            <Button
              type='Button'
              className='link-Button'
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
              {NEW}
            </Button>
          )}
        </MDBCol>
      </MDBRow>
      <MDBTable responsive>
        <TableHeader
          headerList={['#', BUY_DATE, PROGRAM, KEY, COMPUTER]}
          color={`${color}-color`}
        />
        <MDBTableBody>
          {fields.map((data, index) => {
            return (
              <tr key={'key_' + index}>
                <DeleteRow
                  deleteARow={() => fields.remove(index)}
                  index={index}
                  disabled={disabled}
                />
                <Field
                  name={`${data}.buyDate`}
                  component={renderDatePicker}
                  placeholder={BUY_DATE}
                  disabled={disabled}
                  validate={notEmpty}
                />
                <Field
                  name={`${data}.programRef`}
                  component={renderProgramPopOver}
                  renderToaster={renderToaster}
                  setChange={(name, value) => setChange(name, value)}
                  disabled={disabled}
                />
                <Field
                  name={`${data}.key`}
                  component={renderColumn}
                  renderToaster={renderToaster}
                  placeholder={KEY}
                  disabled={disabled}
                  validate={notEmpty}
                />
                <Field
                  name={`${data}.computer`}
                  component={renderColumn}
                  renderToaster={renderToaster}
                  placeholder={COMPUTER}
                  disabled={disabled}
                />
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </React.Fragment>
  );
};

export default renderLicencesList;
