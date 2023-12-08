// AddShopOwner.jsx
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddShopOwner = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    fname: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    fname: false,
    lastName: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const handleSave = () => {
    // Validate required fields
    const requiredFields = [
      "fname",
      "lastName",
      "username",
      "password",
      "confirmPassword",
    ];
    let isValid = true;
    const newError = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newError[field] = true;
        isValid = false;
      } else {
        newError[field] = false;
      }
    });

    // Validate password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      newError.password = true;
      newError.confirmPassword = "password must match";
      isValid = false;
    }

    // If there are validation errors, update the state and return
    if (!isValid) {
      setError(newError);
      return;
    }

    // Add your logic to handle the form data (e.g., send to an API)
    console.log(formData);
    handleClose();
  };

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });

    // Clear error when the user types something
    setError({ ...error, [field]: false });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Shop Owner</DialogTitle>
      <DialogContent>
        {/* Form Fields */}
        <TextField
          margin="normal"
          label="First Name"
          fullWidth
          variant="outlined"
          value={formData.fname}
          error={error.fname}
          onChange={handleChange("fname")}
        />
        <TextField
          margin="normal"
          label="Last Name"
          fullWidth
          variant="outlined"
          value={formData.lastName}
          error={error.lastName}
          onChange={handleChange("lastName")}
        />
        <TextField
          margin="normal"
          label="Username"
          fullWidth
          variant="outlined"
          value={formData.username}
          error={error.username}
          onChange={handleChange("username")}
        />
        <TextField
          margin="normal"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.password}
          error={error.password}
          onChange={handleChange("password")}
        />
        <TextField
          margin="normal"
          label="Confirm Password"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.confirmPassword}
          error={error.confirmPassword}
          helperText={error.confirmPassword && error.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddShopOwner;
