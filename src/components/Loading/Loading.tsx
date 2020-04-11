import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "50px",
      margin: "20px",
      justifyContent: "center",
      display: "flex",
      color: "#01b4e4",
    },
  })
);

export default function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress color="inherit" />
    </div>
  );
}
