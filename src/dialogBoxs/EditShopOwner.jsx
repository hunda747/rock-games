// EditShopOwner.jsx
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { MenuItem, Select } from "@mui/material";
import axios from "axios";

const localhost = process.env.REACT_APP_API_URL;
const EditShopOwner = ({ open, setOpen, editItem, handleFetchData }) => {
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("effect");
    setFormData(editItem);
  }, []);

  const [formData, setFormData] = useState({});
  console.log("initail", editItem);
  console.log("form", formData);

  const [error, setError] = useState({
    name: false,
    username: false,
  });

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ["name", "username"];
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

    // If there are validation errors, update the state and return
    if (!isValid) {
      setError(newError);
      return;
    }

    // Add your logic to handle the form data (e.g., send to an API)
    axios
      .put(`${localhost}/shop-owners/${editItem.id}`, {
        name: formData.name,
        username: formData.username,
        status: formData.status || false,
      })
      .then((res) => {
        console.log(res);
        handleFetchData();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });

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
      <DialogTitle>Edit Shop Owner</DialogTitle>
      <DialogContent>
        {/* Form Fields */}
        <TextField
          margin="normal"
          label="Name"
          fullWidth
          variant="outlined"
          value={formData.name}
          error={error.name}
          onChange={handleChange("name")}
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
        <p style={{ margin: "0 5px" }}>status</p>
        <Select
          fullWidth
          defaultValue={"active"}
          value={formData.status ? 1 : 0}
          onChange={(e) => {
            console.log("value", e.target.value);
            setFormData({ ...formData, status: e.target.value });
          }}
        >
          <MenuItem value={1}>active</MenuItem>
          <MenuItem value={0}>inactive</MenuItem>
        </Select>
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

export default EditShopOwner;
