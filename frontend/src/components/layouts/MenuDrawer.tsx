import React, { useState } from 'react'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import clsx from 'clsx'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { publicRoutes, privateRoutes } from '../../routing/routes';
import { useAuth0 } from '../../services/react-auth0-spa';

type MenuDrawerProps = {
    isOpen: boolean,
    closeDrawer: () => void
}

const drawerWidth = 240;

const MenuDrawer = (props: MenuDrawerProps) => {
    return <div></div>
    // const styles = useStyles();

    // const open = props.isOpen;

    // const publicRouteMenuItems = publicRoutes.map(route => 
    //     <ListItem button key={route.link}>
    //         <ListItemIcon>{route.icon}</ListItemIcon>
    //         <ListItemText primary={route.text} />
    //     </ListItem>
    // )

    // const privateRouteMenuItems = isAuthenticated && privateRoutes.map(route => 
    //     <ListItem button key={route.link}>
    //         <ListItemIcon>{route.icon}</ListItemIcon>
    //         <ListItemText primary={route.text} />
    //     </ListItem>
    // )

    // const handleDrawerClose = () => {
    //     props.closeDrawer();
    // }

    // return (

    // )
}

export default MenuDrawer
