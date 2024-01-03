// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Manage shop owners",
    path: "/dashboard/manageShopOwner",
    icon: icon("ic_analytics"),
  },
  {
    title: "Manage shops",
    path: "/dashboard/manageShop",
    icon: icon("ic_user"),
  },
  {
    title: "Manage Cashiers",
    path: "/dashboard/campaign",
    icon: icon("ic_campaign"),
  },
  {
    title: "Cashier Limit",
    path: "/dashboard/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "Slip Detail",
    path: "/dashboard/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "Game result",
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

export default navConfig;
