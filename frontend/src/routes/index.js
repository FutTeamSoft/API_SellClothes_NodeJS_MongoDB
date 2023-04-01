import config from "~/config";
import Home from "~/pages/Home";
import products from "~/pages/Products";

import Login from "~/pages/Authentication/Login";
import Register from "~/pages/Authentication/Register";
import AccountInformation from "~/pages/AccountInformation";
import ProductDetail from "~/pages/ProductDetail";
import Cart from "~/pages/Cart";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.products, component: products },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
  {
    path: config.routes.accountInformation + ":nameUser",
    component: AccountInformation,
  },
  {
    path: config.routes.products + "/:idProduct",
    component: ProductDetail,
  },
  { path: config.routes.cart, component: Cart },
];

//Đăng nhập mới vào được không thì sẽ chuyển tới trang đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
