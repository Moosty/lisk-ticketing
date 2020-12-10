import React, { useEffect, useState } from 'react';
import Fab from "@material-ui/core/Fab";
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import clsx from "clsx";
import withReducer from "../../store/withReducer";
import reducer from "store/reducers";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import * as Actions from "../../store/actions";
import { addTx } from "../../store/actions";
import { API } from "../../utils";
import { useChain } from "../../utils/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  success: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  error: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
}));
export const TransactionModal = withReducer('transactionModal', reducer)(({id, loading, success, error, onConfirmation, multi}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {updateChain} = useChain();
  const [confirmation, setConfirmation] = useState(false);
  const [multiConfirmation, setMultiConfirmation] = useState([]);

  useEffect(() => {
    const fetchTransaction = async (i) => {
      const tx = await API.fetchTransaction(id);
      if (tx?.data) {
        dispatch(addTx(tx.data));
        updateChain();
        setConfirmation(true);
        setTimeout(() => {
          dispatch(Actions.closeModal())
          onConfirmation();
        }, 1300);
      } else {
        if (i < 30) {
          setTimeout(() => fetchTransaction(i + 1), 1000);
        }
      }
    }

    if (id && !multi) {
      fetchTransaction(0);
    }
  }, [id, multi]);

  useEffect(() => {
    const fetchMultiTransaction = async (i, id) => {
      const tx = await API.fetchTransaction(id);
      if (tx?.data) {
        dispatch(addTx(tx.data));
        const multiConfirms = multiConfirmation;
        multiConfirms[multi.findIndex(tx => tx.id === id)] = true;
        setMultiConfirmation(multiConfirms);
        if (multiConfirms.findIndex(tx => tx === false) === -1) {
          setTimeout(() => {
            dispatch(Actions.closeModal())
            onConfirmation();
          }, 1300);
        } else {
          fetchMultiTransaction(0, multi[multiConfirmation.findIndex(tx => tx === false)]?.id);
        }
      } else {
        if (i < 30) {
          setTimeout(() => fetchMultiTransaction(i + 1, id), 1000);
        }
      }
    }

    if (multi) {
      if (multiConfirmation.length === 0) {
        setMultiConfirmation([...multi].fill(false, 0, multi.length));
      } else {
        fetchMultiTransaction(0, multi[multiConfirmation.findIndex(tx => tx === false)]?.id);
      }
    }
  }, [multi, multiConfirmation]);

  const buttonClassname = clsx({
    [classes.success]: success,
    [classes.error]: !!error,
  });

  return (
    <div className="w-full flex h-full bg-gray-900 flex-col items-center p-4 pt-16">
      <div className={classes.wrapper}>
        <Fab aria-label="save" color="secondary" className={buttonClassname}>
          {success || confirmation ? <CheckIcon/> : !!error ? <ReportProblemIcon/> : <SaveIcon/>}
        </Fab>
        {loading && !confirmation && <CircularProgress size={68} className={classes.fabProgress}/>}
      </div>
      {loading && !confirmation && <div className="flex flex-col my-4">
        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
          Awaiting confirmation blockchain
        </div>
        <div className="flex flex-col text-center flex font-normal text-sm text-white my-2">
          <div>Please wait until confirmation from the blockchain is received. This can take up to 10 seconds.</div>
        </div>
      </div>}
      {confirmation && <div className="flex flex-col my-4">
        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
          Transaction confirmed!
        </div>
      </div>}
      {!confirmation && error && error.length > 0 && <div className="flex flex-col my-4">
        <div className="text-center flex1 text-2xl text-white font-bold uppercase max-w-2xl">
          Something went wrong!
        </div>
        <div className="flex flex-col text-center flex font-normal text-sm text-white my-2">
          {error.map(e => <div className="text-red-600">{e.message}</div>)}
        </div>
        <div className="flex flex-row justify-around mt-2">
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            className="m-4"
            onClick={() => {
              dispatch(Actions.closeModal())
            }}
          >
            go back
          </Button>
        </div>
      </div>}
    </div>);
});
