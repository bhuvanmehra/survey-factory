import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

//action creators defined here
//All FE server interactions with the BE server would happen using the action creators
//here fetchUser is an Action Creator which would dispatch an action
export const fetchUser = () => async dispatch => {
  //AJAX call to BE API
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
  //call promise .then with res from the get call as parameter
  //when that res is available only then we would call dispatch function with the action we want to dispatch
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get('/api/surveys');

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

//Why redux-thunk?
//Normal Redux
//ReactComponent --> Action Creator --produces--> Action --DispatchFunction(auto)--> Reducers --> Store
//No control over DispatchFunction here
//Using redux-thunk, we bend that rule and can control DispatchFunction
//ReactComponent --> Action Creator --produces--> Action --DispatchFunction(manual)--> Reducers --> Store
//How redux-thunk works?
//When redux-thunk sees that Action Creator fetchUser returns a function instead of    , it will automatically
//inject dispatch Function in function arguments.
//Now we can control when to dispatch the action rather than immidiately
//axios.get is a async call which returns a promise.
//we want to dispatch the action to reducers only after axios.get('/api/current_user') has been completed

//dispatch({ type: FETCH_USER, payload: res.data });
// This sends out an request to update our local user model
