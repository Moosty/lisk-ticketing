import React from 'react';
import Button from '@material-ui/core/Button';
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import * as Actions from "../store/actions";
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  button2: {
    backgroundColor: "#212121"
  },

  button1: {
    backgroundColor: "#f50057"
  },
}));


export const Header = ({title, subtitle, button1, button2, onClick1, onClick2, search}) => {
  const dispatch = useDispatch();
  const {open, type} = useSelector(({modals}) => modals);
  const history = useHistory();
  const classes = useStyles();

  return (
    <div style={{marginTop:"56px"}}>
      <div className="bg-fixed sm:bg-scroll bg-cover"
           style={{backgroundImage: "url(/images/bgTicketing.jpg)", height: "auto"}}>
        <div className="w-full flex-auto h-full" style={{backgroundColor: "#1a202c94"}}>
          <div className=" p-8 text-center md:p-12 lg:p-24 align-middle h-full flex flex-col justify-between">
            <h1 className="text-4xl leading-10 sm:text-3xl sm:text-center lg:text-5xl text-white font-extrabold">{title}</h1>
            <span className="my-2 text-xl text-center text-white">{subtitle}</span>
            {/*<div className=" flex-row justify-center ">*/}
            {/*  {button1 && <Button*/}
            {/*    onClick={onClick1}*/}
            {/*    variant="contained"*/}
            {/*    color="primary"*/}
            {/*    className={classes.button1}*/}
            {/*  >*/}
            {/*    {button1}*/}
            {/*  </Button>}*/}
            {/*  {button2 && <Button*/}
            {/*    onClick={onClick2}*/}
            {/*    variant="contained"*/}
            {/*    color="secondary"*/}
            {/*    className={classes.button2}*/}
            {/*    style={{marginLeft: 10}}>*/}
            {/*    {button2}*/}
            {/*  </Button>}*/}
            {/*</div>*/}
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search tickets…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={(e) => search(e.target.value)}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>);
};
