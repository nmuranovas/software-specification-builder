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

const App: React.FunctionComponent = () => {

  const { isLoggingIn } = useAuth0();

  if (isLoggingIn) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/specifications" component={Specifications} />
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" Component={Profile} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
