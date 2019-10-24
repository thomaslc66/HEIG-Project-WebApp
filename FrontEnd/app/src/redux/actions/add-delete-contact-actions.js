// src/redux/actions/index.js
import {
	ADD_NEW_CONTACT,
	ADD_NEW_SUPPLIER,
	SET_CONTACT_TO_DELETE,
	HANDLE_MOVE_CANCEL,
	RESET_CONTACT_TO_DELETE,
	CANCEL_NEW_CONTACT
} from '../../utils/action-types';

export function setContactToDelete(contactName, contactId) {
	return {
		type: SET_CONTACT_TO_DELETE,
		payload: {
			id: contactId,
			name: contactName
		}
	};
}

export function handleMoveCancel() {
	return { type: HANDLE_MOVE_CANCEL };
}

export function addNewContact() {
	return { type: ADD_NEW_CONTACT };
}

export function addNewSupplier() {
	return { type: ADD_NEW_SUPPLIER };
}

export function cancelNewContact() {
	return { type: CANCEL_NEW_CONTACT };
}

export function resetContactToDelete() {
	return { type: RESET_CONTACT_TO_DELETE };
}
