import Home from "~/pages/Home";
import Following from "~/pages/Following";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/following", component: Following, layout: null },
];

//Đăng nhập mới vào được không thì sẽ chuyển tới trang đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
