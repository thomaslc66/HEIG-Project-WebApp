import React, { Component } from 'react';
import { MDBIcon, MDBContainer, MDBRow, MDBCol, MDBJumbotron } from 'mdbreact';
import { Intent, ButtonGroup, Button, Switch, Tabs, Tab } from '@blueprintjs/core';
import update from 'react-addons-update';
import AutosizeInput from 'react-input-autosize';
import { axiosPostQuery } from '../query/axiosQuery';
import List from '../subComponent/List';
import ContactInfo from '../contact/ContactInfo';

/** ***********************************************************
 * @class Contact
 * @description Contact component, render and contain the logic
 * every contact displayed after a search
 *********************************************************** */
class Contact extends Component {
	initialErrorState = {
		phoneError: '',
		emailError: '',
		urlError: ''
	};

	state = {
		index: this.props.index,
		edited: false,
		disabled: true,
		checked: false,
		contactInfo: this.props.contact,
		errorState: this.initialErrorState,
		isValid: true,
		navbarTabId: 'pwd'
	};

	handleTabChange = navbarTabId => this.setState({ navbarTabId });

	/** ***********************************************************
	 * @name getDerivedStateFromProps(nextProps, prevState)
	 * @description This method is used to have the posibility to
	 * store the state that depend on the props he recieved
	 * @return if the contact id is changed return the new props,
	 * otherwise return null, meaning nothing has changed.
	 *********************************************************** */
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.contact._id !== prevState.contactInfo._id) {
			return { contactInfo: nextProps.contact };
		}
		return null;
	}

	/** ***********************************************************
	 * @name componentDidUpdate(prevProps, prevState)
	 * @description This method is triggered automaticaly after the
	 * getDerivedStatusFromProps method and recieve is return.
	 * IF the previous contact id (in state) is not equal to the
	 * newly recieved props, we need to update because a change happend.
	 *********************************************************** */
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.contact._id !== this.state.contactInfo._id) {
			// The sate id is different than the previState id so we update
			this.setState({ contactInfo: this.props.contact, navbarTabId: 'pwd' });
		}
	}

	/** ***********************************************************
	 * @name ComponentWillUnmount
	 * @description Reset the edit status of the parent.
	 * Called when the component is in edited mode but the user
	 * forget to toggle the component before a new search
	 *********************************************************** */
	componentWillUnmount = () => {
		this.props.resetEditStatus();
	};

	/** *********************************************************************
	 * @name deleteContact
	 * @description Methods that can render a alert when user
	 * want to delete a contact. The method come from the app.js file
	 * to render the alert on top of other component
	 *
	 * ********************************************************************** */
	deleteContact = (contactName, contactId) => {
		this.props.deleteContact(contactName, contactId);
	};

	/** *********************************************************
	 * @name editContactInfo
	 * @description Method that is trigerred when the edit button is
	 * toggled. Activate the edition mode, or save the modifications
	 * made to the contact.
	 *********************************************************** */
	editContactInfo = () => {
		// click on edit button, we check the general edition status
		console.log('errorState: ', this.state.errorState);
		if (this.props.masterEditStatus) {
			if (this.state.checked) {
				// if it's the edited contact we need to save change
				this.saveContact();
			} else {
				// this is not the edited contact so stop
				this.props.renderToaster(Intent.DANGER, "Une autre élément est en cours d'édition");
			}
		} else {
			// activate edition mode on current contact
			this.setState({
				disabled: update(this.state.disabled, { $set: false }),
				checked: update(this.state.checked, { $set: true })
			});
			// change general edition status to true
			this.props.lockEdition();
		}
	};

	/** *********************************************************
	 *
	 * @name saveContact
	 * @description Method that save the modifications made to a contact
	 * if some are made.
	 *
	 *********************************************************** */
	saveContact = () => {
		console.log('errorState: ', this.state.errorState);

		if (this.state.isValid) {
			// does the user edited some value ?
			this.resetErrorState();
			if (this.state.edited) {
				// yes, so we save
				axiosPostQuery('update', { contact: this.state.contactInfo }).then(result => {
					if (result) {
						this.props.renderToaster(Intent.SUCCESS, `Modification réussie`);
					} else {
						this.props.renderToaster(Intent.DANGER, `Modification échouée`);
					}
				});
				this.setState({
					edited: update(this.state.edited, { $set: false })
				});
			} else {
				// no so we do nothing
				this.props.renderToaster(Intent.PRIMARY, `Aucunes modifications effectuées`);
			}
			// in both case we need to
			this.props.lockEdition(); // reset global editing status
			// deactivate edition mode on current contact
			this.setState({
				disabled: update(this.state.disabled, { $set: true }),
				checked: update(this.state.checked, { $set: false })
			});
		}
	};

	/** *********************************************************
	 *
	 * @name handleInfoChange
	 * @description Generic method that handle all changes made
	 * on a contact depending on the modified name of the input
	 *
	 *********************************************************** */
	handleInfoChange = e => {
		e.preventDefault();
		const name = e.target.name;
		// update state with new value
		this.setState(
			{
				contactInfo: update(this.state.contactInfo, {
					[name]: { $set: e.target.value }
				}),
				edited: update(this.state.edited, { $set: true })
			},
			() => {
				if (this.state.contactInfo.email.length <= 5) {
					this.setState({
						errorState: update(this.state.errorState, {
							emailError: { $set: 'Email must be bigger than 5 caracters' }
						}),
						isValid: update(this.state.isValid, { $set: false })
					});
				} else {
					this.setState({
						errorState: update(this.state.errorState, {
							emailError: { $set: '' }
						}),
						isValid: update(this.state.isValid, { $set: true })
					});
				}
			}
		);
	};

	resetErrorState = () => {
		this.setState({
			errorState: update(this.state.errorState, {
				$set: this.initialErrorState
			})
		});
	};

	validate = () => {
		let isValid = true;

		if (this.state.contactInfo.email.length < 5) {
			isValid = false;
			this.setState({
				errorState: update(this.state.errorState, {
					emailError: { $set: 'Email must be bigger than 5 caracters' }
				})
			});
		}

		return isValid;
	};

	/** *********************************************************
	 *
	 * @name handleChange(e)
	 * @param e event passed
	 * @param indexPath index where the changed value need to be updated
	 * @description Generic method that handle all changes made
	 * on a contact credentials or licences list depending on the modified
	 * index and name of the input
	 *
	 *********************************************************** */
	handleChange = (e, indexPath) => {
		console.log('Column HandleChange', e);
		e.preventDefault();
		const { name } = e.target;
		const index = e.target.attributes.index.value;
		// update state of indexPath with new value
		this.setState({
			contactInfo: update(this.state.contactInfo, {
				[indexPath]: {
					[index]: {
						[name]: { $set: e.target.value }
					}
				}
			}),
			edited: update(this.state.edited, { $set: true })
		});
	};

	/** *********************************************************
	 *
	 * @name addNewRow(e, indexPath)
	 * @param e event passed
	 * @param indexPath index where the new row need to be added
	 * @description method that add a new row
	 * 				on a contact credentials or licences
	 *
	 *********************************************************** */
	addNewRow = (e, indexPath) => {
		e.preventDefault();
		const value =
			indexPath === 'licences'
				? {
						program: '',
						key: '',
						computer: ''
				  }
				: {
						login: '',
						password: '',
						account: ''
				  };
		const index = this.state.contactInfo[indexPath].length;
		this.setState({
			contactInfo: update(this.state.contactInfo, {
				[indexPath]: {
					[index]: {
						$set: value
					}
				}
			}),
			edited: update(this.state.edited, { $set: true })
		});
	};

	/** *********************************************************
	 *
	 * @name deleteARow(e)
	 * @param e event passed
	 * @param indexPath index name where the row need to be deleted
	 * @description method that delete a row on a contact credentials
	 * 				or licences
	 *
	 *********************************************************** */
	deleteARow = (e, indexPath) => {
		e.preventDefault();
		// TODO find index and delete
		const index = e.target.attributes.index.value;
		this.setState({
			contactInfo: update(this.state.contactInfo, {
				[indexPath]: {
					$splice: [[index, 1]]
				}
			}),
			edited: update(this.state.edited, { $set: true })
		});
	};

	/** *********************************************************
	 *
	 * @name render
	 * @description rendering method for the component
	 * @returns the complet component
	 *
	 *********************************************************** */
	render() {
		const { color, contactType, deleteContact } = this.props;
		return (
			<MDBContainer className="mt-5 text-center">
				<MDBRow>
					<MDBCol>
						<MDBJumbotron className="p-4">
							<form>
								{/* Contact Name and Note */}
								<MDBRow className="align-items-center horizontal_bar_margin">
									<MDBCol className="col-2">
										<img
											className="supp_icon"
											src={`${window.location.origin}/images/logos/${
												this.state.contactInfo.logo
											}`}
											alt="Logo"
										/>
									</MDBCol>
									<MDBCol className="text-left">
										<h3>
											<AutosizeInput
												placeholder="name"
												value={this.state.contactInfo.name}
												name="name"
												disabled={this.state.disabled}
												onChange={e => this.handleInfoChange(e)}
											/>
										</h3>
										<div className="lead">
											<MDBIcon icon="comments" className="icon_note" />
											<div className="edit display_info_inline">
												<AutosizeInput
													value={this.state.contactInfo.note}
													name="note"
													disabled={this.state.disabled}
													onChange={e => this.handleInfoChange(e)}
												/>
											</div>
										</div>
									</MDBCol>
								</MDBRow>
								<hr className="my-2" />
								{/* Contact information */}
								<div className="left_info_align">
									<ContactInfo
										status={this.state.disabled}
										renderToaster={this.props.renderToaster}
										onChange={this.handleInfoChange}
										value={{
											phone: this.state.contactInfo.phone,
											email: this.state.contactInfo.email,
											url: this.state.contactInfo.url
										}}
										color={color}
										errors={this.state.errorState}
									/>
								</div>
								{/* Managing password */}
								<Tabs
									id="CredentialsManager"
									onChange={e => this.handleTabChange(e)}
									selectedTabId={this.state.navbarTabId}
								>
									<Tab
										className="my-table-panel"
										id="pwd"
										title="Password"
										panel={
											<List
												list={this.state.contactInfo.credentials}
												headerList={['#', 'Login', 'Password', 'Account']}
												keyList={['login', 'password', 'account']}
												status={this.state.disabled}
												deleteARow={this.deleteARow}
												onChange={this.handleChange}
												renderToaster={this.props.renderToaster}
												addNew={this.addNewRow}
												text="Password"
												indexPath="credentials"
												color={color}
											/>
										}
									/>
									{contactType === 'Client' && (
										<Tab
											id="lcs"
											title="Licences"
											panel={
												<List
													list={this.state.contactInfo.licences}
													headerList={[
														'#',
														"Date d'achat",
														'Programme',
														'Clef',
														'Ordinateur'
													]}
													keyList={['buyDate', 'program', 'key', 'computer']}
													status={this.state.disabled}
													deleteARow={this.deleteARow}
													onChange={this.handleChange}
													renderToaster={this.props.renderToaster}
													addNew={this.addNewRow}
													text="Licence"
													indexPath="licences"
													color={color}
												/>
											}
										/>
									)}
								</Tabs>

								<hr className="my-0 p-2" />
								<ButtonGroup className="edition_button" minimal="true">
									<Button
										icon="delete"
										intent="danger"
										onClick={() =>
											deleteContact(this.state.contactInfo.name, this.state.contactInfo._id)
										}
									>
										Delete
									</Button>
									<Switch
										className="switchEdit"
										icon="edit"
										onChange={() => this.editContactInfo()}
										innerLabel="edit"
										checked={this.state.checked}
									>
										Edit
									</Switch>
								</ButtonGroup>
							</form>
						</MDBJumbotron>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

export default Contact;
