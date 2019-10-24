import React from 'react';
import ReactDOM from 'react-dom';
import './Style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import 'react-sidemenu/dist/side-menu.css';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducer as formReducers } from 'redux-form';
import ContactReducer from './redux/reducers/contact-reducer';
import ProgramReducer from './redux/reducers/program-reducer'; // TODO see if it's still necessary
import App from './App';
import * as serviceWorker from './serviceWorker';

const allReducers = combineReducers({
  contact: ContactReducer,
  program: ProgramReducer,
  form: formReducers,
});

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
