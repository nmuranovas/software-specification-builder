import React, { useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import { useAuth0 } from './services/react-auth0-spa';
import { BrowserRouter, Switch, Route, withRouter, useHistory } from 'react-router-dom';
import Profile from './components/user/Profile';
import Home from './components/Home';
import BaseLayout from './components/layouts/BaseLayout';
import PrivateRoute from './components/routing/PrivateRoute';
import Specifications from './components/specification/Specifications';
import SpecificationBuilder from './components/specification-builder/SpecificationBuilder';
import SpecificationDetailsComponent from './components/dedicated-specification-page/SpecificationDetailsComponent';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline, Slide } from '@material-ui/core';
import Dashboard from './components/user/Dashboard';
import SpecificationEditingComponent from './components/specification-edit/SpecificationEditingComponent';

const App: React.FunctionComponent = () => {
  const { isLoggingIn } = useAuth0();

  const theme = createMuiTheme({
    palette: {
      type: 'light',
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
          <BaseLayout>
            <Route
              render={({ location }) => {
                return (
                  <Switch>
                    <Route key="home" path="/" exact component={Home} />
                    <PrivateRoute key="dashboard" path="/dashboard" Component={Dashboard} />
                    <PrivateRoute key="builder" path="/specification-builder" Component={SpecificationBuilder} />
                    <PrivateRoute key="profile" path="/profile" Component={Profile} />
                    <PrivateRoute key="edit" path="/edit/:slug" Component={SpecificationEditingComponent} />
                    <Route key="listing" path="/specifications" component={Specifications} />
                    <Route key="spec" path="/:slug" component={SpecificationDetailsComponent} />
                  </Switch>
                )
              }}>
            </Route>
          </BaseLayout>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}


export default App;
