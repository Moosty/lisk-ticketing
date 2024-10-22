import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getAddressAndPublicKeyFromPassphrase, getBase32AddressFromPublicKey } from '@liskhq/lisk-cryptography';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import { FormField } from "components/FormField";
import withReducer from "store/withReducer";
import reducer from "store/reducers";
import * as Actions from "store/actions";
import { createTransaction, Schema } from "../../utils/transactions";
import { fetchAccountInfo, sendTransactions } from "../../utils/api";
import { cryptography } from "@liskhq/lisk-client";
import { useEvent, useTickets } from "../../utils/hooks";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparant',
    paddingTop: '2em',
  },
  root: {
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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h1: {
    padding: '1em',
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


export const SignUp = withReducer("signUp", reducer)(({type}) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const {createAccount} = useSelector(({blockchain}) => blockchain.account);
  const {loadEvents} = useEvent();
  const {loadTickets} = useTickets();
  const [form, setForm] = useState(createAccount);
  const [errors, setErrors] = useState([])

  const fields = {
    user: [
      {label: "username", path: "username", type: "text", variant: "filled", min: 3, limit: 20, className:classes.field},
      {label: "password", path: "password", type: "password", variant: "filled", min: 3, className:classes.field},
      {label: "", path: "address", type: "text", variant: "filled", disabled: true, className:classes.field},
    ],
    organizer: [
      {label: "organization", path: "username", type: "text", variant: "filled", min: 3, limit: 20, className:classes.field},
      {label: "password", path: "password", type: "password", variant: "filled", min: 3, className: classes.field},
      {label: "", path: "address", type: "text", variant: "filled", disabled: true, className:classes.field},
    ]
  };

  useEffect(() => {
    console.log(errors)
  },[errors])

  useEffect(() => {
    const {publicKey} = getAddressAndPublicKeyFromPassphrase(`${createAccount.username} ${createAccount.password} ${createAccount.username}`);
    // todo: check username availability
    setForm({...createAccount, address: getBase32AddressFromPublicKey(publicKey, "lsk")});
  }, [createAccount])

  const changeError = (key, error) => {
    if (error) {
      setErrors([...errors?.filter(e => e !== key), key]);
    } else {
      setErrors(errors?.filter(e => e !== key));
    }
  }

  const updateField = (path, value) => dispatch(Actions.updateCreateAccount(path, value));

  const registrationConfirmed = async () => {
    const passphrase = `${createAccount.username} ${createAccount.password} ${createAccount.username}`;
    const address = cryptography.getAddressFromPassphrase(passphrase);
    const account = await fetchAccountInfo(address.toString('hex'));
    loadEvents();
    loadTickets();
    // loadMarket();
    // todo get tickets, get events, get organizations
    dispatch(Actions.setAccount({ ...account, passphrase }));
    history.push(`/overview`);
  }

  const registerAccount = async () => {
    let transaction = null;
    const passphrase =`${createAccount.username} ${createAccount.password} ${createAccount.username}`;
      if (type === "organizer") {
      transaction = await createTransaction({
        moduleId: 1000,
        assetId: 0,
        fee: '0.01',
        assets: {
          organization: form.username,
        },
        passphrase,
        schema: Schema.createOrganizerSchema,
      });
    } else if (type === "user") {
      transaction = await createTransaction({
        moduleId: 6666,
        assetId: 100,
        fee: '0.01',
        assets: {
          username: form.username,
        },
        passphrase,
        schema: Schema.sprinklerSchema,
      });
    }
    dispatch(Actions.openModal('transactionModal', {
      id: transaction?.id,
      success: false,
      loading: true,
      onConfirmation: registrationConfirmed
    }));
    const result = await sendTransactions(transaction?.tx);

    if (result.errors) {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: false,
        error: result.errors,
        onConfirmation: registrationConfirmed
      }));
    } else {
      dispatch(Actions.openModal('transactionModal', {
        id: transaction?.id,
        success: false,
        loading: true,
        onConfirmation: registrationConfirmed
      }));
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
          <Typography className={classes.h1} component="h1" variant="h5">
            Sign Up
          </Typography>
        </div>
        <div className="flex flex-row w-9/10 flex-wrap m-2">
          {type && fields[type].map(field =>
            <FormField
              {...field}
              errors={errors}
              changeError={(key, error) => changeError(key, error)}
              onChange={updateField}
              value={_.get(form, field.path)}/>)
          }
          <div className="flex flex-col w-full">
            <Button
                style={{backgroundColor: "#1a202c", color:"white"}}
                type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => registerAccount()}
              disabled={errors?.length > 0}
            >
              Sign Up {type === "organizer" && `as organizer`}
            </Button>
            <Link onClick={() => {
              type === "organizer" ? history.push('/signup') : history.push('/signup/organizer');
            }}  style={{color: "black"}}  variant="body2">
              Are you an {type === "organizer" ? `user` : `organizer`}? Sign up here!
            </Link>
            <br/>
            <Link onClick={() => history.push('/overview')}   style={{color: "black"}}  variant="body2">
              go back
            </Link>
          </div>
        </div>
      </div>
    </div>);
});

