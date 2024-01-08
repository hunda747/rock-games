import axios from "axios";

const localhost = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = false;
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const getShopOwners = (state, setState, dispatch, setLoader) => {
  console.log("fetching shop owner");
  setLoader(true);
  axios
    .get(
      `${localhost}/shop-owners`,
      config
    )
    .then((res) => {
      console.log(res);
      setState(res.data)
      // dispatch({
      //   type: "setCampaigns",
      //   payload: res.data,
      // });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "setShowSnackBar",
        payload: {
          show: true,
          message:
            err?.response?.data?.message || err?.message || "Network Error",
        },
      });
    })
    .finally(() => {
      console.log("end");
      setLoader(false);
    });
};

export const getShop = (state, setState, dispatch, setLoader) => {
  console.log("fetching shop owner");
  setLoader(true);
  axios
    .get(
      `${localhost}/shop`,
      config
    )
    .then((res) => {
      console.log(res);
      setState(res.data)
      // dispatch({
      //   type: "setCampaigns",
      //   payload: res.data,
      // });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "setShowSnackBar",
        payload: {
          show: true,
          message:
            err?.response?.data?.message || err?.message || "Network Error",
        },
      });
    })
    .finally(() => {
      console.log("end");
      setLoader(false);
    });
};

export const getCashier = (state, setState, dispatch, setLoader) => {
  console.log("fetching cashier");
  setLoader(true);
  axios
    .get(
      `${localhost}/cashiers`,
      config
    )
    .then((res) => {
      console.log(res);
      setState(res.data)
      // dispatch({
      //   type: "setCampaigns",
      //   payload: res.data,
      // });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "setShowSnackBar",
        payload: {
          show: true,
          message:
            err?.response?.data?.message || err?.message || "Network Error",
        },
      });
    })
    .finally(() => {
      console.log("end");
      setLoader(false);
    });
};


