import React, { useState } from 'react'
import classes from './SlickPagination.module.css'
import SortIcon from '@material-ui/icons/Sort';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'
import { MenuProps } from '@material-ui/core/Menu';
import DateDescendingIcon from '../Icons/DateDescendingIcon';
import DateAscendingIcon from '../Icons/DateAscendingIcon';


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

type SlickPaginationProps = {
    currentPage: number,
    pageCount: number,
    currentOrderTerm: string,
    onPageChanged: ((pageNumber: number) => void),
    orderChanged: (term: string) => void
}

const SlickPagination = (props: SlickPaginationProps) => {
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorElement)

    const pageNumbers = [];
    for (let i = 0; i < props.pageCount; i++) {
        pageNumbers.push(
            <a onClick={() => props.onPageChanged(i)}
                className={props.currentPage === i ? classes.paginationActive : undefined}>
                {i + 1}
            </a>
        );
    }

    const isLastPage = props.currentPage >= props.pageCount - 1;

    const handleNextClick = () => {
        if (isLastPage) {
            return;
        } else {
            props.onPageChanged(props.currentPage + 1);
        }
    }

    const handlePreviousClick = () => {
        if (props.currentPage === 0) {
            return;
        } else {
            props.onPageChanged(props.currentPage - 1);
        }
    }

    const prevButton = (
        <a className={classes.paginationOlder} onClick={handlePreviousClick}>PREV</a>
    )

    const nextButton = (
        <a className={classes.paginationNewer} onClick={handleNextClick}>NEXT</a>
    )


    const openFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElement(event.currentTarget)
    }


    const options = [
        { term: "createdAtDesc", description: "Sort by most recent", icon: <DateDescendingIcon /> },
        { term: "createdAtAsc", description: "Sort by oldest", icon: <DateAscendingIcon /> }
    ];
    const handleFilterMenuClose = (term: string) => {
        setAnchorElement(null)
        props.orderChanged(term)
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
        <nav className={classes.paginationContainer}>
            <div className={classes.pagination}>
                {prevButton}
                <span className={classes.paginationInner}>
                    {pageNumbers}
                </span>
                {nextButton}
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
            </div>
        </nav>
    )
}

export default SlickPagination
