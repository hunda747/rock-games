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
const EditShop = ({ open, setOpen, editItem, handleFetchData }) => {
  const [owner, setOwner] = useState([]);

  const handleFetchShopOwner = () => {
    axios
      .get(`${localhost}/shop-owners`)
      .then((res) => {
        console.log(res);
        setOwner(res.data);
      })
      .catch((err) => {
        console.log(err);
        // dispatch({
        //   type: "setShowSnackBar",
        //   payload: {
        //     show: true,
        //     message:
        //       err?.response?.data?.message || err?.message || "Network Error",
        //   },
        // });
      })
      .finally(() => {
        console.log("end");
      });
  };

  useEffect(() => {
    handleFetchShopOwner();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("effect");
    setFormData(editItem);
  }, []);

  const [formData, setFormData] = useState({});
  // console.log("initail", editItem);
  // console.log(formData);

  const [error, setError] = useState({
    name: false,
    username: false,
  });

  const handleSave = () => {
    // Validate required fields
    const requiredFields = [
      "name",
      "status",
      "shopOwnerId",
      "location",
      "cashierLimit",
      "maxStake",
      "minStake",
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

    // If there are validation errors, update the state and return
    if (!isValid) {
      setError(newError);
      return;
    }

    console.log("going to axios");
    // Add your logic to handle the form data (e.g., send to an API)
    axios
      .put(`${localhost}/shop/${editItem.id}`, {
        ...(formData.name && { name: formData.name }),
        ...(formData.shopOwnerId && { shopOwnerId: formData.shopOwnerId }),
        ...(formData.status && { status: formData.status }),
        ...(formData.location && { location: formData.location }),
        ...(formData.cashierLimit && { cashierLimit: formData.cashierLimit }),
        ...(formData.maxStake && { maxStake: formData.maxStake }),
        ...(formData.minStake && { minStake: formData.minStake }),
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
      <DialogTitle>Edit Shop</DialogTitle>
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
        <p style={{ margin: "0 5px", fontSize: "12px" }}>Shop Owner</p>
        <Select
          fullWidth
          defaultValue={0}
          value={formData.shopOwnerId}
          onChange={handleChange("shopOwnerId")}
        >
          <MenuItem value={0}>Choose Owner</MenuItem>
          {owner.map((own) => (
            <MenuItem value={own.id}>{own.name}</MenuItem>
          ))}
        </Select>
        <p style={{ margin: "0 5px", fontSize: "12px" }}>status</p>
        <Select
          fullWidth
          value={formData.status}
          onChange={handleChange("status")}
        >
          <MenuItem value="active">active</MenuItem>
          <MenuItem value="inactive">inactive</MenuItem>
        </Select>
        <TextField
          margin="normal"
          label="Location"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.location}
          error={error.location}
          onChange={handleChange("location")}
        />
        <TextField
          margin="normal"
          label="Cashier Limit"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.cashierLimit}
          error={error.cashierLimit}
          onChange={handleChange("cashierLimit")}
        />
        <TextField
          margin="normal"
          label="Max Stake"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.maxStake}
          error={error.maxStake}
          onChange={handleChange("maxStake")}
        />
        <TextField
          margin="normal"
          label="Min Stake"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.minStake}
          error={error.minStake}
          onChange={handleChange("minStake")}
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

export default EditShop;
