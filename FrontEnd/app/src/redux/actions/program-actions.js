// src/redux/actions/program-actions.js
import {
  ON_VALIDATE_PROGRAM_SELECTION,
  PRODUCTOR_SELECTED,
  PROGRAM_SELECTED,
  SET_PRODUCTOR_LIST,
  SET_PROGRAM_LIST,
  SET_VERSION_LIST,
  VERSION_SELECTED
} from '../../utils/action-types';
import { axiosGetQuery, axiosPostQuery } from '../../utils/axiosQuery';
import { productor, program, version } from '../../utils/routes';

export function onValidateProgramSelection() {
  return {
    type: ON_VALIDATE_PROGRAM_SELECTION
  };
}

function setProductorList(productorList) {
  return {
    type: SET_PRODUCTOR_LIST,
    payload: {
      productorList: productorList
    }
  };
}

function setProgramList(programList) {
  return {
    type: SET_PROGRAM_LIST,
    payload: {
      programList: programList
    }
  };
}

function setVersionList(versionList) {
  return {
    type: SET_VERSION_LIST,
    payload: {
      versionList: versionList
    }
  };
}

export function getAllProductorList() {
  return dispatch => {
    axiosGetQuery(productor.getAll).then((response, error) => {
      if (!error) {
        dispatch(setProductorList(response.data));
      } else {
        dispatch(setProductorList([]));
      }
    });
  };
}

export function getAllProgramList(productorId) {
  return dispatch => {
    axiosGetQuery(`${program.getProductorIdProgram}${productorId}`).then(
      (response, error) => {
        if (!error) {
          dispatch(setProgramList(response.data));
        } else {
          dispatch(setProgramList([]));
        }
      }
    );
  };
}

export function getAllVersionList(programId) {
  return dispatch => {
    axiosGetQuery(`${version.getProgramIdVersion}${programId}`).then(
      (response, error) => {
        if (response.status === 200) {
          dispatch(setVersionList(response.data.versions));
        } else {
          dispatch(setVersionList([]));
        }
      }
    );
  };
}

export function productorSelected(productor) {
  return {
    type: PRODUCTOR_SELECTED,
    payload: {
      productorIdSelected: productor._id,
      productorNameSelected: productor.name,
      programList: []
    }
  };
}

export function programSelected(program) {
  return {
    type: PROGRAM_SELECTED,
    payload: {
      programIdSelected: program._id,
      programNameSelected: program.name,
      versionIdSelected: '',
      versionNameSelected: '',
      versionList: []
    }
  };
}

export function versionSelected(version) {
  return {
    type: VERSION_SELECTED,
    payload: {
      versionIdSelected: version._id,
      versionNameSelected: version.name
    }
  };
}

export function saveNewProductor(prod) {
  return dispatch => {
    axiosPostQuery(productor.add, { name: prod }).then((response, error) => {
      if (response.status === 200) {
        dispatch(productorSelected(response.data));
        dispatch(getAllProductorList()); // check if it's working
      }
    });
  };
}

export function saveNewProgram(prog, productor) {
  const programOption = { name: prog, productor: productor };
  return dispatch => {
    axiosPostQuery(program.add, programOption).then((response, error) => {
      if (response.status === 200) {
        dispatch(programSelected(response.data));
        dispatch(getAllProgramList());
      }
    });
  };
}

export function saveNewVersion(ver, programId) {
  const information = { version: ver, program: programId };
  return dispatch => {
    axiosPostQuery(version.add, information).then((response, error) => {
      if (response.status === 200) {
        dispatch(getAllVersionList(programId));
        dispatch(versionSelected(response.data));
      }
    });
  };
}
