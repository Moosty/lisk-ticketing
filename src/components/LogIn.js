import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import { cryptography } from "@liskhq/lisk-client";
import * as Actions from "store/actions";
import { useDispatch } from "react-redux";
import * as API from "../utils/api";
import withReducer from "store/withReducer";
import reducer from "store/reducers";
import { useChain } from "../utils/hooks";

function Copyright() {
  return (
    <span className="text-white text-center" style={{color: "white"}}>
      Copyright © Lisk Ticketing {new Date().getFullYear()} <br/> PoC by
      <Link style={{color: "black"}} href="https://moosty.com"  target="_blank" rel="noopener noreferrer"> The Moosty Team</Link>.
    </span>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparant',
  },
  root: {
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
    borderRadius: 5,
    backgroundColor: 'white',
    border: 'none',
    '& .MuiFilledInput-root	': {

      border: 'none',
      borderRadius: 10,
      fontSize: '0.9rem',
      fontWeight: '600',
      backgroundColor: 'white!important',
    },
    '& .MuiFilledInput-underline:after ': {
      border: 'none',
    },
    '& .MuiFilledInput-underline:before ' : {
      border: 'none',
    },
    '& .MuiFormLabel-root.Mui-focused ' : {
      color: '#f50057',
    }
  },
}));

export const LogIn = withReducer('Login', reducer)(() => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const {updateChain} = useChain();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    setError("");
    const passphrase = `${username} ${password} ${username}`;
    const address = cryptography.getAddressFromPassphrase(passphrase);
    const account = await API.fetchAccountInfo(address.toString('hex'));

    if (account) {
      if (account?.organizer?.organization) {
        const organization = await API.fetchOrganizer(account.organizer.organization);
        dispatch(Actions.addOrganizer(organization));
      }
      dispatch(Actions.setAccount({...account, passphrase}));
      updateChain();
      history.push(`/overview`);
    } else {
      // setError('These credentials are not found on the blockchain');
    }
  }
  return (
    <div className="bg-fixed sm:bg-scroll bg-cover"
         style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "100vh"}}>
      <div className="w-full flex-auto h-full px-6" style={{backgroundColor: "#f50057"}}>
        <IconButton
          onClick={() => history.push(`/overview`)}
          aria-label="Close"
          color="inherit">
          <CloseIcon/>
        </IconButton>
        <div className={classes.paper}>
          <div className="mt-6 flex flex-col align-middle text-center justify-center items-center">
            <AccountBoxIcon style={{color: "white", fontSize: "4rem"}}/>
            <h1 className="text-2xl font-bold capitalize mt-4" style={{color:"#1a202c"}}>Log in</h1>
            <span className="text-sm font-medium text-white text-center pb-3">A fair ticketing system</span>
            <span className="text-sm font-medium font-bold text-gray-900 text-center pb-3">{error}</span>
          </div>
        </div>
        <div className="mx-4">
          <CssBaseline/>
          <div className={classes.paper}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  className={classes.field}
                  name="Username"
                  variant="filled"
                  required
                  fullWidth
                  id="firstName"
                  label="Username"
                  autoFocus

                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  inputProps={{
                    autoComplete: '',
                    form: {
                      autocomplete: 'off',
                    },
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  inputProps={{
                    autoComplete: 'new-password',
                    form: {
                      autocomplete: 'off',
                    },
                  }}
                />
              </Grid>
            </Grid>
            <Button
              style={{backgroundColor: "#1a202c"}}
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => login()}
              disabled={!password || !username}
            >
              Log In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  onClick={() => {
                    history.push('/signup')
                  }}
                  style={{color: "#1a202c"}} variant="body2">
                  Dont have an account yet? Create one!
                </Link>
              </Grid>
            </Grid>
          </div>
          <Box mt={5}>
            <Copyright/>
          </Box>
        </div>
      </div>
    </div>);
});
