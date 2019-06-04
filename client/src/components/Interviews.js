import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteInterview, getInterviews, getInterviewById} from '../actions/interviews.action';
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
    addInterview: {
        float: 'right',
        margin: 20
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Interviews extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        // load data
        this.props.getInterviews();
        if (this.props.match.params.id) {
            this.props.getInterviewById(this.props.match.params.id);
        }
    }

    deleteInterviewHandler = (event) => {
        event.preventDefault();

        this.props.deleteInterview(event.target.name, (res) => {
            if(res.data.success){
                this.props.getInterviews();
            } else {
                alert('Only the administrator can delete interview!');
            }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div style={{ flexDirection: 'row' }}>
                    <h2 style={{float: "left"}}>Interviews</h2>
                    <button className={classes.addInterview} className="btn btn-primary" style={{float:"right", marginLeft: 10}}>
                        <Link to="/calendar" style={{color:"white"}}>
                            Calendar
                        </Link>
                    </button>
                    <button className={classes.addInterview} className="btn btn-primary" style={{float:"right"}}>
                        <Link to="/add-interview" style={{color:"white"}}>
                            New Interview
                        </Link>
                    </button>
                </div>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell align="right">Interviewer</CustomTableCell>
                                <CustomTableCell align="right">Candidate</CustomTableCell>
                                <CustomTableCell align="right">Interview Date</CustomTableCell>
                                <CustomTableCell align="right">Interview Time</CustomTableCell>
                                <CustomTableCell align="right">Location</CustomTableCell>
                                <CustomTableCell align="right">Edit</CustomTableCell>
                                <CustomTableCell align="right">Delete</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.interviews && this.props.interviews.map((interview, index) => {
                                return (
                                    <TableRow className={classes.interview} key={index}>
                                        <CustomTableCell component="th" scope="row" align="right">
                                            {interview.employee.employee_detail && interview.employee.employee_detail.name}
                                        </CustomTableCell>
                                        <CustomTableCell component="th" scope="row" align="right">
                                            {/*<Link to={`/edit-interview/${interview.id}`}> {interview.candidate.name} </Link>*/}
                                            {interview.candidate.name}
                                        </CustomTableCell>
                                        <CustomTableCell component="th" scope="row" align="right">
                                            <Moment format="YYYY/MM/DD">
                                                {interview.interview_date}
                                            </Moment>
                                        </CustomTableCell>
                                        <CustomTableCell align="right">
                                            {interview.interview_time}
                                        </CustomTableCell>
                                        <CustomTableCell align="right">
                                            {interview.location}
                                        </CustomTableCell>
                                        <CustomTableCell align="right">
                                            <Link to={`/edit-interview/${interview.id}`}>
                                                <button className="btn btn-info" align="right" style={{paddingLeft: 18, paddingRight: 18}}>
                                                    Edit
                                                </button>
                                            </Link>
                                        </CustomTableCell>
                                        <CustomTableCell align="right">
                                            <button name={interview.id} className="btn btn-danger"
                                                    onClick={this.deleteInterviewHandler}>
                                                Delete
                                            </button>
                                        </CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}

Interviews.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({interviews}) {
    return {
        interviews
    }
}

export default connect(mapStateToProps,
    {getInterviews, getInterviewById, deleteInterview})
(withStyles(styles)(Interviews));