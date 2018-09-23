import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';



const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {

    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });


    console.log(history);
    console.log(formValues);
    console.log(actions);
    console.log(submitSurvey);
    

    return (
        <div>
            <h5>Please confirm your entires</h5>
            {reviewFields}
            <button
                className="red btn-flat white-text"
                onClick={onCancel}
            >
                Back
            </button>
            <button
                className="teal btn-flat white-text right"
                onClick={() => submitSurvey(formValues, history)}
            >
                Send survey
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