import { useState, createContext, useContext, useReducer } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
//
// import {  } from "react-router-dom";
import { campaignState, campaignReducer } from "../../hooks/campaignContext";

import Header from "./header";
import Nav from "./nav";

export const CampaignContext = createContext("");

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [data, dispatch] = useReducer(campaignReducer, campaignState);

  return token ? (
    // <Outlet />
    <CampaignContext.Provider value={{ data, dispatch }}>
      <StyledRoot>
        <Header onOpenNav={() => setOpen(true)} />

        <Nav openNav={open} onCloseNav={() => setOpen(false)} />

        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </CampaignContext.Provider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
