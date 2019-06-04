import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addEvaluation} from '../actions/evaluations.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const ADD_EVALUATION_FORM = [
    { field: 'candidate_id', type: 'number', label: 'Candidate ID' },
    { field: 'job_id', type: 'number', label: 'Applied Position'},
    { field: 'eval_time', type: 'date', label: ''},
    { field: 'status', type: 'text', label: 'Status'}
]

class AddEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    submitHandler = (value) => {
        const {candidate_id, job_id, eval_time, status} = value;
        const evaluation = {
            candidate: {
                id: candidate_id,
            },
            job: {
                id: job_id,
            },
            eval_time: eval_time,
            status: status
        };
        this.props.addEvaluation(evaluation, (res) => {

            if (res.data) {
                this.setState({
                    message: 'Evaluation is saved.'
                });
            } else {
                this.setState({
                    message: 'Evaluation is not saved.'
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
                    New Evaluation
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            ADD_EVALUATION_FORM.map(control => {
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

export default connect(null, {addEvaluation})(
    reduxForm({
        form: 'ADD_EVALUATION_FORM',
        validate: validate
    })(AddEvaluation)
);
