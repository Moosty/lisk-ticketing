import React, {useEffect, useState} from "react";
import {FormField} from "components/FormField";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import withReducer from "../../store/withReducer";
import reducer from "../../store/reducers";
import * as Actions from "../../store/actions";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import {useHistory} from 'react-router-dom';

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


const fields = [
  {label: "username", path: "asset.username", type: "text", variant: "filled"},
  {label: "password", path: "asset.password", type: "password", variant: "filled"},
  {label: "address", path: "address", type: "text", variant: "filled"},
];

const orgFields = [
  {label: "organisation", path: "asset.organisation", type: "text", variant: "filled"},
  {label: "firstName", path: "asset.firstName", type: "text", variant: "filled"},
  {label: "lastname", path: "asset.lastName", type: "text", variant: "filled"},
  {label: "password", path: "asset.password", type: "password", variant: "filled"},
  {label: "address", path: "address", type: "text", variant: "filled"},
];

export const SignUp = withReducer("signUp", reducer)((props) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const account = useSelector(({blockchain}) => blockchain.account);
  const [form, setForm] = useState(account.createAccount);

  useEffect(() => {
    setForm(account.createAccount);
  }, account)


  const organiser = useSelector(({blockchain}) => blockchain.organiser);
  const [form2, setForm2] = useState(organiser.createOrganiser);

  useEffect(() => {
    setForm2(organiser.createOrganiser);
  }, organiser)

  const updateField = (path, value) => dispatch(Actions.updateCreateAccount(path, value));
  const updateField2 = (path, value) => dispatch(Actions.updateCreateOrganiser(path, value));


  return <div className="bg-fixed sm:bg-scroll bg-cover"
              style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "100vh"}}>

    <div className="bg-fixed sm:bg-scroll bg-cover"
         style={{backgroundImage: "url(/images/bgEvent.jpeg)", height: "100vh"}}>
      <div className="w-full flex-auto h-full" style={{backgroundColor: "rgb(0 0 0 / 85%)"}}>
        <div className={classes.paper}>
          <img src="/images/logo-ticketing.png" alt="logo" width="250" height="300"/>
          <Typography className={classes.h1} component="h1" variant="h5">
            Sign Up </Typography>
        </div>

        {/*{ props.type === 'organiser' && <SignUpOrg/> }*/}

        <form
          className="flex flex-row w-9/10 flex-wrap m-2 "
          noValidate
          autoComplete="off"
        >
          {/*START - FORM USER */}
          {props.type === 'user' && fields.map(field => <FormField {...field} onChange={updateField}
                                                                   value={_.get(form, field.path)}/>)}
          {/*START - FORM ORGANISER */}
          {props.type === 'organiser' && orgFields.map(field => <FormField {...field} onChange={updateField2}
                                                                           value={_.get(form2, field.path)}/>)}
          {/*START - BUTTON USER */}

          {props.type === 'user' && <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => {
                console.log("form",{form});
                console.log("accounts:", account);
                history.push(`/account/account03`);
                dispatch(Actions.addAccount(form));
              }}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link onClick={() => {
                  history.push('/signup/')
                }} variant="body2">
                  Are you an organiser? Sign up here!
                </Link>
              </Grid>
            </Grid>
          </div>}

          {/*START - BUTTON ORGANISER */}

          {props.type === 'organiser' && <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => {
                console.log("formulier", {form2});
                console.log("organiserAccounts:", organiser);
                history.push(`/organiser/organiser03`);
                dispatch(Actions.addOrganiser(form2));
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
          </div>}

        </form>


      </div>
    </div>

  </div>;


});

