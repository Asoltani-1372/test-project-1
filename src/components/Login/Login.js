import React, { useState , useEffect , useReducer , useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/auth-context'

const emailReducer = (state , action) => {
  if(action.type === 'USER_INPUT' ) {
    return {value : action.val , isValid : action.val.includes('@')}
  }
  if(action.type === 'input_blur' ) {
    return {value : state.value , isValid : action.val.includes('@')}
  }
  return {value : '', isValid: false}
}

const passwordReducer = (state , action) => {
  if(action.type === 'USER_INPUT') {
    return {value : action.val , isValid : action.val.trim().length > 6}
  }
  if(action.type === 'input_blur' ) {
    return {value : state.value , isValid : action.val.trim().length > 6}
  }
  return {value : '', isValid: false}
}




const Login = (props) => {

  const authctx = useContext(AuthContext)
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState , dispatchEmail] = useReducer(emailReducer , {
    value : '', 
    isValid : false,
  } )

  const [passwordState , dispatchPassword] = useReducer(passwordReducer , {
    value : '',
    isValid : false,
  })

  const {isValid : emailIsValid} = emailState
  const {isValid : passwordIsValid} = passwordState


  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );

      return () => {
        clearTimeout(identifier)
      }
    }, 500)
    
  } ,[emailState , passwordState ])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type : 'USER_INPUT' , val : event.target.value})

    // setFormIsValid(
    //   emailState.isValid && passwordState.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type : 'USER_INPUT' , val : event.target.value})

    // setFormIsValid(
    //   passwordState.isValid && enteredEmail.includes('@')
    // );
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
    dispatchEmail({type : 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type : 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authctx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
