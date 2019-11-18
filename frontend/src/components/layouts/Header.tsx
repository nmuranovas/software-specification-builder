import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useAuth0 } from '../../services/react-auth0-spa';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        }
    })
);

export default function Header() {
    const classes = useStyles();

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    const loginLogoutButtons = isAuthenticated ? (
        <Button onClick={() => logout()} color="inherit">Logout</Button>
    ) : (
            <Button onClick={() => loginWithRedirect()} color="inherit">Login</Button>
        );

    const profileLink = isAuthenticated ?
        (
            <Button>
                <Link to="/profile">Profile</Link>
            </Button>
        ) : null;

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/">Specification Builder</Link>
                </Typography>
                <Button>
                    <Link to="/">Home</Link>
                </Button>
                {profileLink}
                <Button>
                    <Link to="/specifications">Specifications</Link>
                </Button>
                <Button>
                    <Link to="/specification-builder">Builder</Link>
                </Button>
                {loginLogoutButtons}
            </Toolbar>
        </AppBar>
    )
}
