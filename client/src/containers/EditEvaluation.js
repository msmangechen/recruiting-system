import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editEvaluation, getEvaluations} from '../actions/evaluations.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const EDIT_EVALUATION_FORM = [
    { field: 'id', type: 'number', label: 'Id' },
    { field: 'candidate_id', type: 'number', label: 'Candidate ID' },
    { field: 'job_id', type: 'number', label: 'Applied Position'},
    { field: 'eval_time', type: 'date', label: ''},
    { field: 'status', type: 'text', label: 'Status'},
]

class EditEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    submitHandler = (value) => {
        const {id, candidate_id, job_id, eval_time, status} = value;
        const evaluation = {
            id: id,
            candidate: {
                id: candidate_id,
            },
            job: {
                id: job_id,
            },
            eval_time: eval_time,
            status: status
        };


        this.props.editEvaluation(evaluation, (res) => {
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

    componentDidMount() {
        if (!this.props.evaluations) {
            this.props.getEvaluations();
        }
    }

    renderField(props) {
        const {label, type} = props.control;
        return (
            <Grid item xs={12} md={12}>
                <TextField
                    type={type}
                    label={label}
                    disabled={props.control.field === 'id'}
                    {...props.input}
                    fullWidth />
            </Grid>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h3" gutterBottom>
                    Change Evaluation Information
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            EDIT_EVALUATION_FORM.map(control => {
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

function mapStateToProps({evaluations}, componentProps) {
    const evaluation = evaluations ? evaluations.find(c => {
        return c.id === +componentProps.match.params.id;
    }) : null;
    return {
        evaluations,
        initialValues: evaluation
    };
}

function validate(data) {
    let errors = {};

    if (data.name === '') {
        errors.name = 'Name can\'t be empty';
    }

    if (data.email === '') {
        errors.email = 'Email can\'t be empty';
    }

    return errors;
}


export default connect(mapStateToProps, {getEvaluations, editEvaluation})(
    reduxForm({
        form: 'EDIT_EVALUATION_FORM',
        validate: validate
    })(EditEvaluation)
);
