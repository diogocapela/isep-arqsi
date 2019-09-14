import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

// Cookies
import * as cookieTypes from 'config/cookieTypes';

// Hooks
import { useAuth } from 'redux/redux-auth';
import { usePermissions } from 'redux/redux-permissions';

const GlobalHelper = () => {
  const token = Cookies.get(cookieTypes.USER_TOKEN);

  const { getUser } = useAuth();
  const { loadPermissions } = usePermissions();

  useEffect(() => {
    loadPermissions();
  }, [loadPermissions]);

  useEffect(() => {
    if (token) {
      getUser(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

GlobalHelper.propTypes = {
  cookies: PropTypes.object,
};

export default GlobalHelper;
