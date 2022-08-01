import React , {useContext} from 'react';

import classes from './Navigation.module.css';
import { useContext } from 'react';
import authContext from '../../Store/auth-context';

const Navigation = (props) => {
  const ctx = useContext(authContext)
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
