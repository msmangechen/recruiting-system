import React, {Component} from 'react';
import {connect} from 'react-redux';
import {editReview, getReviews} from '../actions/reviews.action';
import {Field, reduxForm} from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const EDIT_REVIEW_FORM = [
    { field: 'id', type: 'number', label: 'Id' },
    { field: 'evaluation_id', type: 'number', label: 'Evaluation ID' },
    { field: 'rating', type: 'number', label: 'Rating'},
    { field: 'emp_id', type: 'number', label: 'Reviewer ID(Employee)'},
]

class EditReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }
    }

    submitHandler = (value) => {
        const {id, evaluation_id, rating, emp_id} = value;
        const review = {
            id: id,
            evaluation: {
                id: evaluation_id
            },
            rating: rating,
            employee: {
                id: emp_id
            }
        };

        this.props.editReview(review, (res) => {
            if (res.data) {
                this.setState({
                    message: 'Review is saved.'
                });
            } else {
                this.setState({
                    message: 'Review is not saved.'
                });
            }
        });
    }

    componentDidMount() {
        if (!this.props.reviews) {
            this.props.getReviews();
        }
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
                    Change Review Information
                </Typography>
                <form onSubmit={this.props.handleSubmit(this.submitHandler)}>
                    <Grid container spacing={24}>
                        {
                            EDIT_REVIEW_FORM.map(control => {
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

function mapStateToProps({reviews}, componentProps) {
    const review = reviews ? reviews.find(j => {
        return j.id === +componentProps.match.params.id;
    }) : null;
    return {
        reviews,
        initialValues: review
    };
}

function validate(data) {
    let errors = {};

    return errors;
}


export default connect(mapStateToProps, {getReviews, editReview})(
    reduxForm({
        form: 'EDIT_REVIEW_FORM',
        validate: validate
    })(EditReview)
);
