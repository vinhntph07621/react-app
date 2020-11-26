import React, { FunctionComponent, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isEmpty } from 'lodash';

import { AppContext } from '../../../contexts/AppContext';


export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, userLoaded } = useContext(AppContext);
  

  return userLoaded ? (
    <Route
      {...rest}
      render={(props) =>
        user && !isEmpty(user) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />

        ) 

      }
    />
  ) : null;
};

export default PrivateRoute;
