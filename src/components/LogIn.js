import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
  },
}));

export const LogIn = (props) => {
  const classes = useStyles();

  return ( 

    <div className="bg-fixed sm:bg-scroll bg-cover"
                style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "100vh"}}>
    <div className="w-full flex-auto h-full" style={{backgroundColor: "rgb(0 0 0 / 85%)"}}>
      <div className={classes.paper}>
    
      <Typography className={classes.h1} component="h1" variant="h5">
        Log In
      </Typography>
      </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Dont have an account yet? Create one!
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>

    </div>
      

  </div>

  );
}