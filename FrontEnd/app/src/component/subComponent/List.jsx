import React, { Component } from 'react';
import { MDBTableBody, MDBTable, MDBCol, MDBRow, MDBIcon } from 'mdbreact';
import { Classes, Position, Button, Popover, PopoverInteractionKind, Intent } from '@blueprintjs/core';
import Column from './Column';
import DeleteRow from './DeleteRow';
import TableHeader from './TableHeader';
import { DateInput } from '@blueprintjs/datetime';
import ModalProgramSelector from './ModalProgramSelector';
import ProgramSelector from './ProgramSelector';

class List extends Component {
	componentDidMount = () => {
		console.log('list: ', this.props);
	};

	render() {
		const {
			list,
			status,
			color,
			headerList,
			text,
			keyList,
			indexPath,
			from,
			selectProgram,
			changeProductor,
			isProgramValidated
		} = this.props;

		return (
			<React.Fragment>
				<MDBRow className="password_title">
					<MDBCol className="text-right">
						{!status && (
							<button
								type="button"
								className="link-button"
								onClick={e => this.props.addNew(e, indexPath)}
							>
								<MDBIcon icon="plus-square" size="lg" className={`text-${color} add_icon`} />
								Nouveau {text}
							</button>
						)}
					</MDBCol>
				</MDBRow>
				<MDBTable responsive>
					<TableHeader headerList={headerList} color={`${color}-color`} />
					<MDBTableBody>
						{list.map((data, index) => {
							return (
								<tr key={'key_' + index}>
									<DeleteRow
										status={status}
										index={index}
										deleteARow={this.props.deleteARow}
										indexPath={indexPath}
									/>
									{keyList.map((keyValue, i) => {
										const value =
											keyValue === 'buyDate'
												? {
														val: data[`${keyValue}`], //new Date(data[`${keyValue}`]).toLocaleDateString(),
														maxLength: 10
												  }
												: keyValue === 'program'
												? {
														val: `${data[`${keyValue}`].name}`, // ${data[`${keyValue}`].programVersion},
														maxLength: 70
												  }
												: { val: data[`${keyValue}`], maxLength: 70 };
										{
											/* si la keylist provient du formulaire d'ajout, modifier la key list pour être égal à infoPath[index].keyValue exemple: credentials[0].login*/
										}
										const newKeyValue = from ? `${indexPath}[${index}].${keyValue}` : keyValue;
										return keyValue === 'buyDate' ? (
											<DateInput
												name={newKeyValue}
												key={'key_' + i}
												disabled={status}
												formatDate={date => date.toLocaleString()}
												onChange={e => {
													this.props.onChangeDate(e, newKeyValue);
												}}
												parseDate={str => new Date(str)}
												placeholder={'M/D/YYYY'}
												value={value.val}
												popoverProps={{ position: Position.BOTTOM }}
											/>
										) : // TODO need to find a way to get the value back from the alert component
										keyValue === 'program' ? (
											<Popover
												interactionKind={PopoverInteractionKind.CLICK}
												popoverClassName="bp3-popover-content-sizing"
												position={Position.RIGHT_TOP}
												isOpen={data.isProgramSelectorOpen}
												//onInteraction={state => this.handleInteraction(state)}
											>
												<Button
													intent={Intent.PRIMARY}
													onClick={e =>
														this.props.handleInteraction(
															null,
															true,
															`licences[${index}].isProgramSelectorOpen`,
															'program'
														)
													}
												>
													Popover target
												</Button>
												<div>
													<h5>Popover title</h5>
													<ProgramSelector
														onProductorItemSelect={item => console.log('mon item:', item)}
													/>
													<Button
														className="bp3-popover-dismiss"
														onClick={() => {
															this.props.handleInteraction(
																`licences[${index}].program`,
																false,
																`licences[${index}].isProgramSelectorOpen`,
																`program[${index}]`
															);
														}}
													>
														Dismiss
													</Button>
												</div>
											</Popover>
										) : (
											/* 											<Popover
												interactionKind={PopoverInteractionKind.CLICK}
												popoverClassName="bp3-popover-content-sizing"
												position={Position.RIGHT}
											>
												<Button intent={Intent.PRIMARY}>Popover target</Button>
												<div className={Classes.POPOVER_DISMISS}>
													<button>Click me to dismiss</button>
													<button disabled={true}>I will not dismiss</button>
													<div className={Classes.POPOVER_DISMISS_OVERRIDE}>
														<button>I too shall not dismiss</button>
													</div>
												</div>
											</Popover> */
											/* 										<Popover
												interactionKind={PopoverInteractionKind.CLICK}
												popoverClassName="bp3-popover-content-sizing"
												position={Position.RIGHT}
											>
												<Button intent={Intent.PRIMARY}>Popover target</Button>
												<div>
													<h5>Popover title</h5>
													<ProgramSelector />
													<Button className="bp3-popover-dismiss">Dismiss</Button>
												</div>
											</Popover> */
											/* 									<input
												key={'key_' + i}
												icon="trash-alt"
												index={index}
												renderToaster={this.props.renderToaster}
												value={data[`${keyValue}`]}
												minLength={30}
												maxLength={value.maxLength}
												name={newKeyValue}
												status={status}
												indexPath={indexPath}
												onClick={(e, textValue) => {
													this.props.displayModal();
													//this.setState({ isProgramSelectorOpen: true });
													//selectProgram(textValue);
												}}
											/> */
											<Column
												key={'key_' + i}
												index={index}
												renderToaster={this.props.renderToaster}
												text={value.val}
												minLength={30}
												maxLength={value.maxLength}
												name={newKeyValue}
												status={status}
												indexPath={indexPath}
												onChange={this.props.onChange}
											/>
										);
									})}
								</tr>
							);
						})}
					</MDBTableBody>
				</MDBTable>
			</React.Fragment>
		);
	}
}

export default List;
