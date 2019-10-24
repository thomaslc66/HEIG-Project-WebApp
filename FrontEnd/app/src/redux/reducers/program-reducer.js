// src/redux/actions/contact.js
import {
  ON_VALIDATE_PROGRAM_SELECTION,
  PRODUCTOR_SELECTED,
  PROGRAM_SELECTED,
  HANDLE_MOVE_CANCEL,
  SET_PRODUCTOR_LIST,
  SET_PROGRAM_LIST,
  SET_VERSION_LIST,
  VERSION_SELECTED
} from '../../utils/action-types';

// Initial contact state
const initialState = {
  productorList: [],
  productorIdSelected: '',
  productorNameSelected: 'Séléctionner un producteur',
  programList: [],
  programIdSelected: '',
  programNameSelected: 'Séléctionner un programme',
  versionList: [],
  versionIdSelected: '',
  versionNameSelected: 'Séléctionner la version',
  canEscapeKeyCancel: true,
  isProgramOpen: false
};

/** *******************************************************************
 *
 * @name programReducer
 * @description reducer from react-redux, that match results depending on
 * a type of action.
 * @return the new (modified or not) state
 ********************************************************************* */
function programReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_PRODUCTOR_LIST:
      return {
        ...state,
        productorList: payload.productorList
      };
    case SET_PROGRAM_LIST:
      return {
        ...state,
        programList: payload.programList
      };
    case SET_VERSION_LIST:
      return {
        ...state,
        versionList: payload.versionList
      };
    case PRODUCTOR_SELECTED:
      return {
        ...state,
        productorIdSelected: payload.productorIdSelected,
        productorNameSelected: payload.productorNameSelected,
        programList: payload.programList,
        programIdSelected: '',
        programNameSelected: 'Séléctionner un programme',
        versionIdSelected: '',
        versionNameSelected: 'Séléctionner la version',
        versionList: []
      };
    case PROGRAM_SELECTED:
      return {
        ...state,
        programIdSelected: payload.programIdSelected,
        programNameSelected: payload.programNameSelected,
        versionIdSelected: '',
        versionNameSelected: 'Séléctionner la version',
        versionList: payload.versionList
      };
    case VERSION_SELECTED:
      return {
        ...state,
        versionIdSelected: payload.versionIdSelected,
        versionNameSelected: payload.versionNameSelected
      };
    case HANDLE_MOVE_CANCEL:
      return {
        productorList: [],
        productorIdSelected: '',
        productorNameSelected: 'Séléctionner un producteur',
        programList: [],
        programIdSelected: '',
        programNameSelected: 'Séléctionner un programme',
        versionList: [],
        versionIdSelected: '',
        versionNameSelected: 'Séléctionner un programme',
        canEscapeKeyCancel: true,
        isProgramOpen: false
      };
    case ON_VALIDATE_PROGRAM_SELECTION:
      return {
        ...state,
        productorIdSelected: '',
        productorNameSelected: 'Séléctionner un producteur',
        programList: [],
        programIdSelected: '',
        programNameSelected: 'Séléctionner un programme',
        versionList: [],
        versionIdSelected: '',
        versionNameSelected: 'Séléctionner la version'
      };
    default:
      return state;
  }
}

export default programReducer;
