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

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparant',
    paddingTop: '2em',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  h1: {
    padding: '1em',
    color: 'white',
  },
}));

const fields = {
  user: [
    {label: "username", path: "username", type: "text", variant: "filled"},
    {label: "password", path: "password", type: "password", variant: "filled"},
    {label: "", path: "address", type: "text", variant: "filled", disabled: true},
  ],
  organizer: [
    {label: "organization", path: "username", type: "text", variant: "filled"},
    {label: "password", path: "password", type: "password", variant: "filled"},
    {label: "", path: "address", type: "text", variant: "filled", disabled: true},
  ]
};

export const SignUp = withReducer("signUp", reducer)(({type}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const {createAccount} = useSelector(({blockchain}) => blockchain.account);
  const {loadEvents} = useEvent();
  const {loadTickets} = useTickets();
  const [form, setForm] = useState(createAccount);

  useEffect(() => {
    const {publicKey} = getAddressAndPublicKeyFromPassphrase(`${createAccount.username} ${createAccount.password} ${createAccount.username}`);
    // todo: check username availability
    setForm({...createAccount, address: getBase32AddressFromPublicKey(publicKey, "lsk")});
  }, [createAccount])

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
      <div className="w-full flex-auto h-full" style={{backgroundColor: "rgb(0 0 0 / 85%)"}}>
        <div className={classes.paper}>
          <img src="/images/logo-ticketing.png" alt="logo" width="250" height="300"/>
          <Typography className={classes.h1} component="h1" variant="h5">
            Sign Up
          </Typography>
        </div>
        <div className="flex flex-row w-9/10 flex-wrap m-2">
          {type && fields[type].map(field =>
            <FormField
              {...field}
              onChange={updateField}
              value={_.get(form, field.path)}/>)
          }
          <div className="flex flex-col">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => registerAccount()}
              disabled={!form.username || !form.password}
            >
              Sign Up {type === "organizer" && `as organizer`}
            </Button>
            <Link onClick={() => {
              type === "organizer" ? history.push('/signup') : history.push('/signup/organizer');
            }} variant="body2">
              Are you an {type === "organizer" ? `user` : `organizer`}? Sign up here!
            </Link>
            <br/>
            <Link onClick={() => history.push('/overview')} variant="body2">
              go back
            </Link>
          </div>
        </div>
      </div>
    </div>);
});

