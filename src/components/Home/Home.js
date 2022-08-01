import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext  from '../../Store/auth-context';

const Home = (props) => {
const authctx = useContext(AuthContext)

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
    </Card>
  );
};

export default Home;
