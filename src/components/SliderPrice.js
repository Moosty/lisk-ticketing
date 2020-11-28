import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const PrettoSlider = withStyles({
  root: {
    color: '#f50057',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);


export const SliderPrice = ({reSellPercentage, changeSlider}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className="text-lg mt-4 font-bold" >Set your price</h1>
      <div>The organiser set the maximum resell price to <span className="font-bold text-pink-400">{reSellPercentage}% </span>of the original price.</div>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={reSellPercentage < 100 ? reSellPercentage : 100}
        min={10}
        max={reSellPercentage}
        onChange={changeSlider}
      />
      <div className={classes.margin} />
    </div>
  );
}
