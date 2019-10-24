// src/redux/actions/contact.js
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

// Initial contact state
const initialState = {
  allContactName: [],
  sideMenu: [],
  contact: { _id: '', name: '' },
  canEscapeKeyCancel: true,
  isOpen: false,
  isNewContactOn: false,
  isEditingOn: false,
  isClient: false,
  results: [],
  suggestions: [],
  value: '',
};

/** *******************************************************************
 *
 * @name contactReducer
 * @description reducer from react-redux, that match results depending on
 * a type of action.
 * @return the new (modified or not) state
 ********************************************************************* */
function contactReducer(state = initialState, { type, payload, ...action }) {
  switch (type) {
    // Used when we need to add a new contact / client
    case ADD_NEW_CONTACT:
      return {
        ...state,
        isNewContactOn: true,
        isClient: true,
      };
    // Used when we need to add a new supplier
    case ADD_NEW_SUPPLIER:
      return {
        ...state,
        isNewContactOn: true,
        isClient: false,
      };
    // Used when from is canceled
    case CANCEL_NEW_CONTACT:
      return {
        ...state,
        isNewContactOn: false,
        isClient: false,
      };
    // Used when contact is successfully saved
    case CONTACT_SAVED:
      return {
        ...state,
        isNewContactOn: false,
        isClient: false,
        results: [],
      };
    // Used when user clear the searchBar
    case CLEAR_SUGGESTIONS:
      return {
        ...state,
        suggestions: [],
      };
    // Used when user delete a contact
    case DELETE_CONTACT_FROM_RESULTS:
      return {
        ...state,
        results: state.results.filter(
          contact => contact._id !== payload.contact._id
        ),
        allContactName: state.allContactName.filter(
          contact => contact.name !== payload.contact.name
        ),
      };
    // Used to toggle editing switch
    case EDIT_CONTACT:
      return {
        ...state,
        isEditingOn: !state.isEditingOn,
      };
    // Used when user clear the searchBar with the cross icon
    case ERASE_SEARCH_VALUE:
      return {
        ...state,
        value: '',
        suggestions: [],
        results: [],
      };
    // Used at begining to get all contact Name
    case GET_ALL_CONTACT_NAME:
      return {
        ...state,
        allContactName: payload.allContactName,
      };
    // Used to create submenu letter
    case GET_SIDE_MENU:
      console.log('SideMenu...', payload.sideMenu);
      return {
        ...state,
        sideMenu: payload.sideMenu,
      };
    // Used we use click on delete but cancel the operation
    case HANDLE_MOVE_CANCEL:
      return {
        ...state,
        isOpen: false,
      };
    // Used when the user start to search for a contact
    case LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
      };
    // Used to know if we need to update or no the suggestions
    case MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        suggestions: getMatchingContact(state, action.value),
      };
    // Used when contact is deleted
    case RESET_CONTACT_TO_DELETE:
      return {
        ...state,
        contact: { _id: '', name: '' },
        isOpen: false,
      };
    // Used when delete contact is selected (before confirmation)
    case SET_CONTACT_TO_DELETE:
      return {
        ...state,
        contact: payload.contact,
        isOpen: true,
      };
    // Used when user search for a contact name
    case SEARCH_CONTACT:
      return {
        ...state,
        results: payload.response,
      };
    // Used to update searchBar input
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        value: action.value,
      };
    //default when no action (return state)
    default:
      return state;
  }
}

/** **************************************************************
 *
 * @name escapeRegexCharacters(str)
 * @description escape some caraters that we don't want to use.
 *
 **************************************************************** */
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** **************************************************************
 *
 * @name getMatchingContact(state, value)
 * @description Search into the suggestion array contact name that
 * match the inputed value from user.
 *
 **************************************************************** */
function getMatchingContact(state, value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp(`\\b${escapedValue}`, 'i');
  return state.allContactName.filter(contact => regex.test(contact.name));
}

export default contactReducer;
