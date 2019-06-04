import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editCandidate, getCandidates} from '../actions/candidates.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {FormControl, Input, InputLabel, Select} from "@material-ui/core/es/index";
import {getPostWebsites} from '../actions/postWebsites.action';

const EDIT_CANDIDATE_FORM = [
    { field: 'id', type: 'number', label: 'Id' },
    { field: 'name', type: 'text', label: 'Name'},
    { field: 'date_birth', type: 'date', label: ''},
    { field: 'email', type: 'text', label: 'Email'},
    { field: 'degree', type: 'text', label: 'Degree'},
    { field: 'post_website_id', type: 'select', label: 'Applied From'},
]

class EditCandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            value: '',
            input: ''
        }
    }

    componentDidMount() {
        if (!this.props.candidates) {
            this.props.getCandidates();
        }

        this.props.getPostWebsites();
    }

    handleChange = (event => {
        if (event.target.name === 'post_website_id') {
            const id = event.target.value;
            const targetWeb = this.props.post_websites.find(web => {
                return web.id == id;
            });
            this.setState({
                value: targetWeb.name,
            });
        }
    })

    submitHandler = (value) => {
        const {id, name, date_birth, email, degree, post_website_id} = value;
        const candidate = {
            id: id,
            name: name,
            date_birth: date_birth,
            email: email,
            degree: degree,
            post_website: {
                id: post_website_id
            }
        };

        this.props.editCandidate(candidate, (res) => {
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

    renderField = (props) => {
        const {label, type} = props.control;

        return (
            <Grid item xs={12} md={12}>
                {
                    label === 'Applied From' ?
                        <FormControl fullWidth>
                            <InputLabel htmlFor="plan-native-simple">{label}</InputLabel>
                            <Select
                                required
                                native
                                {...props.input}
                            >
                                <option />
                                {
                                    this.props.post_websites && this.props.post_websites.map(web => {
                                            return (
                                                <option value={web.id} key={web.id}>{web.name}</option>
                                            );
                                        }

                                    )
                                }
                            </Select>
                        </FormControl>
                        :
                        <TextField
                            type={type}
                            label={label}
                            disabled={props.control.field === 'id'}
                            {...props.input}
                            fullWidth />
                }
            </Grid>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Typography variant="h3" gutterBottom>
                    Change Candidate Information
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            EDIT_CANDIDATE_FORM.map(control => {
                                return <Field
                                    component={this.renderField}
                                    name={control.field}
                                    key={control.field}
                                    control={control}
                                    onChange={this.handleChange}
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

function mapStateToProps({candidates, post_websites}, componentProps) {
    const candidate = candidates ? candidates.find(c => {
        return c.id === +componentProps.match.params.id;
    }) : null;
    return {
        candidates: candidates,
        post_websites: post_websites,
        initialValues: candidate,
    };
}

export default connect(mapStateToProps, {getCandidates, editCandidate, getPostWebsites})(
    reduxForm({
        form: 'EDIT_CANDIDATE_FORM',
        validate: validate
    })(EditCandidate)
);
