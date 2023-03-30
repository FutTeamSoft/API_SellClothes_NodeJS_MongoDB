import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { MdSearch, MdOutlineShoppingCart } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import styles from "./Header.module.scss";
import config from "~/config";
import Button from "~/components/Button";
import { stateNavSelector } from "~/redux/selectors";
import headerSlice from "./headerSlice";

const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();

  const stateNav = useSelector(stateNavSelector);

  const handleChangeNav = (data) => {
    dispatch(headerSlice.actions.navigationChange(data));
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <label className={cx("logo")}>{config.texts.logo}</label>
        <div className={cx("action")}>
          <div className={cx("action-nav")}>
            <Button
              keepActive={stateNav === config.texts.home}
              navigation
              to={config.routes.home}
              onClick={() => {
                handleChangeNav(config.texts.home);
              }}
            >
              {config.texts.home}
            </Button>
            <Button
              keepActive={stateNav === config.texts.product}
              navigation
              to={config.routes.product}
              onClick={() => {
                handleChangeNav(config.texts.product);
              }}
            >
              {config.texts.product}
            </Button>
            <Button
              keepActive={stateNav === config.texts.about}
              navigation
              to={config.routes.about}
              onClick={() => {
                handleChangeNav(config.texts.about);
              }}
            >
              {config.texts.about}
            </Button>
          </div>
          <div className={cx("action-icon")}>
            <Button className={cx("icon")}>
              <MdSearch />
            </Button>
            <Button className={cx("icon")}>
              <MdOutlineShoppingCart />
            </Button>
            <Button to={config.routes.about} className={cx("icon")}>
              <RxAvatar />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
