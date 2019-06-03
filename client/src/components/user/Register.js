import React, {Component} from 'react';
import {register} from '../../actions/auth.action';
import {connect} from 'react-redux';
import {Field, reduxForm} from "redux-form";
import PropTypes from 'prop-types';
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from 'react-router-dom';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
})

const REGISTRATION_FORM = [
    { field:"name", type:"text",  label:"Name"},
    { field:"username", type:"text",  label:"Username"},
    { field:"password", type:"password", label:"Password"},
    { field:"cfpass", type:"password", label:"Confirm password"},
    { field:"email", type:"text", label:"Email"},
    { field:"phone", type:"text", label:"Phone"},
    { field:"hire_date", type:"date", label:''},
    { field:"ssn", type:"text", label:"SSN"},
    { field:"address", type:"text", label:"Address"},
    { field:"dept_id", type:"number", label:"Department"}
];

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message:''
        };
    }

    submitHandler = value => {
        const {name, username, password, email, phone, hire_date, ssn, address, dept_id} = value;
        const employee = {
            username: username,
            password: password,
            employee_detail: {
                name: name,
                email: email,
                phone: phone,
                hire_date: hire_date,
                ssn: ssn,
                address: address,
                department: {
                    id: dept_id,
                }
            }
        };
        this.props.register(employee, (res) => {
            if (res.data) {
                this.setState({
                    message: 'Employee is saved.'
                });
                this.props.history.push('/candidates');
            } else {
                this.setState({
                    message: 'Employee is not saved.'
                });
            }
        });
    };

    renderField(props) {
        const {label, type} = props.control;
        return (
            <Grid item xs={12} md={6}>
                <TextField type={type} label={label} {...props.input}
                           fullWidth />
            </Grid>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main} id="register">
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register Account
                    </Typography>
                    <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                        <Grid container spacing={24}>
                            {
                                REGISTRATION_FORM.map(control => {
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
                </Paper>
            </main>
        );
    }

}

function validate (formData){
    let errors = {
        cfpass:''
    };
    if(formData.username === '') {
        errors.username = 'Username can\'t be empty!';
    }
    if(formData.password === '') {
        errors.password = 'Password can\'t be empty!';
    }
    if(formData.cfpass === '') {
        errors.cfpass = 'Confirm Password can\'t be empty! ';
    }
    if(formData.password !== formData.cfpass){
        errors.cfpass += 'Password and confirm password should be same!';
    }

    return errors;
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        initialValues: {
            username: '',
            password: '',
            cfpass: '',
            name: '',
            email: '',
            phone: '',
            hire_date: '',
            ssn: '',
            address: '',
            dept_id: '',
        }
    }
}

export default connect(mapStateToProps, {register})(
    reduxForm({
        form: 'REGISTRATION_FORM',
        validate: validate
    })(withStyles(styles)(Register))
);