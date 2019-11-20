import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, createStyles } from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/List';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menu: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        }
    })
)

const DashboardMenu = () => {
    const styles = useStyles();

    return (
        <List className={styles.menu} component="nav">
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ListIcon />
                </ListItemIcon>
                <ListItemText primary="My Specifications"/>
            </ListItem>
        </List>
    )
}

export default DashboardMenu
