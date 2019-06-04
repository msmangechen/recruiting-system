import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addCandidate} from '../actions/candidates.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const ADD_CANDIDATE_FORM = [
    { field: 'name', type: 'text', label: 'Name'},
    { field: 'date_birth', type: 'date', label: ''},
    { field: 'email', type: 'text', label: 'Email'},
    { field: 'degree', type: 'text', label: 'Degree'},
    { field: 'post_website_id', type: 'text', label: 'Applied From'},
]

class AddCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    submitHandler = (value) => {
        const {name, date_birth, email, degree, post_website_id} = value;
        const candidate = {
            name: name,
            date_birth: date_birth,
            email: email,
            degree: degree,
            post_website: {
                id: post_website_id
            }
        };

        this.props.addCandidate(candidate, (res) => {
            if (res.data) {
                this.setState({
                    message: 'Candidate is saved.'
                });
            } else {
                this.setState({
                    message: 'Candidate is not saved.'
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
                    New Candidate
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            ADD_CANDIDATE_FORM.map(control => {
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

    if (data.name === '') {
        errors.name = 'Name can\'t be empty';
    }

    if (data.email === '') {
        errors.email = 'Email can\'t be empty';
    }

    if (data.degree === '') {
        errors.degree = 'Degree can\'t be empty';
    }

    // TODO: current date - date birth need to larger than 18
    // if (data.price && data.price <= 0) {
    //     errors.price = 'Price must be larger than 0.';
    // }

    return errors;
}

export default connect(null, {addCandidate})(
    reduxForm({
        form: 'ADD_CANDIDATE_FORM',
        validate: validate
    })(AddCandidate)
);
