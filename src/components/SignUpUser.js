import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";
import * as Actions from "../store/actions";
import {useHistory} from "react-router-dom";




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparant',
  },
  root: {
    backgroundColor: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 0,

  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h1: {
    color: 'white',
  },
  field: {
    backgroundColor: 'white',
    borderRadius: 5,
    border: 'none',
  },
}));

export const SignUpUser = withReducer("signUpUser", reducer)((props) => {
  const classes = useStyles();
  const account = useSelector(({blockchain}) => blockchain.account);
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState(account.createAccount);

  useEffect(() => {
    setForm(account.createAccount);
  }, [account])

  return (

    <div className="bg-fixed sm:bg-scroll bg-cover"
         style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "100vh"}}>
      <div className="w-full flex-auto h-full" style={{backgroundColor: "rgb(0 0 0 / 85%)"}}>
        <div className={classes.paper}>
          <img src="/images/logo-ticketing.png" alt="logo" width="250" height="300"/>
          <Typography className={classes.h1} component="h1" variant="h5">
            Sign Up </Typography>
        </div>
        <Container component="main" maxWidth="xs">
          <CssBaseline/>
          <div className={classes.paper}>

            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.field}
                    autoComplete="fname"
                    name="Username"
                    variant="filled"
                    required
                    fullWidth
                    id="firstName"
                    label="Username"
                    value={form.asset?.username}
                    autoFocus
                    onChange={(e) => {
                      if (e.target.value.length <= 50) {
                        dispatch(Actions.updateCreateAccount('asset.username', e.target.value));
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.field}
                    autoComplete="fname"
                    name="First name"
                    variant="filled"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={form.asset?.firstName}
                    onChange={(e) => {
                      if (e.target.value.length <= 50) {
                        dispatch(Actions.updateCreateAccount('asset.firstName', e.target.value));
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.field}
                    autoComplete="lname"
                    name="Last name"
                    variant="filled"
                    required
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    autoFocus
                    value={form.asset?.lastName}
                    onChange={(e) => {
                      if (e.target.value.length <= 50) {
                        dispatch(Actions.updateCreateAccount('asset.lastName', e.target.value));
                      }
                    }}
                  />
                </Grid>
            {/*TODO - VERWIJDEREN WANNEER BLOCKCHAIN GEKOPPELD - TIJDELIJK ADDRESS*/}
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.field}
                    autoComplete="lname"
                    name="address"
                    variant="filled"
                    required
                    fullWidth
                    label="Address"
                    autoFocus
                    value={form.address}
                    onChange={(e) => {
                      if (e.target.value.length <= 50) {
                        dispatch(Actions.updateCreateAccount('address', e.target.value));
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    className={classes.field}
                    variant="filled"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() => {
                  history.push(`/account/1234342432ddddfd`);
                  dispatch(Actions.addAccount(form));
                }}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link onClick={() => { history.push('/signup/organiser')}} variant="body2">
                    Are you an organiser? Sign up here!
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>

        </Container>

      </div>


    </div>

  );
});
