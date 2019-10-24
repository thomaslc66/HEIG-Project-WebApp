// src/redux/actions/contact.js
import {
	SET_CONTACT_TO_DELETE,
	ADD_NEW_CONTACT,
	ADD_NEW_SUPPLIER,
	HANDLE_MOVE_CANCEL,
	RESET_CONTACT_TO_DELETE,
	CANCEL_NEW_CONTACT
} from '../../utils/action-types';

// Initial contact state
const initialState = {
	contactNameToDelete: '',
	contactIdToDelete: '',
	canEscapeKeyCancel: true,
	isOpen: false,
	contact: { name: '', credentials: [] },
	isNewContactOn: false,
	isSupplier: false,
	isClient: false
};

/** *******************************************************************
 *
 * @name contactReducer
 * @description reducer from react-redux, that match results depending on
 * a type of action.
 * @return the new (modified or not) state
 ********************************************************************* */
function contactReducer(state = initialState, { type, payload }) {
	switch (type) {
		case SET_CONTACT_TO_DELETE:
			return {
				...state,
				contactNameToDelete: payload.name,
				contactIdToDelete: payload.id,
				isOpen: true
			};
		case RESET_CONTACT_TO_DELETE:
			return {
				...state,
				contactNameToDelete: '',
				contactIdToDelete: '',
				isOpen: false
			};
		case ADD_NEW_CONTACT:
			return {
				...state,
				isNewContactOn: true,
				isClient: true,
				contact: { name: '', credentials: [] }
			};
		case ADD_NEW_SUPPLIER:
			return {
				...state,
				isNewContactOn: true,
				isSupplier: true,
				contact: { name: '', credentials: [] }
			};
		case CANCEL_NEW_CONTACT:
			return {
				...state,
				isNewContactOn: false,
				isClient: false,
				isSupplier: false
			};
		case HANDLE_MOVE_CANCEL:
			return {
				...state,
				isOpen: false
			};
		default:
			return state;
	}
}

export default contactReducer;
