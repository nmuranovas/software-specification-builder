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
        },
        unstyledLink: {
            color: theme.palette.text.primary,
            textDecoration: 'none'
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

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="default" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    <Link className={classes.unstyledLink} to="/">Specification Builder</Link>
                </Typography>
                <Button>
                    <Link className={classes.unstyledLink} to="/">Home</Link>
                </Button>
                {isAuthenticated && (
                    <Button>
                        <Link className={classes.unstyledLink} to="/profile">Profile</Link>
                    </Button>
                )}
                <Button>
                    <Link className={classes.unstyledLink} to="/specifications">Specifications</Link>
                </Button>
                {isAuthenticated && (
                <Button>
                    <Link className={classes.unstyledLink} to="/specification-builder">Builder</Link>
                </Button>
                )}
                {loginLogoutButtons}
            </Toolbar>
        </AppBar>
    )
}
