import React, { Component } from 'react';
import { MDBIcon } from 'mdbreact';
import copy from 'copy-to-clipboard';
import { Intent } from '@blueprintjs/core';
import AutosizeInput from 'react-input-autosize';

class InfoRow extends Component {
	state = {
		isHovered: false
	};

	copyText = value => {
		if (value) {
			copy(value);
			this.props.renderToaster(Intent.SUCCESS, `Copie réussie - plus qu'a coller`);
		} else {
			this.props.renderToaster(Intent.WARNING, `Rien à copier`);
		}
	};

	handleHover = () => {
		this.setState(prevState => ({
			isHovered: !prevState.isHovered
		}));
	};

	render() {
		const { color, icon, placeholder, status, text, name, error } = this.props;
		return (
			<tr className="tr_info_style">
				<td className="td_info_contact">
					<MDBIcon icon={icon} size="lg" className={`icon text-${color}`} />
					<AutosizeInput
						className="list_input"
						placeholder={placeholder}
						disabled={status}
						value={text}
						name={name}
						onChange={e => this.props.onChange(e)}
					/>
					<MDBIcon
						far
						icon="clone"
						className={this.state.isHovered ? 'icon_clone_hover' : 'icon_clone text-muted'}
						onClick={() => this.copyText(this.props.text)}
						onMouseEnter={this.handleHover}
						onMouseLeave={this.handleHover}
					/>
					<span className="info_error">{error}</span>
				</td>
			</tr>
		);
	}
}

export default InfoRow;
