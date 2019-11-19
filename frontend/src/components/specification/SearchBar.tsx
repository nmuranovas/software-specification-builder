import { Paper, InputBase, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'

const useStyles = makeStyles(theme => ({
    searchBarPaper: {
        padding: '2px 4px',
        margin: theme.spacing(1)
    },
    searchInput: {
        flex: 1
    }
}));

type SearchBarProps = {
    onSubmit: (searchQuery: string) => void
}

const SearchBar = (props: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const classes = useStyles();

    const handleValueChange = (value: string) => {
        setSearchValue(value);
    }

    const handleSubmit = () => {
        if (searchValue !== undefined) {
            props.onSubmit(searchValue);
        }
    }

    return (
        <Paper className={classes.searchBarPaper}>
            <InputBase className={classes.searchInput}
                value={searchValue}
                onChange={event => handleValueChange(event.target.value)}
                placeholder="" />
            <IconButton type="submit" onClick={handleSubmit}>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchBar
