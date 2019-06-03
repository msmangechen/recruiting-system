import React from "react";
import {connect} from "react-redux";

export default function auth(UnprotectedComponent) {

    class ProtectedComponent extends React.Component {

        constructor(props) {
            super(props);
            this.state = {};
        }

        static getDerivedStateFromProps(props, state) {
            if (JSON.parse(localStorage.getItem('employee'))) {
                return state;
            } else {
                props.history.push('/login'); // redirect user to login page.
                return state;
            }
        }

        render() {
            return (
                <UnprotectedComponent {...this.props} />
            );
        }

    }

    function mapStateToProps({loggedIn}) {
        return {loggedIn};
    }

    return connect(mapStateToProps)(ProtectedComponent);

}