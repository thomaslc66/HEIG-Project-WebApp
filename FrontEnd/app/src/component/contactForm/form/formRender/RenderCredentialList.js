import React from 'react';
import renderColumn from './RenderColumn';
import DeleteRow from '../../../row/deleteRow/DeleteRow';
import TableHeader from '../../../tableHeader/TableHeader';
import { Field } from 'redux-form';
import { MDBRow, MDBCol, MDBTable, MDBTableBody, MDBIcon } from 'mdbreact';
import { Button } from '@blueprintjs/core';
import { NEW, PLACEHOLDER } from '../../../../utils/string';

/******************************************************
 *
 * @function notEmpty
 * @param {string} value
 * @abstract validation function
 *
 ******************************************************/
const notEmpty = value => {
  return value ? undefined : 'Must not be empty';
};

/** ****************************************************************
 *
 * @function renderCredentialList
 * @param {*} props all props from the calling <FieldArray> component
 * @abstract Method that render a List of Credentials
 *
 * *****************************************************************/
const renderCredentialList = props => {
  const { fields, renderToaster, color, disabled } = props;

  const {
    CREDENTIALS: { LOGIN, PASSWORD, ACCOUNT }
  } = PLACEHOLDER;

  return (
    <React.Fragment>
      <MDBRow className='password_title'>
        <MDBCol className='text-right'>
          {!disabled && (
            <Button
              type='Button'
              className='link-Button'
              onClick={() => fields.push({})}
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
          headerList={['#', LOGIN, PASSWORD, ACCOUNT]}
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
                  name={`${data}.login`}
                  component={renderColumn}
                  renderToaster={renderToaster}
                  placeholder={LOGIN}
                  disabled={disabled}
                  validate={notEmpty}
                />
                <Field
                  name={`${data}.password`}
                  component={renderColumn}
                  renderToaster={renderToaster}
                  placeholder={PASSWORD}
                  disabled={disabled}
                  validate={notEmpty}
                />
                <Field
                  name={`${data}.account`}
                  component={renderColumn}
                  renderToaster={renderToaster}
                  placeholder={ACCOUNT}
                  disabled={disabled}
                  validate={notEmpty}
                />
              </tr>
            );
          })}
        </MDBTableBody>
      </MDBTable>
    </React.Fragment>
  );
};

export default renderCredentialList;
