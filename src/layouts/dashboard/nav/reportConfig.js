// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navReportConfig = [
  {
    title: "Retail Report",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "Cashiers Report",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  {
    title: "Slips Report",
    path: "/dashboard/blog",
    icon: icon("ic_blog"),
  },
  // {
  //   title: "login",
  //   path: "/login",
  //   icon: icon("ic_lock"),
  // },
  // {
  //   title: "Not found",
  //   path: "/404",
  //   icon: icon("ic_disabled"),
  // },
];


export default navReportConfig;
