
import axios from 'axios';
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/scroll-to-top";
import { StyledChart } from "./components/chart";
// axiosConfig.js


// ----------------------------------------------------------------------

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:5500'
});

export default function App() {
  return (
    <ThemeProvider>
      {/* // <> */}
      <ScrollToTop />
      <StyledChart />
      <Router />
      {/* </> */}
    </ThemeProvider>
  );
}
