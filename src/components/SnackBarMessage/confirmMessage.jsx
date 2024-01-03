import React, { useContext, useState, useEffect } from "react";

import { Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { CampaignContext } from "../../layouts/dashboard/DashboardLayout";

const useStyles = makeStyles({
  biggerAlert: {
    fontSize: "18px", // Increase the font size
    padding: "1.5rem", // Increase the padding
    fontWeight: "bold", // Add bold font weight
    // Add any additional styles you want to customize
  },
});

export default function ConfirmMessage({ error, message }) {
  // const { data, dispatch } = useContext(UserContext);
  const { data, dispatch } = React.useContext(CampaignContext);
  console.log("data", data);
  const vertical = "top";
  const horizontal = "center";
  const classes = useStyles();

  const handleClose = () => {
    dispatch({
      type: "setShowSnackBar",
      payload: {
        show: false,
        message: "",
      },
    });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={data?.showSnackBar?.show}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        className={classes.biggerAlert}
        severity={"error"}
        // severity={data?.showSnackBar?.error ? "error" : "success"}
        sx={{ width: "100%" }}
      >
        {data?.showSnackBar?.message}
      </Alert>
    </Snackbar>
  );
}
