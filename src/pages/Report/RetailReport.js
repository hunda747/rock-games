import { Container, Grid, MenuItem, Select, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { AppWidgetSummary } from "../../sections/@dashboard/app";

export default function RetailReport(params) {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid container spacing={3} sx={{ margin: '1rem 0' }}>
          <Grid item xl={4}>
            <Select fullWidth defaultValue={"today"}>
              <MenuItem value={"today"}>Today</MenuItem>
              <MenuItem value={"yesterday"}>Yesterday</MenuItem>
              <MenuItem value={""}>This Week</MenuItem>
            </Select>

          </Grid>
          <Grid item xl={4}>
            <input type="date" />
          </Grid>
          <Grid item xl={4}>
            <input type="date" />
          </Grid>
          {/* <Grid item></Grid> */}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Net Balance"
              total={6}
            // icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Tickets"
              total={10}
              color="error"
            // icon={"ant-design:bug-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Gross Stake"
              total={12355}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Claimed Winning"
              total={1723315}
              color="warning"
              icon={"ant-design:windows-filled"}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
