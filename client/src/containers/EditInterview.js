import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editInterview, getInterviews} from '../actions/interviews.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const EDIT_INTERVIEW_FORM = [
    { field: 'id', type: 'number', label: 'Id' },
    { field: 'employee_id', type: 'number', label: 'Interviewer ID' },
    { field: 'candidate_id', type: 'number', label: 'Candidate ID'},
    { field: 'interview_date', type: 'date', label: ''},
    { field: 'interview_time', type: 'text', label: 'Interview Time'},
    { field: 'location', type: 'text', label: 'Location'}
]

class EditInterview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    submitHandler = (value) => {
        const {id, employee_id, candidate_id, interview_date, interview_time, location} = value;
        const interview = {
            id: id,
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


        this.props.editInterview(interview, (res) => {
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

    componentDidMount() {
        if (!this.props.interviews) {
            this.props.getInterviews();
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
                    Change Interview Information
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            EDIT_INTERVIEW_FORM.map(control => {
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

function mapStateToProps({interviews}, componentProps) {
    const interview = interviews ? interviews.find(c => {
        return c.id === +componentProps.match.params.id;
    }) : null;
    return {
        interviews,
        initialValues: interview
    };
}

export default connect(mapStateToProps, {getInterviews, editInterview})(
    reduxForm({
        form: 'EDIT_INTERVIEW_FORM',
    })(EditInterview)
);
