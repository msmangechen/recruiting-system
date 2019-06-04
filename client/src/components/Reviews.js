import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getReviews, getReviewById, deleteReview} from '../actions/reviews.action';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
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

class Reviews extends Component {
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
        this.props.getReviews();
        
        if (this.props.match.params.id) {
            this.props.getReviewById(this.props.match.params.id);
        }
    }

    deleteReviewHandler = (event) => {
        event.preventDefault();

        this.props.deleteReview(event.target.name, (res) => {
            if(res.data.success){
                this.props.getReviews();
            } else {
                alert('Only the administrator can delete review!');
            }
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>

                <div style={{ flexDirection: 'row' }}>
                    <h2 style={{display: 'inline-block'}}>Reviews</h2>
                    <button className="btn btn-primary" style={{position: 'absolute', right: 150}}>
                        <Link to="/add-review" style={{color:"white"}}>
                            New Review
                        </Link>
                    </button>
                </div>

                {
                    this.props.reviews && this.props.reviews.map((review, index) => {
                        return (
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h4" component="h2">
                                        <div>Review for {review.evaluation.candidate && review.evaluation.candidate.name}</div>
                                        <div class="btn-group" role="group" style={{display: 'block', float:"right"}}>
                                            <button className={classes.editReview} className="btn btn-info">
                                                <Link to={`/edit-review/${review.id}`} style={{color:"white", margin: 8}}> Edit </Link>
                                            </button>
                                            <hr/>
                                            <button name={review.id} className="btn btn-danger" onClick={this.deleteReviewHandler}>Delete</button>
                                        </div>
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary" style={{fontSize: 12, marginTop: 10}}>
                                        Post Time:
                                        <Moment format="LLLL" style={{fontSize: 12}}>
                                            {review.evaluation.eval_time}
                                        </Moment>
                                    </Typography>
                                    <Typography>
                                        <div style={{fontSize: 13, marginBottom: 10}}>
                                            Position: {review.evaluation.job && review.evaluation.job.name}
                                        </div>
                                        <div style={{fontSize: 13, marginBottom: 10}}>
                                            Rating: {review.rating}
                                        </div>
                                        <div style={{fontSize: 13, marginBottom: 10}}>
                                            <b>{review.evaluation.status}</b>
                                        </div>
                                        <div style={{fontSize: 13}}>
                                            Reviewer: {review.employee.employee_detail && review.employee.employee_detail.name}
                                        </div>
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.actions} disableActionSpacing>
                                    <CopyToClipboard text={`http://msi-final-mango-project.s3-website.us-east-2.amazonaws.com/reviews/${review.id}`}
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
                                            <b>Overview:</b>
                                            <div>
                                                A focus on prioritizing tasks early in the day will help Jill eliminate distractions to better meet project deadlines. I recommend we touch base briefly each morning to set daily progress goals.

                                                This sort of feedback tells Jill that she needs to work on prioritizing and meeting goals, but it also offers a solution—a daily check-in to help her establish priorities.

                                                Assume that most employees want to do the right thing. Unless Jill’s wasting time posting selfies on Instagram, it’s likely she’s well aware of her problem with meeting deadlines and wants to get better. Rather than pointing out the obvious (Jill struggles to prioritize), it’s important to offer a solution that will work for both of you.

                                                Inc.com provides more examples of what not to write in any employee’s performance review. The Muse offers advice for giving honest feedback that won’t damage your relationship with your employee.
                                            </div>
                                        </Typography>
                                        <Typography paragraph style={{fontSize: 12}}>
                                            <b>Details of review:</b>
                                            <ul>
                                                <li>
                                                    Motivated individual seeks challenging position for personal and professional growth
                                                </li>
                                                <li>
                                                    Industry expert and thought leader available to implement revenue-ramping methodologies.
                                                </li>
                                                <li>
                                                    Professional guru with proven track record of driving key performance metrics seeks next challenging opportunity.
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

Reviews.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps({reviews}) {
    return {
        reviews
    }
}

export default connect(mapStateToProps, {getReviews, getReviewById, deleteReview})(withStyles(styles)(Reviews));