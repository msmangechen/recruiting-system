import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editEmployee, getEmployees} from '../actions/employees.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {FormControl, InputLabel, Select} from "@material-ui/core/es/index";
import {getPostWebsites} from '../actions/postWebsites.action';

const EDIT_EMPLOYEE_FORM = [
    { field: 'id', type: 'number', label: 'Id' },
    { field: 'name', type: 'text', label: 'Name'},
    { field: 'email', type: 'text', label: 'Email'},
    { field: 'phone', type: 'text', label: 'Phone'},
    { field: 'hire_date', type: 'date', label: ''},
    { field: 'ssn', type: 'text', label: 'SSN'},
    { field: 'address', type: 'text', label: 'Address'},
    { field: 'dept_id', type: 'number', label: 'Department'},
    { field: 'emp_type_id', type: 'number', label: 'Work Type'}
]

class EditEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    submitHandler = (value) => {
        const {id, name, email, phone, hire_date, ssn, address, dept_id, emp_type_id} = value;
        const employee = {
            id: id,
            name: name,
            email: email,
            phone: phone,
            hire_date: hire_date,
            ssn: ssn,
            address: address,
            department: {
                id: dept_id
            },
            employee_type: {
                id: emp_type_id
            }
        };

        this.props.editEmployee(employee, (res) => {
            if (res.data) {
                this.setState({
                    message: 'Employee is saved.'
                });
            } else {
                this.setState({
                    message: 'Employee is not saved.'
                });
            }
        });
    }

    componentDidMount() {
        this.props.getEmployees();
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
                    Change Employee Information
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            EDIT_EMPLOYEE_FORM.map(control => {
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
        errors.name = 'Employee name can\'t be empty';
    }

    return errors;
}

function mapStateToProps({employees}, componentProps) {
    const employee = employees ? employees.find(e => {
        return e.id === +componentProps.match.params.id;
    }) : null;
    console.log(employee);
    return {
        employees,
        initialValues: employee,
    };
}

export default connect(mapStateToProps, {getEmployees, editEmployee})(
    reduxForm({
        form: 'EDIT_EMPLOYEE_FORM',
        validate: validate
    })(EditEmployee)
);
