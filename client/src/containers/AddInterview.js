import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addInterview} from '../actions/interviews.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const ADD_INTERVIEW_FORM = [
    { field: 'employee_id', type: 'number', label: 'Interviewer ID' },
    { field: 'candidate_id', type: 'number', label: 'Candidate ID'},
    { field: 'interview_date', type: 'date', label: ''},
    { field: 'interview_time', type: 'text', label: 'Interview Time'},
    { field: 'location', type: 'text', label: 'Location'}
]

class AddInterview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    submitHandler = (value) => {
        const {employee_id, candidate_id, interview_date, interview_time, location} = value;
        const interview = {
            employee: {
                id: employee_id,
            },
            candidate: {
                id: candidate_id,
            },
            interview_date: interview_date,
            interview_time: interview_time,
            location: location
        };

        this.props.addInterview(interview, (res) => {

            if (res.data) {
                this.setState({
                    message: 'Interview is saved.'
                });
            } else {
                this.setState({
                    message: 'Interview is not saved.'
                });
            }
        });
    }

    renderField(props) {
        const {label, type} = props.control;
        return (
            <Grid item xs={12} md={12}>
                <TextField type={type} label={label} {...props.input}
                           fullWidth />
            </Grid>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h3" gutterBottom>
                    New Interview
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            ADD_INTERVIEW_FORM.map(control => {
                                return <Field
                                    component={this.renderField}
                                    name={control.field}
                                    key={control.field}
                                    control={control}
                                />
                            })
                        }
                    </Grid>
                    <button type="submit" className="btn btn-primary" style={{marginTop: 20}}>
                        Submit
                    </button>
                    <p>{this.state.message}</p>
                </form>
            </React.Fragment>
        );
    }
}

function validate(data) {
    let errors = {};

    if (data.candidate_id === '') {
        errors.candidate_id = 'Name can\'t be empty';
    }

    if (data.job_id === '') {
        errors.job_id = 'Applied position can\'t be empty';
    }

    return errors;
}

export default connect(null, {addInterview})(
    reduxForm({
        form: 'ADD_INTERVIEW_FORM',
        validate: validate
    })(AddInterview)
);
