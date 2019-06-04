import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteCandidate, getCandidates, getCandidateById} from '../actions/candidates.action';
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

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
    addCandidate: {
        float: 'right',
        margin: 20
    },
    paper: {
        maxWidth: 2000,
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
});

class Candidates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: ''
        }
    }

    componentDidMount() {
        // load data
        this.props.getCandidates();

        if (this.props.match.params.id) {
            this.props.getCandidateById(this.props.match.params.id);
        }
    }

    deleteCandidateHandler = (event) => {
        event.preventDefault();

        this.props.deleteCandidate(event.target.name, (res) => {
            if(res.data.success){
                this.props.getCandidates();
            } else {
                alert('Only the administrator can delete candidate!');
            }
        });
    }

    inputChangeHandler = (event) => {
        event.preventDefault();

        this.setState({
            searchName: event.target.value
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <h2>Qualified Candidates</h2>
                <Paper className={classes.paper}>
                    <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                        <Toolbar>
                            <Grid container spacing={20} alignItems="center">
                                <Grid item>
                                    <SearchIcon className={classes.block} color="inherit" />
                                </Grid>
                                <Grid item xs>
                                    <TextField
                                        fullWidth
                                        placeholder="Search by name"
                                        InputProps={{
                                            disableUnderline: true,
                                            className: classes.searchInput,
                                            type: 'text',
                                            name: 'searchName',
                                            onChange: this.inputChangeHandler
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <div style={{ flexDirection: 'row' }}>
                                        <button className={classes.addCandidate} className="btn btn-primary" style={{float:"right"}}>
                                            <Link to="/add-candidate" style={{color:"white"}}>
                                                New Candidate
                                            </Link>
                                        </button>
                                    </div>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    <div className={classes.contentWrapper}>
                        <Typography color="textSecondary" align="center">
                            <Paper className={classes.root}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <CustomTableCell>Name</CustomTableCell>
                                            <CustomTableCell align="right">Date of Birth</CustomTableCell>
                                            <CustomTableCell align="right">Email</CustomTableCell>
                                            <CustomTableCell align="right">Degree</CustomTableCell>
                                            <CustomTableCell align="right">Applied From</CustomTableCell>
                                            <CustomTableCell align="right">Delete</CustomTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.candidates && this.props.candidates
                                            .filter(candidate => {
                                                if (candidate.name) {
                                                    return candidate.name.toLowerCase().includes(this.state.searchName.toLowerCase());
                                                }
                                            })
                                            .map((candidate, index) => (
                                                <TableRow className={classes.candidate} key={index}>
                                                    <CustomTableCell component="th" scope="row">
                                                        <Link to={`/edit-candidate/${candidate.id}`}> {candidate.name} </Link>
                                                    </CustomTableCell>
                                                    <CustomTableCell align="right">
                                                        <Moment format="YYYY/MM/DD">
                                                            {candidate.date_birth}
                                                        </Moment>
                                                    </CustomTableCell>
                                                    <CustomTableCell align="right">{candidate.email}</CustomTableCell>
                                                    <CustomTableCell align="right">{candidate.degree}</CustomTableCell>
                                                    <CustomTableCell align="right">
                                                        {candidate.post_website ? candidate.post_website.name : null}
                                                    </CustomTableCell>
                                                    <CustomTableCell align="right">
                                                        <button name={candidate.id} className="btn btn-danger" onClick={this.deleteCandidateHandler}>Delete</button>
                                                    </CustomTableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Typography>
                    </div>
                </Paper>
            </React.Fragment>
        );
    }

}

Candidates.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({candidates}) {
    return {
        candidates
    }
}

export default connect(mapStateToProps, {getCandidates, getCandidateById, deleteCandidate})(withStyles(styles)(Candidates));