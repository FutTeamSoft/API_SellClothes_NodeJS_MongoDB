import config from "~/config";
import Home from "~/pages/Home";

const publicRoutes = [{ path: config.routes.home, component: Home }];

//Đăng nhập mới vào được không thì sẽ chuyển tới trang đăng nhập
const privateRoutes = [];

export { publicRoutes, privateRoutes };
