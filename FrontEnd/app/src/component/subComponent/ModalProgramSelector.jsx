import React, { Component } from 'react';
import { Alert, Intent } from '@blueprintjs/core';
import ProgramSelector from '../subComponent/ProgramSelector';

class ModalProgramSelector extends Component {
	state = {
		program: '',
		productor: '',
		version: ''
	};

	onProductorItemSelect = item => {
		console.log(item);
		this.setState({ program: item });
	};

	render() {
		const { isOpen, cancelText, confirmText, EscapeKeyCancel, onCancel, confirmFunction } = this.props;
		return (
			<Alert
				//{...alertProps}
				cancelButtonText={cancelText}
				confirmButtonText={confirmText}
				icon="trash"
				intent={Intent.DANGER}
				isOpen={isOpen}
				canEscapeKeyCancel={EscapeKeyCancel}
				onCancel={onCancel}
				onConfirm={
					() => confirmFunction(this.state.productor, this.state.program, this.state.version)
					/* () => onValidateProgram(value => console.log('mon program du callBack:', value)) */
				}
			>
				<ProgramSelector onProductorItemSelect={this.onProductorItemSelect} />
			</Alert>
		);
	}
}

export default ModalProgramSelector;
