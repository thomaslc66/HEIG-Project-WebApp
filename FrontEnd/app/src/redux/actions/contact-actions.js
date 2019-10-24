// src/redux/actions/index.js
import {
  ADD_NEW_CONTACT,
  ADD_NEW_SUPPLIER,
  CANCEL_NEW_CONTACT,
  CLEAR_SUGGESTIONS,
  CONTACT_SAVED,
  DELETE_CONTACT_FROM_RESULTS,
  EDIT_CONTACT,
  ERASE_SEARCH_VALUE,
  GET_ALL_CONTACT_NAME,
  GET_SIDE_MENU,
  HANDLE_MOVE_CANCEL,
  LOAD_SUGGESTIONS_BEGIN,
  MAYBE_UPDATE_SUGGESTIONS,
  RESET_CONTACT_TO_DELETE,
  SEARCH_CONTACT,
  SET_CONTACT_TO_DELETE,
  UPDATE_INPUT_VALUE,
} from '../../utils/action-types';
import { axiosGetQuery, axiosSearchQuery } from '../../utils/axiosQuery';
import { contact } from '../../utils/routes';

// ACTION DISPATCHER

export function onSuggestionsFetchRequested({ value }) {
  return dispatch => {
    dispatch(loadSuggestionsBegin());
    dispatch(maybeUpdateSuggestions(value));
  };
}

export function onSuggestionsClearRequested() {
  return dispatch => {
    dispatch(clearSuggestions());
  };
}

export function onChange(event, { newValue }) {
  return dispatch => {
    dispatch(updateInputValue(newValue));
  };
}

/** **
 * Redux query to get all contact Name from the DataBase
 * */
export function queryAllContactName() {
  return dispatch => {
    axiosGetQuery(contact.getAll).then(response => {
      dispatch(allSupplierName(response.data));
      dispatch(submenuList(response.data));
    });
  };
}

/**
 *
 * @param {searchValue} searchValue represent the name of the contact
 */
export function runSearch(searchValue) {
  return dispatch => {
    if (searchValue && searchValue.length >= 2) {
      axiosSearchQuery(searchValue).then(response => {
        dispatch(searchContact(response.data));
      });
    } else {
      // render an empty result array
      dispatch(searchContact([]));
    }
  };
}

export function onContactSaved() {
  return dispatch => {
    dispatch(queryAllContactName());
    dispatch(contactSaved());
  };
}

export function onContactEdited() {
  return dispatch => {
    dispatch(queryAllContactName());
  };
}

// CREATE A LIST WITH LETTER AND SUBMENU
export function submenuList(allNameResults) {
  let subMenuName = [
    {
      id: 0,
      hasCaret: true,
      icon: 'folder-close',
      label: 'Contacts',
      childNodes: [],
    },
  ];

  let node = subMenuName[0];
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    node.childNodes.push({ label: letter, value: letter, childNodes: [] });
  }

  let menu = node.childNodes;
  for (let i = 0; i < allNameResults.length; i++) {
    let value = allNameResults[i];
    const parentId = value.name.toLowerCase().charCodeAt(0) - 97;
    let parentMenu = menu[parentId];
    let children = parentMenu.childNodes;
    children.push({ label: value.name, value: `${parentId}${i}` });
  }

  return {
    type: GET_SIDE_MENU,
    payload: {
      sideMenu: subMenuName,
    },
  };
}

export function setEdition() {
  return {
    type: EDIT_CONTACT,
  };
}

// ACTION CALL TO REDUCER
export function allSupplierName(allNameResults) {
  return {
    type: GET_ALL_CONTACT_NAME,
    payload: {
      allContactName: allNameResults,
    },
  };
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

export function clearSuggestions() {
  return { type: CLEAR_SUGGESTIONS };
}

export function contactSaved() {
  return { type: CONTACT_SAVED };
}

export function deleteContactFromResults(contact) {
  return {
    type: DELETE_CONTACT_FROM_RESULTS,
    payload: { contact: contact },
  };
}

/* auto suggest redux action */
export function maybeUpdateSuggestions(value) {
  return {
    type: MAYBE_UPDATE_SUGGESTIONS,
    value,
  };
}
export function onEraseSearchValue() {
  return {
    type: ERASE_SEARCH_VALUE,
  };
}

export function handleMoveCancel() {
  return { type: HANDLE_MOVE_CANCEL };
}

/* auto suggest redux action */
export function loadSuggestionsBegin() {
  return {
    type: LOAD_SUGGESTIONS_BEGIN,
  };
}

export function resetContactToDelete() {
  return { type: RESET_CONTACT_TO_DELETE };
}

export function setContactToDelete(contact) {
  return {
    type: SET_CONTACT_TO_DELETE,
    payload: {
      contact: contact,
    },
  };
}

export function searchContact(searchResults) {
  return {
    type: SEARCH_CONTACT,
    payload: {
      response: searchResults,
    },
  };
}

export function updateInputValue(value) {
  return {
    type: UPDATE_INPUT_VALUE,
    value,
  };
}
