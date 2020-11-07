import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {useHistory} from 'react-router-dom';
import * as Actions from "../store/actions";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";

function Copyright() {
  return (
    <span className="text-white text-center" style={{color: "white"}}>
      {'Copyright © '}

      Lisk Ticketing {new Date().getFullYear()} <br/> POC by <Link style={{color: "black"}} href="https://moosty.com"> The Moosty Team
      </Link>{' '}

      {'.'}
    </span>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(7),
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
  },
}));

export const LogIn = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (

    <div className="bg-fixed sm:bg-scroll bg-cover"
         style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "100vh"}}>
      <div className="w-full flex-auto h-full px-6" style={{backgroundColor: "#f50057"}}>
        <IconButton
          onClick={()=> history.push(`/overview`)}
          aria-label="Close"
          color="inherit">
          <CloseIcon/>
        </IconButton>
        <div className={classes.paper}>

          <div className="mt-6 flex flex-col align-middle text-center justify-center items-center">
            <AccountBoxIcon style={{color: "white", fontSize: "4rem"}}/>
            <h1 className="text-2xl font-bold text-black capitalize mt-4"> Log in </h1>
            <span className="text-sm font-medium text-white text-center">A fair ticketing system</span>
          </div>
        </div>
        <div className="mx-4">
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
                    autoFocus
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
                style={{backgroundColor: "black"}}
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={() =>
                  history.push(`/overview`)
                }
              >
                Log In
              </Button>
              <Grid container justify="flex-end">
                <Grid item>

                  <Link
                    onClick={() => {
                      history.push('/signup')
                    }}
                    style={{color: "black"}} variant="body2">
                    Dont have an account yet? Create one!
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright/>
          </Box>
        </div>

      </div>


    </div>

  );
}