import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useAuth0 } from '../../services/react-auth0-spa';
import { Link } from 'react-router-dom'
import Route, { publicRoutes, privateRoutes } from '../../routing/routes';
import { ListItemText, ListItemIcon, ListItem, Drawer, Divider, List, Container } from '@material-ui/core';
import clsx from 'clsx'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Footer from './Footer';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        unstyledLink: {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        hide: {
            display: 'none'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        },
        container: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
        }
    })
);



const generateNavigationButton = (route: Route, classes: string) => (
    <Button>
        <Link className={classes} to={route.link}>{route.text}</Link>
    </Button>
)

const BaseLayout: React.FunctionComponent = (props) => {
    const classes = useStyles();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const theme = useTheme();
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const loginLogoutButtons = isAuthenticated ? (
        <Button onClick={() => logout()} color="inherit">Logout</Button>
    ) : (
            <Button onClick={() => loginWithRedirect()} color="inherit">Login</Button>
        );

    const handleDrawerClose = () => {
        setDrawerIsOpen(false);
    }

    const handleDrawerOpen = () => {
        setDrawerIsOpen(true);
    }

    const publicRouteMenuItems = publicRoutes.map(route =>
        <Link className={classes.unstyledLink} to={route.link}>
            <ListItem button key={route.link}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.text} />
            </ListItem>
        </Link>
    )

    const privateRouteMenuItems = isAuthenticated && privateRoutes.map(route =>
        <Link className={classes.unstyledLink} to={route.link}>
            <ListItem button key={route.link}>
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.text} />
            </ListItem>
        </Link >
    )

    const publicRouteButtons = publicRoutes.map(route => generateNavigationButton(route, classes.unstyledLink));
    const privateRouteButtons = isAuthenticated && privateRoutes.map(route => generateNavigationButton(route, classes.unstyledLink));

    return (
        <div className={classes.root}>
            <AppBar position="absolute"
                color="default"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerIsOpen
                })}>
                <Toolbar>
                    <IconButton
                        edge="start" className={clsx(classes.menuButton, {
                            [classes.hide]: drawerIsOpen,
                        })}
                        onClick={handleDrawerOpen}
                        color="default" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.unstyledLink} to="/">Specification Builder</Link>
                    </Typography>
                    {publicRouteButtons}
                    {privateRouteButtons}
                    {loginLogoutButtons}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: drawerIsOpen,
                    [classes.drawerClose]: !drawerIsOpen
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: drawerIsOpen,
                        [classes.drawerClose]: !drawerIsOpen
                    })
                }} open={drawerIsOpen}>
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {publicRouteMenuItems}
                </List>
                <Divider />
                <List>
                    {privateRouteMenuItems}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {props.children}
                <Footer />
            </main>
        </div>
    )
}

export default BaseLayout;