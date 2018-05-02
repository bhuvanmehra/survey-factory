//SurveyFormReview shows user their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

//Destructuring props
const SurveyFormReview = ({ onBack, formValues, submitSurvey, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please review the information you entered</h5>
      {reviewFields}
      <button
        className="teal btn-flat white-text"
        id="btnBack"
        onClick={onBack}
      >
        Back
      </button>
      <button
        onClick={() => submitSurvey(formValues, history)}
        className="teal btn-flat right white-text"
        id="btnSubmit"
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));

//Objective - Pull data from Redux Store and display it
//We will use connect Helper
//mapStateToProps function takes data from redux store and assigns it to state
//It takes the redux state, converts it into some props and sends it to our components
//connect(mapStateToProps)(SurveyReview)
//Return from mapStateToProps would come as props to SurveyFormReview

//withRouter -- allows SurveyFormReview to know about reduxForm using
//History object which would be passed as a prop to component and later to
//the action creator
