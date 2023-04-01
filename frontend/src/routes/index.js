import config from "~/config";
import Home from "~/pages/Home";
import products from "~/pages/Products";
import About from "~/pages/About";
import ProductDetail from "~/pages/ProductDetail";
import Login from "~/pages/Authentication/Login";
import Register from "~/pages/Authentication/Register";
import AccountInformation from "~/pages/AccountInformation";
import Cart from "~/pages/Cart";
import Invoices from "~/pages/Invoices";
import InvoiceDetail from "~/pages/InvoiceDetail";
import Checkout from "~/pages/Checkout";
import OrderNotice from "~/pages/OrderNotice";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.products, component: products },
  {
    path: config.routes.products + "/:idProduct",
    component: ProductDetail,
  },
  { path: config.routes.about, component: About },
  { path: config.routes.login, component: Login },
  { path: config.routes.register, component: Register },
  {
    path: config.routes.accountInformation + ":nameUser",
    component: AccountInformation,
  },
  { path: config.routes.cart, component: Cart },
  { path: config.routes.invoices, component: Invoices },
  {
    path: config.routes.invoices + "/:idInvoice",
    component: InvoiceDetail,
  },
  { path: config.routes.checkout, component: Checkout },
  { path: config.routes.orderNotice, component: OrderNotice },
];

//Đăng nhập mới vào được không thì sẽ chuyển tới trang đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
