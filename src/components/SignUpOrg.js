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
import {useHistory} from 'react-router-dom';
import * as Actions from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import withReducer from "../store/withReducer";
import reducer from "../store/reducers";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Lisk Ticketing {new Date().getFullYear()} | POC by The Moosty Team
      </Link>{' '}

      {'.'}
    </Typography>
  );
}

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

export const SignUpOrg = withReducer("signUpOrg", reducer)((props) => {
  const organiser = useSelector(({blockchain}) => blockchain.organiser);

  const classes = useStyles();
  const dispatch = useDispatch();

  const history = useHistory();

  const [form, setForm] = useState(organiser.createOrganiser);

  useEffect(() => {
    setForm(organiser.createOrganiser);
  }, [organiser])

  return (

    <div className="bg-fixed sm:bg-scroll bg-cover"
         style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "100vh"}}>
      <div className="w-full flex-auto h-full" style={{backgroundColor: "rgb(0 0 0 / 85%)"}}>
        <div className={classes.paper}>
          <img src="/images/logo-ticketing.png" alt="logo" width="250" height="300"/>
          <Typography className={classes.h1} component="h1" variant="h5">
            I am an organiser</Typography>
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
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.field}
                    autoComplete="fname"
                    name="Company name"
                    variant="filled"
                    required
                    fullWidth
                    id="companyname"
                    label="Company Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.field}
                    name="Location"
                    variant="filled"
                    required
                    fullWidth
                    id="location"
                    label="Location"
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
                    onChange={(e) => {
                      if (e.target.value.length <= 50) {
                        dispatch(Actions.updateCreateOrganiser('asset.username', e.target.value));
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
                    label="Password check"
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
                  history.push(`/organiser/1234342432ddxxxd`);
                  dispatch(Actions.addOrganiser(form));
                }}
              >
                Sign Up as Organiser
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link onClick={() => {
                    history.push('/signup')
                  }} variant="body2">
                    Are you a user? Sign up here!
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright/>
          </Box>
        </Container>

      </div>


    </div>

  );
});
