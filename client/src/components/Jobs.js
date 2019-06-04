import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getJobs, getJobById, deleteJob} from '../actions/jobs.action';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Collapse from '@material-ui/core/Collapse';

const styles = theme => ({
    card: {
        minWidth: 275,
        maxWidth: 1000,
        margin: 20
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
});

class Jobs extends Component {
    state = {
        expanded: false,
        anchorEl: null,
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentDidMount() {
        // load data
        this.props.getJobs();

        if (this.props.match.params.id) {
            this.props.getJobById(this.props.match.params.id);
        }
    }

    deleteJobHandler = (event) => {
        event.preventDefault();

        this.props.deleteJob(event.target.name, (res) => {
            if(res.data.success){
                this.props.getJobs();
            } else {
                alert('Only the administrator can delete job!');
            }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>

                <div style={{ flexDirection: 'row' }}>
                    <h2 style={{display: 'inline-block'}}>Active Jobs</h2>
                    <button className="btn btn-primary" style={{position: 'absolute', right: 150}}>
                        <Link to="/add-job" style={{color:"white"}}>
                            New Job
                        </Link>
                    </button>
                </div>

                {
                    this.props.jobs && this.props.jobs.map((job, index) => {
                        return (
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h4" component="h2">
                                        <div>{job.name}</div>
                                        <div class="btn-group" role="group" style={{display: 'block', float:"right"}}>
                                            <button className={classes.editJob} className="btn btn-info">
                                                <Link to={`/edit-job/${job.id}`} style={{color:"white", margin: 8}}> Edit </Link>
                                            </button>
                                            <hr/>
                                            <button name={job.id} className="btn btn-danger" onClick={this.deleteJobHandler}>Delete</button>
                                        </div>
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary" style={{fontSize: 12, marginTop: 10}}>
                                        Created on:
                                        <Moment format="LLLL" style={{fontSize: 12}}>
                                            {job.created_date}
                                        </Moment>
                                    </Typography>
                                    <Typography>
                                        <div style={{fontSize: 13, marginBottom: 10}}> Location: {job.location} </div>
                                        <div style={{fontSize: 13, marginBottom: 10}}>
                                            <b>5</b> Candidates
                                        </div>
                                        <div style={{fontSize: 13}}>
                                            Department: {job.department.name}
                                        </div>
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.actions} disableActionSpacing>
                                    <CopyToClipboard text={`http://msi-final-mango-project.s3-website.us-east-2.amazonaws.com/jobs/${job.id}`}
                                                     onCopy={() => this.setState({copied: true})}>
                                        <IconButton aria-label="Share">
                                            <ShareIcon />
                                        </IconButton>
                                    </CopyToClipboard>
                                    <IconButton
                                        className={classnames(classes.expand, {
                                            [classes.expandOpen]: this.state.expanded,
                                        })}
                                        onClick={this.handleExpandClick}
                                        aria-expanded={this.state.expanded}
                                        aria-label="Show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph style={{fontSize: 12}}>
                                            <b>Description:</b>
                                            <div>
                                                At Mercury, community is who we are, it’s what we do, and it’s what makes us different. To create the best ride for all, we start in our own community, by creating an open, inclusive and diverse organization where all team members belong.

                                                The Mercury Retail Development team is looking for a talented Vendor Manager to buy and manage products that are essential for our non-office locations (driver hubs, Vehicle Service Centers, Bikes and Scooter Warehouses). The possibilities are endless and our brick and mortar plans are only in their infancy, so we are looking for talented, dynamic individuals to help us bring this vision to reality.
                                            </div>
                                        </Typography>
                                        <Typography paragraph style={{fontSize: 12}}>
                                            <b>Responsibilities</b>
                                            <ul>
                                                <li>
                                                    Seek reliable vendors and suppliers to provide quality products at
                                                    a reasonable price
                                                    Work alongside the Design team to research new products
                                                </li>
                                                <li>
                                                    Compare and evaluate offers from suppliers
                                                </li>
                                                <li>
                                                    Negotiate contract terms of agreement and pricing
                                                </li>
                                                <li>
                                                    Work closely with the Construction team to track orders and ensure
                                                    timely delivery to site
                                                    Review quality of purchased products
                                                </li>
                                                <li>
                                                    Maintain updated records of purchased products, delivery
                                                    information, including cost analyses
                                                </li>
                                                <li>
                                                    Forecast upcoming demand and order as needed
                                                </li>
                                                <li>
                                                    Maintain positive relationships with key vendors to ensure product
                                                    is high quality and delivered on time
                                                </li>
                                            </ul>

                                            <b>Experience & Skills</b>
                                            <ul>
                                                <li>
                                                    Good knowledge of vendor sourcing practices (researching,
                                                    evaluating and liaising with vendors)
                                                </li>
                                                <li>
                                                    Solid analytical skills, with the ability to create financial
                                                    reports and conduct cost analyses
                                                </li>
                                                <li>
                                                    Excellent verbal and written communication skills
                                                </li>
                                                <li>
                                                    Negotiation skills
                                                </li>
                                            </ul>
                                        </Typography>

                                        <Typography paragraph style={{fontSize: 12}}>
                                            <b>Skills prefer:</b>
                                            <ul>
                                                <li>
                                                    6+ years of experience in a combination of strategy and operations
                                                    roles (strategy consulting, business operations, investment banking,
                                                    venture capital/private equity, or equivalent fields)
                                                </li>
                                                <li>
                                                    Propensity to ask insightful questions, conduct thorough research,
                                                    and understand both high-level strategy and ground-level tactical needs
                                                </li>
                                                <li>
                                                    Analytically minded with deep experience using data to drive
                                                    insights and decision-making
                                                </li>
                                                <li>
                                                    Ability to effectively communicate complex data to wide audiences,
                                                    including executives, and build clear, concise presentations
                                                </li>
                                                <li>
                                                    Strong project management and leadership skills, including
                                                    directing non-direct reports
                                                </li>
                                                <li>
                                                    Sophisticated understanding of various performance metrics and
                                                    KPIs for Sales and Business Development teams
                                                </li>
                                                <li>
                                                    Experience dealing with unstructured business issues
                                                </li>
                                                <li>
                                                    Intellectually curious, detail-oriented, and driven to make an
                                                    impact on the business
                                                </li>
                                                <li>
                                                    Strongly predisposed to action and getting things done autonomously
                                                </li>
                                            </ul>
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        );
                    })
                }


            </React.Fragment>
        );
    }

}

Jobs.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({jobs}) {
    return {
        jobs
    }
}

export default connect(mapStateToProps, {getJobs, getJobById, deleteJob})(withStyles(styles)(Jobs));