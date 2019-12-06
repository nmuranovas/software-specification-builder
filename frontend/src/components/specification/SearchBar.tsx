import { Paper, InputBase, IconButton, TextField, Divider } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(2, 2),
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);

type SearchBarProps = {
    onSubmit: (searchQuery: string) => void,
}

const SearchBar = (props: SearchBarProps) => {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState<string>("");
    const [typingTimeout, setTypingTimeout] = useState();

    const handleValueChange = (value: string) => {
        clearTimeout(typingTimeout);
        setSearchValue(value);
        setTypingTimeout(setTimeout(() => {
            handleSubmit(value);
        }, 500));
    }

    const handleSubmit = (value: string) => {
        props.onSubmit(value);
    }

    return (
        <Paper className={classes.root}>
            <TextField
                className={classes.input}
                placeholder="Search for a specification"
                inputProps={{ 'aria-label': 'search for a specification' }}
                type="search"
                value={searchValue}
                onChange={event => handleValueChange(event.target.value)}
                InputProps={{ disableUnderline: true }}
            />
            {/* <Divider className={classes.divider} orientation="vertical" /> */}
            {/* <IconButton
                onClick={handleSubmit}
                type="submit"
                className={classes.iconButton}
                aria-label="search"
            >
                <SearchIcon />
            </IconButton> */}
        </Paper>
    )
}

export default SearchBar;