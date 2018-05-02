import { FETCH_USER } from '../actions/types';
//This Reducer will store the user model
//state object here is responsible for this reducer
//state object initially starts as undefined
//Default state is null. i.e. request not completed yet
//authReducer would return only 3 values - payload, false or null
export default function(state = null, action) {
  //console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; //Now empty payloads would be returned as false

    default:
      return state;
  }
}
