import { Container, Grid, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { AppWidgetSummary } from "../../sections/@dashboard/app";

export default function RetailReport(params) {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Active Campaigns"
              total={6}
            // icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total Campaigns"
              total={10}
              color="error"
            // icon={"ant-design:bug-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Number of transactions"
              total={12355}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Total amount collected"
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
