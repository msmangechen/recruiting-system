import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getEmployees} from '../actions/employees.action';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        alignItems: 'center',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    addEmployee: {
        float: 'right',
        margin: 20
    }
});

class EmployeeDetail extends Component {

    componentDidMount() {
        // load data
        if (!this.props.employees) {
            this.props.getEmployees();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Name</CustomTableCell>
                            <CustomTableCell align="right">Email</CustomTableCell>
                            <CustomTableCell align="right">Phone</CustomTableCell>
                            <CustomTableCell align="right">Hire Date</CustomTableCell>
                            <CustomTableCell align="right">SSN</CustomTableCell>
                            <CustomTableCell align="center">Address</CustomTableCell>
                            <CustomTableCell>Department</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.employees && this.props.employees.map((employee, index) => (
                            <TableRow className={classes.employee} key={index}>
                                <CustomTableCell component="th" scope="row">
                                    <Link to="/edit-employee"> {employee.name} </Link>
                                </CustomTableCell>
                                <CustomTableCell align="right">
                                    {employee.email}
                                </CustomTableCell>
                                <CustomTableCell align="right">{employee.phone}</CustomTableCell>
                                <CustomTableCell align="right">
                                    <Moment format="YYYY/MM/DD">
                                        {employee.hire_date}
                                    </Moment>
                                </CustomTableCell>
                                <CustomTableCell align="right">{employee.ssn}</CustomTableCell>
                                <CustomTableCell align="right">{employee.address}</CustomTableCell>
                                <CustomTableCell align="right">{employee.department}</CustomTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

EmployeeDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({employees}) {
    return {
        employees
    }
}

export default connect(mapStateToProps, {getEmployees})(withStyles(styles)(EmployeeDetail));