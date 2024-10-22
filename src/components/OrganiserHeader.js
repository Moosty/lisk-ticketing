import React from 'react';
import Button from '@material-ui/core/Button';
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';


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


export const OrganiserHeader = ({name, balance, token, button1, button2, onClick1, onClick2}) => {

  const classes = useStyles();

  return (
    <div>
      <div className="bg-fixed sm:bg-scroll bg-cover"
           style={{backgroundImage: "url(/images/bgTicketing.jpg)", height: "auto"}}>
        <div className="w-full flex-auto h-full" style={{backgroundColor: "#1a202c94"}}>
          <div className=" p-8 text-center align-middle h-full flex flex-col justify-between">
            <h1 className="text-4xl leading-10 text-white font-extrabold">{name}</h1>
            <div  className="text-xl text-center text-white">{balance} {token}</div>


          </div>
        </div>
      </div>
    </div>);
};
