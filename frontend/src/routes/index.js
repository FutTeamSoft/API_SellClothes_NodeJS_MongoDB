import config from "~/config";
import Home from "~/pages/Home";
import products from "~/pages/Products";
import Login from "~/pages/Authentication/Login";
import Register from "~/pages/Authentication/Register";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.products, component: products },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
];

//Đăng nhập mới vào được không thì sẽ chuyển tới trang đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
