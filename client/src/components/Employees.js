import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteEmployee, getEmployees, getEmployeeById} from '../actions/employees.action';
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
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
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
    },
    paper: {
        margin: 'auto',
        overflow: 'hidden',
    },
    searchBar: {
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: 'block',
    },
    addUser: {
        marginRight: theme.spacing.unit,
    },
    contentWrapper: {
        margin: '40px 16px',
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
});

class Employees extends Component {
    constructor (props) {
        super(props);
    }

    componentDidMount() {
        // load data
        this.props.getEmployees();

        if (this.props.match.params.id) {
            this.props.getEmployeeById(this.props.match.params.id);
        }
    }

    deleteEmployeeHandler = (event) => {
        this.props.deleteEmployee(event.target.name, (res) => {
            if(res.data.success){
                this.props.getEmployees();
            } else {
                alert('Only the administrator can delete employee!');
            }
        });
    }

    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <h2>Employees</h2>
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Name</CustomTableCell>
                                <CustomTableCell>Email</CustomTableCell>
                                <CustomTableCell>Phone</CustomTableCell>
                                <CustomTableCell>Department</CustomTableCell>
                                <CustomTableCell>Type</CustomTableCell>
                                <CustomTableCell>Details</CustomTableCell>
                                <CustomTableCell>Delete</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.employees && this.props.employees.map((employee, index) => {
                                    return (
                                        <TableRow className={classes.employee} key={index}>
                                            <CustomTableCell component="th" scope="row">
                                                <Link to={`/edit-employee/${employee.id}`}>
                                                    {employee.employee_detail && employee.employee_detail.name}
                                                    </Link>
                                            </CustomTableCell>
                                            <CustomTableCell>
                                                {employee.employee_detail && employee.employee_detail.email}
                                            </CustomTableCell>
                                            <CustomTableCell>{employee.employee_detail && employee.employee_detail.phone}</CustomTableCell>
                                            {/*<CustomTableCell>*/}
                                                {/*<Moment format="YYYY-MM-DD">*/}
                                                    {/*{employee.employee_detail.hire_date}*/}
                                                {/*</Moment>*/}
                                            {/*</CustomTableCell>*/}
                                            {/*<CustomTableCell>{employee.employee_detail.ssn}</CustomTableCell>*/}
                                            {/*<CustomTableCell>{employee.employee_detail.address}</CustomTableCell>*/}
                                            <CustomTableCell>{employee.employee_detail && employee.employee_detail.department.name}</CustomTableCell>
                                            <CustomTableCell>{employee.employee_detail && employee.employee_detail.employee_type.name}</CustomTableCell>
                                            {/* TODO: view details */}
                                            <CustomTableCell>

                                                <div>
                                                    <button type="button" className="btn btn-warning"
                                                            onClick={this.handleClickOpen}>
                                                        View
                                                    </button>
                                                    <Dialog
                                                        fullWidth
                                                        maxWidth='md'
                                                        open={this.state.open}
                                                        onClose={this.handleClose}
                                                        TransitionComponent={Transition}
                                                        style={{backgroundColor: 'transparent'}}
                                                    >
                                                        <AppBar className={classes.appBar}>
                                                            <Toolbar>
                                                                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                                                    <CloseIcon />
                                                                </IconButton>
                                                                <div style={{fontSize: 20}}>Employee Details</div>
                                                            </Toolbar>
                                                        </AppBar>

                                                        <List>
                                                            <ListItem>
                                                                <ListItemText primary="Phone: +31645020296"/>
                                                            </ListItem>
                                                            <Divider />
                                                            <ListItem>
                                                                <ListItemText primary="Hire Date: 18-NOV-92"/>
                                                            </ListItem>
                                                            <Divider />
                                                            <ListItem>
                                                                <ListItemText primary="SSN: 1091385"/>
                                                            </ListItem>
                                                            <Divider />
                                                            <ListItem>
                                                                <ListItemText primary="Address: 7 Street, Princeton, NJ"/>
                                                            </ListItem>
                                                            <Divider />
                                                            <ListItem>
                                                                <ListItemText primary="Employee Type: Fulltime"/>
                                                            </ListItem>
                                                            <Divider />
                                                            <ListItem>
                                                                <img src="https://s3.us-east-2.amazonaws.com/msi-final-mango-resources/Screen+Shot+2019-03-06+at+10.09.05+PM.png" alt="None Resume Upload."/>
                                                            </ListItem>
                                                        </List>
                                                    </Dialog>
                                                </div>

                                            </CustomTableCell>
                                            <CustomTableCell>
                                                <button name={employee.id} className="btn btn-danger"
                                                        onClick={this.deleteEmployeeHandler}>
                                                    Delete
                                                </button>
                                            </CustomTableCell>
                                        </TableRow>
                                    )
                                }
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }

}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

Employees.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({employees}) {
    return {
        employees
    }
}

export default connect(mapStateToProps, {getEmployees, deleteEmployee,
    getEmployeeById})(withStyles(styles)(Employees));