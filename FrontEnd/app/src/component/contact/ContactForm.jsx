import React, { Component } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { connect } from 'react-redux';
import InfoRow from '../subComponent/InfoRow';
import Row from '../subComponent/Row';
import List from '../subComponent/List';
import { Tabs, Tab, Alert, Intent } from '@blueprintjs/core';
import { selectProgram, validateProgram, handleMoveCancelProgram } from '../../redux/actions/program-actions';
import ProgramSelector from '../subComponent/ProgramSelector';
import {
	MDBIcon,
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBJumbotron,
	Button,
	MDBTableBody,
	MDBTable,
	MDBBtnGroup
} from 'mdbreact';
import { cancelNewContact } from '../../redux/actions/add-delete-contact-actions';
import { axiosPostQuery } from '../query/axiosQuery';

class ContactForm extends Component {
	state = {
		navbarTabId: 'pwd'
	};

	handleTabChange = navbarTabId => this.setState({ navbarTabId });

	handleSubmit = (values, { props = this.props, setSubmitting }) => {
		//process form submission here
		console.log(values);
		axiosPostQuery('add/supplier', values).then(results => {
			console.log('contact added: ', values);
		});
		//done submitting, set submitting to false
		setSubmitting(false);

		return;
	};

	handleDateChange = value => {
		console.log('date: ', value);
	};

	render() {
		const {
			onCancelNewContact,
			renderToaster,
			onSelectProgram,
			programName,
			isProgramValidated,
			isClient,
			isSupplier
		} = this.props;

		return (
			<MDBContainer className="mt-5 text-center">
				<MDBRow>
					<MDBCol>
						<MDBJumbotron className="p-4">
							<div>
								<Formik
									enableReinitialize
									initialValues={{
										name: '',
										note: '',
										phone: '',
										email: '',
										url: '',
										credentials: [
											{
												login: '',
												password: '',
												account: ''
											}
										],
										licences: [
											{
												//buyDate:
												program: programName,
												key: '',
												computer: '',
												isProgramSelectorOpen: false
											}
										]
									}}
									validate={values => {
										const errors = {};

										if (!values.name) {
											errors.name = 'Required';
										}
										if (!values.phone) {
											errors.phone = 'Required';
										}
										if (!values.email) {
											errors.email = 'Required';
										} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
											errors.email = 'Invalid email address';
										}
										return errors;
									}}
									onSubmit={this.handleSubmit}
								>
									{({
										values,
										errors,
										touched,
										handleChange,
										handleBlur,
										handleSubmit,
										isSubmitting,
										arrayHelpers,
										setFieldValue
										/* and other goodies */
									}) => (
										//https://github.com/jaredpalmer/formik/issues/194
										//https://stackoverflow.com/questions/53355069/ant-design-date-and-time-pickers-do-not-pass-value-through-formik-react
										<Form>
											{/* Contact Name and Note */}
											{console.log(values.licences)}
											<MDBRow className="align-items-center horizontal_bar_margin">
												<MDBCol className="col-2">
													<img className="supp_icon" alt="Logo" />
												</MDBCol>
												<MDBCol className="text-left">
													<h3>
														<Row
															placeholder="Contact Name"
															name="name"
															text={values.name}
															onChange={handleChange}
															error={errors.name}
															renderToaster={renderToaster}
														/>
													</h3>
													<div className="lead">
														<MDBIcon icon="comments" className="icon_note" />
														<div className="edit display_info_inline">
															<Row
																placeholder="Special note or information"
																name="note"
																text={values.note}
																error={errors.note}
																onChange={handleChange}
															/>
														</div>
													</div>
												</MDBCol>
											</MDBRow>
											<hr className="my-2" />
											{/* Contact information */}
											<div className="left_info_align">
												<MDBTable responsive className="infoTable">
													<MDBTableBody>
														<InfoRow
															icon="phone"
															placeholder="Telephone number"
															name="phone"
															text={values.phone}
															onChange={handleChange}
															error={errors.phone}
															renderToaster={renderToaster}
														/>
														<InfoRow
															icon="envelope"
															placeholder="Email"
															name="email"
															text={values.email}
															onChange={handleChange}
															error={errors.email}
															renderToaster={renderToaster}
														/>
														<InfoRow
															icon="link"
															placeholder="Website url"
															name="url"
															text={values.url}
															onChange={handleChange}
															error={errors.url}
															renderToaster={renderToaster}
														/>
													</MDBTableBody>
												</MDBTable>
												<Tabs
													id="CredentialsManager"
													onChange={e => this.handleTabChange(e)}
													selectedTabId={this.state.navbarTabId}
												>
													<Tab
														id="pwd"
														title="Password"
														panel={
															<FieldArray
																name="credentials"
																render={arrayHelpers => (
																	<List
																		from={true}
																		list={values.credentials}
																		headerList={[
																			'#',
																			'Login',
																			'Password',
																			'Account'
																		]}
																		keyList={['login', 'password', 'account']}
																		status={false}
																		deleteARow={e => {
																			arrayHelpers.remove(
																				e.target.attributes.index.value
																			);
																		}}
																		onChange={handleChange}
																		renderToaster={renderToaster}
																		addNew={() => {
																			arrayHelpers.insert(
																				values.credentials.length,
																				{
																					login: '',
																					password: '',
																					account: ''
																				}
																			);
																		}}
																		text="Password"
																		indexPath="credentials"
																		color="primary"
																	/>
																)}
															/>
														}
													/>
													{isClient ? (
														<Tab
															id="lcs"
															title="Licences"
															panel={
																<FieldArray
																	name="licences"
																	render={arrayHelpers => (
																		<List
																			displayModal={this.props.displayModal}
																			text="Licences"
																			indexPath="licences"
																			color="danger"
																			from={true}
																			list={values.licences}
																			headerList={[
																				'#',
																				"Date d'achat",
																				'Programme',
																				'Clef',
																				'Ordinateur'
																			]}
																			keyList={[
																				'buyDate',
																				'program',
																				'key',
																				'computer'
																			]}
																			status={false}
																			//selectProgram={onSelectProgram}
																			onChange={handleChange}
																			onChangeDate={(e, name) => {
																				setFieldValue(name, e);
																			}}
																			isProgramValidated={isProgramValidated}
																			handleProgramS
																			renderToaster={renderToaster}
																			deleteARow={e => {
																				arrayHelpers.remove(
																					e.target.attributes.index.value
																				);
																			}}
																			handleInteraction={(
																				programPath,
																				nextOpenState,
																				openStatePath,
																				program
																			) => {
																				console.log('state', nextOpenState);
																				console.log(
																					'program path',
																					programPath
																				);
																				setFieldValue(
																					openStatePath,
																					nextOpenState
																				);
																				setFieldValue(programPath, program);
																				console.log(
																					'licence:',
																					values.licences[0]
																				);
																				console.log(
																					'licence:',
																					values.licences[1]
																				);
																			}}
																			addNew={() => {
																				arrayHelpers.insert(
																					values.licences.length,
																					{
																						program: '',
																						key: '',
																						computer: '',
																						isProgramSelectorOpen: false
																					}
																				);
																			}}
																		/>
																	)}
																/>
															}
														/>
													) : (
														<div />
													)}
												</Tabs>
											</div>
											<MDBBtnGroup>
												<Button
													type="submit"
													disabled={isSubmitting}
													color="primary"
													className="formButton"
												>
													Ajouter
												</Button>
												<Button
													color="warning"
													onClick={onCancelNewContact}
													disabled={isSubmitting}
													className="formButton"
												>
													Annuler
												</Button>
											</MDBBtnGroup>
										</Form>
									)}
								</Formik>
							</div>
						</MDBJumbotron>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

const mapStateToProps = (state, props) => ({
	renderToaster: props.renderToaster,
	//programName: state.program.programNameSelected,
	isProgramValidated: state.program.isProgramValidated,
	isSupplier: state.contactManager.isSupplier,
	isClient: state.contactManager.isClient
});

const mapActionToProps = {
	onCancelNewContact: cancelNewContact,
	//
	onSelectProgram: selectProgram,
	onValidateProgram: validateProgram,
	onHandleMoveCancelProgram: handleMoveCancelProgram
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(ContactForm);
