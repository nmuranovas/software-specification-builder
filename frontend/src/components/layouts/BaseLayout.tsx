import React from 'react';

import { CssBaseline } from '@material-ui/core';
import Footer from './Footer';
import Header from './Header';

const BaseLayout: React.FunctionComponent = props => {

  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

export default BaseLayout;