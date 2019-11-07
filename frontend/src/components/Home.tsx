import React from 'react'
import { Typography, Container, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(3, 2),
        padding: theme.spacing(3, 2),
    }
}))

const Home = () => {
    const classes = useStyles();

    return (
        <Container component="main">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h1" gutterBottom>
                        React-powered Software specification builder
                    </Typography>
                    <Typography variant="body2" component="h2" gutterBottom>
                        Build your software specification and export it to a .json, .csv file or embed it in your website!
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    )
}

export default Home
