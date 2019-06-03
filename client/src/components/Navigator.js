import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import CalendarViewTodayIcon from '@material-ui/icons/CalendarViewDay';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import HelpOutlineOutlined from '@material-ui/icons/HelpOutlineOutlined'

const categories = [
    {
        id: 'Develop',
        children: [
            { id: 'Candidates', link: '/candidates', icon: <DnsRoundedIcon /> },
            { id: 'Jobs', link: '/jobs', icon: <PermMediaOutlinedIcon /> },
            { id: 'Employees', link: '/employees', icon: <PeopleIcon /> },
            { id: 'Interviews', link: '/interviews', icon: <CalendarViewTodayIcon /> },
            { id: 'Reviews', link: '/reviews', icon: <PhonelinkSetupIcon /> },
            { id: 'Evaluations', link: '/evaluations', icon: <TimerIcon /> },
            // { id: 'ML Kit', icon: <SettingsInputComponentIcon /> },
        ],
    },
    {
        id: 'Quality',
        children: [
            { id: 'Analytics', link: '/dashboard', icon: <SettingsIcon /> },
            { id: 'Calendar', link: '/calendar', icon: <CalendarTodayIcon /> },

        ],
    },
    // {
    //     id: 'Support',
    //     children: [
    //         { id: 'Feedback', icon: <HelpOutlineOutlined /> },
    //     ],
    // },
];

const styles = theme => ({
    categoryHeader: {
        paddingTop: 16,
        paddingBottom: 16,
    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,
    },
    item: {
        paddingTop: 4,
        paddingBottom: 4,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: 16,
        paddingBottom: 16,
    },
    firebase: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.white,
    },
    itemActionable: {
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemActiveItem: {
        color: '#4fc3f7',
    },
    itemPrimary: {
        color: 'inherit',
        fontSize: theme.typography.fontSize,
        '&$textDense': {
            fontSize: theme.typography.fontSize,
        },
    },
    textDense: {},
    divider: {
        marginTop: theme.spacing.unit * 2,
    },
});

function Navigator(props) {
    const { classes, ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
                    Mercury
                </ListItem>
                <ListItem className={classNames(classes.item, classes.itemCategory)}>
                    <ListItemIcon style={{width: '50px', height: '50px', alignItems:'center'}}>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText
                        classes={{
                            primary: classes.itemPrimary,
                        }}
                    >
                        <a target="_blank" href="http://www.mercurysystemsinc.com/"
                           style={{textDecoration:"none", color:"white"}}>
                            About Us
                        </a>
                    </ListItemText>
                </ListItem>
                {categories.map(({ id, children },index) => (
                    <React.Fragment key={index}>
                        <ListItem className={classes.categoryHeader}>
                            <ListItemText
                                classes={{
                                    primary: classes.categoryHeaderPrimary,
                                }}
                            >
                                {id}
                            </ListItemText>
                        </ListItem>



                        {children.map(({ id: childId, icon, active, link }, index) => (
                            <Link to={link} key={index}>
                                <ListItem
                                    button
                                    dense
                                    key={childId}
                                    className={classNames(
                                        classes.item,
                                        classes.itemActionable,
                                        active && classes.itemActiveItem,
                                    )}
                                >
                                <ListItemIcon style={{width: '50px', height: '50px', alignItems:'center'}}>{icon}</ListItemIcon>

                                    <ListItemText
                                        style={{textDecoration:"none", color:"white"}}
                                        classes={{
                                            primary: classes.itemPrimary,
                                            textDense: classes.textDense,
                                        }}
                                    >
                                        {childId}
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        ))}



                        <Divider className={classes.divider} />
                    </React.Fragment>
                ))}
            </List>
        </Drawer>
    );
}

Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);