import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AddBoxIcon from '@material-ui/icons/AddBox';

type Route = {
    link: string,
    text: string,
    icon: JSX.Element
}

export const publicRoutes: Route[] = [{
    link: "/",
    text: "Home",
    icon: <HomeIcon />
}, {
    link: "/specifications",
    text: "Specifications",
    icon: <DescriptionIcon />
}]

export const privateRoutes: Route[] = [{
    link: "/profile",
    text: "Profile",
    icon: <AccountCircleIcon />
}, {
    link: "/dashboard",
    text: "Dashboard",
    icon: <DashboardIcon />
}, {
    link: "/specification-builder",
    text: "Builder",
    icon: <AddBoxIcon />
}]

export default Route;