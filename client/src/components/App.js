import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

//importing helpers here
//BrowserRouter -- Brain of React Router that tells react router how to behave.
// It looks at the URL and then displays components depending on the URL
//Route -- Its a react component that is used to set up a route that the user might visit and the set of components that would be visible on the screen

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

// using import statements at client side
// At FE we are using webpack and Babel. It gives easy access to ES2015 modules
// At BE we are using node js which has support for only common js modules.
// Common JS modules support require syntax.
// Functional Component
// App.js will be used to host React Router Stuff
// Configure when this route then display this component
// Header would always be visible. Then react router will decide which routes to show
// State based component used here to make use of lifecycle methods
class App extends Component {
  //The instance this component is mounted/rendered on the page, call this method and check if user is signedin
  componentDidMount() {
    //Wire up App component to redux store using connect helper from react-redux library
    //so that the App component can call an action creator
    //using the action passed as prop
    this.props.fetchUser();
  }
  render() {
    return (
      //returns JSX
      //className="container" tells Materialise CSS to put all components in a container
      //So that objects dont strech to screen edges
      <div className="container" id="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

//Export the Component
export default connect(null, actions)(App);
//             connect(mountStateToProps Function, different action creators we need to wire up)
//These actions are passed into App component as props
