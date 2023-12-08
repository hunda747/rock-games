import axios from "axios";

const localhost = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = false;
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

export const getCampaignByState = (state, dispatch) => {
  console.log("fetching campaigns");
  axios
    .get(
      `http://${localhost}/api/campaigns/getCampaignsByStage/${state}`,
      config
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: "setCampaigns",
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("end");
    });
};

export const getCampaignById = (id, dispatch, setCampaigns) => {
  dispatch({
    type: "setLodingState",
    payload: true,
  });
  // console.log(id);
  axios
    .get(`http://${localhost}/api/campaigns/getCampaignById/${id}`, config)
    .then((res) => {
      console.log(res.data);
      setCampaigns(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    })
    .finally(() => {
      dispatch({
        type: "setLodingState",
        payload: false,
      });
    });
};
