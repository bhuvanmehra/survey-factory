import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Tag
import { createStore, applyMiddleware } from 'redux'; // Helpers
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import axios from 'axios';
window.axios = axios;

//materiale-ui is better. However we are using materialise CSS (Vanilla CSS) as its easy to setup and override
//ReactDOM.render(Root Component, Where to render the root component in DOM);
//Clientside naming convention
//App.js -- if file is exporting a class or a component -- Controls views of application -- REACT
//index.js -- if file returns just functions -- Controls Data part of application -- REDUX

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//ReactDom expects a component instance which we give by using JSX tags, Existing DOM Node
//Here we are creating a redux store and wired it to our component hierarchy using Provider tag
//provided to us by the react-redux library
ReactDOM.render(
  //Provider is a react component that knows how to read changes from Redux store.
  //So everytime redux store gets some new state changes, Provider will inform all of its children components (ie. App renders)
  //that a new state is available and update the new state
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
