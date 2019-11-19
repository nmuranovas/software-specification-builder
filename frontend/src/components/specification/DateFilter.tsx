import React, { useState } from 'react'
import { MenuProps } from '@material-ui/core/Menu';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import DateDescendingIcon from '../Icons/DateDescendingIcon';
import DateAscendingIcon from '../Icons/DateAscendingIcon';
import { OrderingOptions } from '../../models/OrderingOptions';
import SortIcon from '@material-ui/icons/Sort';
import { withStyles } from '@material-ui/core/styles'

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

type DateFilterProps = {
    currentOrderTerm: OrderingOptions,
    orderChanged: (orderingOption: OrderingOptions) => void
}

const DateFilter = (props: DateFilterProps) => {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorElement)

    const openFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget)
    }

    const options = [
        { term: OrderingOptions.CreatedAtDesc, description: "Sort by most recent", icon: <DateDescendingIcon /> },
        { term: OrderingOptions.CreatedAtAsc, description: "Sort by oldest", icon: <DateAscendingIcon /> }
    ];

    const handleFilterMenuClose = (orderingOption: OrderingOptions) => {
        setAnchorElement(null)
        props.orderChanged(orderingOption)
    }
    const optionComponents = options.map((opt, index) => (
        <StyledMenuItem
            key={opt.term}
            selected={props.currentOrderTerm === opt.term}
            onClick={() => handleFilterMenuClose(opt.term)}>
            <ListItemIcon>
                {opt.icon}
            </ListItemIcon>
            <ListItemText>
                {opt.description}
            </ListItemText>
        </StyledMenuItem>
    ));

    return (
        <React.Fragment>
            <IconButton
                onClick={openFilterMenu}>
                <SortIcon />
            </IconButton>
            <StyledMenu anchorEl={anchorElement}
                keepMounted
                open={open}
                onClose={handleFilterMenuClose}>
                {optionComponents}
            </StyledMenu>
        </React.Fragment>
    )
}

export default DateFilter
