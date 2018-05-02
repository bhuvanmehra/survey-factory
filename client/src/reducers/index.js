//Named index.js so that to allow us to import reducers directory, which by convention would auto give us any files with name index.js
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveysReducer from './surveysReducer';

export default combineReducers({
  //key: value
  auth: authReducer,
  //reduxForm needs this reducer
  form: reduxForm,
  surveys: surveysReducer
});

//Here auth, form and surveys are states for their reducers
