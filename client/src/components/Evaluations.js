import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteEvaluation, getEvaluations, getEvaluationById} from '../actions/evaluations.action';
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
    addEvaluation: {
        float: 'right',
        margin: 20
    }
});

class Evaluations extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        // load data
        this.props.getEvaluations();
        if (this.props.match.params.id) {
            this.props.getEvaluationById(this.props.match.params.id);
        }
    }

    deleteEvaluationHandler = (event) => {
        event.preventDefault();

        this.props.deleteEvaluation(event.target.name, (res) => {
            if(res.data.success){
                this.props.getEvaluations();
            } else {
                alert('Only the administrator can delete evaluation!');
            }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div style={{ flexDirection: 'row' }}>
                    <h2 style={{float: "left"}}>Evaluations</h2>
                    <button className={classes.addEvaluation} className="btn btn-primary" style={{float:"right", marginLeft: 10}}>
                        <Link to="/calendar" style={{color:"white"}}>
                            Calendar
                        </Link>
                    </button>
                    <button className={classes.addEvaluation} className="btn btn-primary" style={{float:"right"}}>
                        <Link to="/add-evaluation" style={{color:"white"}}>
                            New Evaluation
                        </Link>
                    </button>
                </div>

                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell align="right">Candidate Name</CustomTableCell>
                                <CustomTableCell align="right">Candidate Email</CustomTableCell>
                                <CustomTableCell align="right">Applied Position</CustomTableCell>
                                <CustomTableCell align="right">Evaluation Time</CustomTableCell>
                                <CustomTableCell align="right">Status</CustomTableCell>
                                <CustomTableCell align="right">Delete</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.evaluations && this.props.evaluations.map((evaluation, index) => {
                                return (
                                    <TableRow className={classes.evaluation} key={index}>
                                        <CustomTableCell component="th" scope="row">
                                            <Link to={`/edit-evaluation/${evaluation.id}`}> {evaluation.candidate.name} </Link>
                                        </CustomTableCell>
                                        <CustomTableCell component="th" scope="row">
                                            {evaluation.candidate.email}
                                            </CustomTableCell>
                                        <CustomTableCell align="right">{evaluation.job.name}</CustomTableCell>
                                        <CustomTableCell align="right">
                                            <Moment format="LLL">
                                                {evaluation.eval_time}
                                            </Moment>
                                            </CustomTableCell>
                                        <CustomTableCell align="right">{evaluation.status}</CustomTableCell>
                                        <CustomTableCell align="right">
                                            <button name={evaluation.id} className="btn btn-danger"
                                                    onClick={this.deleteEvaluationHandler}>
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

Evaluations.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({evaluations}) {
    return {
        evaluations
    }
}

export default connect(mapStateToProps,
    {getEvaluations, getEvaluationById, deleteEvaluation})
(withStyles(styles)(Evaluations));