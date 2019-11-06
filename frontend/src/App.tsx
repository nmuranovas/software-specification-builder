import React from 'react';
// import logo from './logo.svg';
import './App.css';
import BaseLayout from './components/layouts/BaseLayout';
import { Typography, Container, Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    margin: theme.spacing(3, 2),
    padding: theme.spacing(3, 2),
  }
}))

const App: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <BaseLayout>
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
    </BaseLayout>
  );
}

export default App;
