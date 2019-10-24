import React, { Component } from 'react';
import { MDBTableHead } from 'mdbreact';

class TableHeader extends Component {
	render() {
		const { headerList, color } = this.props;
		return (
			<MDBTableHead color={color} textWhite>
				<tr className="font_custom">
					{headerList.map((data, i) => {
						return <th key={'key_' + i}>{data}</th>;
					})}
				</tr>
			</MDBTableHead>
		);
	}
}

export default TableHeader;
