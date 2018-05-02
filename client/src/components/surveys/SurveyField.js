//SurveyField contains logic to render a single label
//and text input
import React from 'react';

//Since reduxForm is using the SurveyField, it has a whole lot of props being
//passed to it
//ES6 Destructuring
//equivalent to var input = props.input
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginButtom: '5px' }} />
      <div
        id="validation-alert"
        className="red-text style={{ marginButtom: '20px' }}"
      >
        {touched && error}
      </div>
    </div>
  );
};

//<input {...input} /> --> we are passing all the properties of prop.input to
//input tag
//Summary -- We are taking a bunch of event handlers from reduxForm and wiring it
//up with our input element and that input element is rendered by Field.
//So eventually all those event handlers go back to the reduxForm like this.
