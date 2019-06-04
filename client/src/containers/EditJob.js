import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editJob, getJobs} from '../actions/jobs.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const EDIT_JOB_FORM = [
    { field: 'id', type: 'number', label: 'Id' },
    { field: 'name', type: 'text', label: 'Name'},
    { field: 'created_date', type: 'date', label: ''},
    { field: 'location', type: 'text', label: 'Location'},
    { field: 'dept_id', type: 'number', label: 'Department'},
]

class EditJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    submitHandler = (value) => {
        const {id, name, created_date, location, dept_id} = value;
        const job = {
            id: id,
            name: name,
            created_date: created_date,
            location: location,
            department: {
                id: dept_id
            }
        };

        this.props.editJob(job, (res) => {
            if (res.data) {
                this.setState({
                    message: 'Job is saved.'
                });
            } else {
                this.setState({
                    message: 'Job is not saved.'
                });
            }
        });
    }

    componentDidMount() {
        if (!this.props.jobs) {
            this.props.getJobs();
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
                    Change Job Information
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            EDIT_JOB_FORM.map(control => {
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

function mapStateToProps({jobs}, componentProps) {
    const job = jobs ? jobs.find(c => {
        return c.id === +componentProps.match.params.id;
    }) : null;
    return {
        jobs,
        initialValues: job
    };
}

function validate(data) {
    let errors = {};

    if (data.name === '') {
        errors.name = 'Job name can\'t be empty';
    }

    if (data.location === '') {
        errors.location = 'Location can\'t be empty';
    }

    return errors;
}


export default connect(mapStateToProps, {getJobs, editJob})(
    reduxForm({
        form: 'EDIT_JOB_FORM',
        validate: validate
    })(EditJob)
);
