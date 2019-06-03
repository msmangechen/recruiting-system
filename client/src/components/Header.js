import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = theme => ({
    secondaryBar: {
        zIndex: 0,
    },
    link: {
        textDecoration: 'none',
        color: lightColor,
        '&:hover': {
            color: theme.palette.common.white,
        },
    },
    button: {
        borderColor: lightColor,
    },
});

function Header(props) {
    const { classes } = props;

    return (
        <React.Fragment>
            <AppBar
                component="div"
                className={classes.secondaryBar}
                color="primary"
                position="static"
                elevation={0}
            >
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" style={{float:"left", marginTop: 23}}>
                                Recruiting Management System
                            </Typography>
                            <Typography style={{float:"right", marginTop: 23}}>
                                <nav className="navbar navbar-light" >
                                    <ul className="nav navbar-nav">
                                        <li className="nav-item" style={{marginRight:10}}>
                                            <button className="btn btn-primary active">
                                                <Link to="/login"
                                                      style={{textDecoration:"none", color:"white"}}>
                                                    Login
                                                </Link>
                                            </button>
                                        </li>
                                        <li className="nav-item" style={{marginRight:10}}>
                                            <button className="btn btn-primary active">
                                                <Link to="/logout"
                                                      style={{textDecoration:"none", color:"white"}}>
                                                    Logout
                                                </Link>
                                            </button>
                                        </li>
                                        <li className="nav-item" style={{marginRight:10}}>
                                            <button className="btn btn-primary active">
                                                <Link to="/register"
                                                      style={{textDecoration:"none", color:"white"}}>
                                                    Register
                                                </Link>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </Typography>

                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
