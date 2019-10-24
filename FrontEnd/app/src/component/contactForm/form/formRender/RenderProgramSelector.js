import React from 'react';
import ProgramSelector from '../../../programSelector/ProgramSelector';

/** ****************************************************************
 *
 * @function renderProgramSelector
 * @param {*} props all props from the calling <Field> component
 * @abstract Method that render a ProgramSelector to select the program
 *
 * *****************************************************************/
const renderProgramSelector = props => {
  const { onClose, onExit, renderToaster } = props;
  return (
    <ProgramSelector
      onClose={onClose}
      onExit={onExit}
      renderToaster={renderToaster}
    />
  );
};

export default renderProgramSelector;
