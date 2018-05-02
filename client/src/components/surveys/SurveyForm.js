// SurveyForm shows the user a form to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  //Helper function
  //Field would be in charge of taking care of user inputs.
  //We are giving it our custom component SurveyField
  renderFields() {
    //Iterate over all elements in FIELDS. Each field.label and field.name
    //ES6 Destructuring
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link
            to="/surveys"
            className=" teal btn-flat white-text"
            id="btnCancel"
          >
            Back
          </Link>
          <button
            type="submit"
            id="btnNext"
            className="teal btn-flat right white-text"
          >
            Next
            <i className="material-icons right" />
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || ' ');

  _.each(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      console.log(values[name]);
      errors[name] = noValueError;
    }
  });
  return errors;
}
export default reduxForm({
  validate: validate,
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);

//<button type="submit">Submit</button>
//surveyForm would not be dismounted when toggling between SurveyForm and SurveyFormReview
