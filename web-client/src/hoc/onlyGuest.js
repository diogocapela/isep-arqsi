import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useAuth } from 'redux/redux-auth';

const onlyAuthenticated = WrappedComponent => {
  const OnlyAuthenticatedHOC = props => {
    const { history } = props;
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (isAuthenticated) {
        history.push('/');
      }
    }, [history, isAuthenticated]);

    if (isAuthenticated) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  return withRouter(OnlyAuthenticatedHOC);
};

export default onlyAuthenticated;
