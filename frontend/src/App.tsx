import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { useAuth0 } from './services/react-auth0-spa';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from './components/user/Profile';
import Home from './components/Home';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import PrivateRoute from './components/routing/PrivateRoute';
import Specifications from './components/specification/Specifications';
import SpecificationBuilder from './components/specification-builder/SpecificationBuilder';
import SpecificationDetailsComponent from './components/dedicated-specification-page/SpecificationDetailsComponent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const App: React.FunctionComponent = () => {
  const { isLoggingIn } = useAuth0();

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  if (isLoggingIn) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/specification-builder" Component={SpecificationBuilder} />
            <PrivateRoute path="/profile" Component={Profile} />
            <Route path="/specifications" component={Specifications} />
            <Route path="/:slug" component={SpecificationDetailsComponent} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
