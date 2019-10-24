import React from 'react';
import {
  Position,
  Popover,
  PopoverInteractionKind,
  Intent
} from '@blueprintjs/core';
import { MDBIcon, MDBBtn } from 'mdbreact';
import { Field } from 'redux-form';
import renderProgramSelector from './RenderProgramSelector';

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
    setChange,
    disabled,
    renderToaster
  } = props;
  return (
    <td className='align-vertical'>
      <Popover
        hasBackdrop={true}
        interactionKind={PopoverInteractionKind.CLICK}
        popoverClassName='bp3-popover-content-sizing'
        position={Position.RIGHT_TOP}
        isOpen={value.isProgramSelectorOpen}
      >
        <MDBBtn
          intent={Intent.PRIMARY}
          onClick={() => {
            //we opened the program selector
            setChange(`${name}.isProgramSelectorOpen`, true);
          }}
          size='sm'
          disabled={disabled}
        >
          {(value.productor.name && value.program.name && value.version.name
            ? `${value.productor.name} ${value.program.name} ${
                value.version.name
              } `
            : 'Choix du programme ') || 'Choix du programme '}
          <MDBIcon icon='pencil-alt' className='icon_program' />
        </MDBBtn>
        <div>
          <h5 className='select-comp-title'>Choix du programme</h5>
          <Field
            name={name}
            component={renderProgramSelector} //call to renderProgramSelector
            renderToaster={renderToaster}
            onClose={(productor, program, version) => {
              setChange(`${name}.isProgramSelectorOpen`, false);
              setChange(`${name}.productor`, productor);
              setChange(`${name}.program`, program);
              setChange(`${name}.version`, version);
            }}
            onExit={() => {
              //we closed the program selector
              setChange(`${name}.isProgramSelectorOpen`, false);
            }}
          />
        </div>
      </Popover>
    </td>
  );
};

export default renderProgramPopOver;
