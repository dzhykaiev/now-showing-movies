import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

interface Props {
  label: string;
  value: number | number[];
  change: (value: number | number[]) => void;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  p: {
    fontFamily: "Comic Neue, cursive",
  },
  slider: {
    color: "#01b4e4",
  },
});

function valuetext(value: number) {
  return `${value}°C`;
}

const RangeField: React.FC<Props> = (props): JSX.Element => {
  const classes = useStyles();
  const onChangeHandler = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    props.change(value);
  };
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom className={classes.p}>
        {props.label}
      </Typography>
      <Slider
        className={classes.slider}
        defaultValue={props.value}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={0.5}
        marks
        min={0}
        max={10}
        onChange={onChangeHandler}
      />
    </div>
  );
};
export default RangeField;
