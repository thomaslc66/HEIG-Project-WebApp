import React, { Component } from 'react';
import { MDBIcon } from 'mdbreact';

class DeleteRow extends Component {
	state = {};
	render() {
		const { status, index, indexPath } = this.props;
		if (status) {
			return <td>{index + 1}</td>;
		} else {
			return (
				<td>
					<MDBIcon
						index={index}
						icon="trash-alt"
						className="text-danger"
						onClick={e => this.props.deleteARow(e, indexPath)}
					/>
				</td>
			);
		}
	}
}

export default DeleteRow;
