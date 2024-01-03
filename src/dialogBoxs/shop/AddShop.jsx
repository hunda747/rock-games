// AddShop.jsx
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

const AddShop = ({ open, setOpen, handleFetchData }) => {
  const [owner, setOwner] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

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

  const [formData, setFormData] = useState({
    shopOwnerId: 0,
    name: "",
    location: "",
    status: "",
  });

  const [error, setError] = useState({
    shopOwnerId: false,
    name: false,
    location: false,
    status: false,
  });

  const handleSave = () => {
    // Validate required fields
    const requiredFields = ["shopOwnerId", "name", "location"];
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
      .post(`${localhost}/shop`, {
        name: formData.name,
        shopOwnerId: formData.shopOwnerId,
        location: formData.location,
        status: formData.status,
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
      <DialogTitle>Add Shop Owner</DialogTitle>
      <DialogContent>
        {/* Form Fields */}
        <p style={{ margin: "0 5px", fontSize: "12px" }}>Shop Owner</p>
        <Select
          fullWidth
          defaultValue={0}
          onChange={handleChange("shopOwnerId")}
        >
          <MenuItem value={0}>Choose Owner</MenuItem>
          {owner.map((own) => (
            <MenuItem value={own.id}>{own.name}</MenuItem>
          ))}
        </Select>
        <TextField
          margin="normal"
          label="First Name"
          fullWidth
          variant="outlined"
          value={formData.name}
          error={error.name}
          onChange={handleChange("name")}
        />
        <p style={{ margin: "0 5px", fontSize: "12px" }}>status</p>
        <Select
          fullWidth
          defaultValue={"active"}
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

export default AddShop;
