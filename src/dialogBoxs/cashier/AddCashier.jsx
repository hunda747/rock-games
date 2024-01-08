// AddCashier.jsx
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";

const localhost = process.env.REACT_APP_API_URL;

const AddCashier = ({ open, setOpen, handleFetchData }) => {
  const [owner, setOwner] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleFetchShop = () => {
    axios
      .get(`${localhost}/shop`)
      .then((res) => {
        console.log(res);
        setOwner(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("end");
      });
  };

  useEffect(() => {
    handleFetchShop();
  }, []);

  const [formData, setFormData] = useState({
    shopId: 0,
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    shopId: false,
    name: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const handleSave = () => {
    console.log(formData);
    // Validate required fields
    const requiredFields = [
      "shopId",
      "name",
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

    console.log("savig", isValid);
    console.log("savig", newError);

    // If there are validation errors, update the state and return
    if (!isValid) {
      setError(newError);
      return;
    }
    // Add your logic to handle the form data (e.g., send to an API)
    axios
      .post(`${localhost}/cashiers`, {
        name: formData.name,
        shopId: formData.shopId,
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        console.log(res);
        handleFetchData();
        setFormData({
          shopId: 0,
          name: "",
          username: "",
          password: "",
        });
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
      <DialogTitle>Add Cashier </DialogTitle>
      <DialogContent>
        {/* Form Fields */}
        <p
          style={{
            margin: "0 5px",
            fontSize: "12px",
            color: error.shopId ? "red" : "black",
          }}
        >
          Shop
        </p>
        <Select
          fullWidth
          defaultValue={0}
          onChange={(e) => setFormData({ ...formData, shopId: e.target.value })}
        >
          <MenuItem value={0}>Choose shop</MenuItem>
          {owner.map((own) => (
            <MenuItem value={own.id}>{own.name}</MenuItem>
          ))}
        </Select>
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
          type="text"
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

export default AddCashier;
