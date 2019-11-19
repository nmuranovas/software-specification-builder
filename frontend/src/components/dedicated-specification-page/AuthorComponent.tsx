import React from 'react'
import { Box, Typography, Avatar } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(1, 1),
            display: 'flex',
            justifyContent: 'center'
        },
    })
)

type AuthorComponentProps = {
    name: string,
    imageLink: string
}

const AuthorComponent = (props: AuthorComponentProps) => {
    const styles = useStyles();

    return (
        <Box className={styles.root}>
            <Typography style={{ margin: "auto 0", paddingRight: "5px" }} align="justify">
                By: John Doe
            </Typography>
            <Avatar alt={props.name} src={props.imageLink} />
        </Box>
    )
}

export default AuthorComponent
