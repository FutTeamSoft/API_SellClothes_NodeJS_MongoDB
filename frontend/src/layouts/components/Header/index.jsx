import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

import styles from "./Header.module.scss";
import config from "~/config";
import Button from "~/components/Button";
import { stateNavSelector, currentUserSelector } from "~/redux/selectors";
import { useState } from "react";
import authSlice from "~/pages/Authentication/authSlice";
import { Link, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stateNav = useSelector(stateNavSelector);
  const currentUser = useSelector(currentUserSelector);

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);

  const handleLogout = () => {
    toggleDropdown();
    dispatch(authSlice.actions.logout());
    navigate(config.routes.home);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={config.routes.home} className={cx("logo")}>
          {config.texts.logo}
        </Link>
        <div className={cx("action")}>
          <Row className={cx("action-nav")}>
            <Col>
              <Button
                selected={stateNav === config.routes.home}
                navigation
                to={config.routes.home}
              >
                {config.texts.home}
              </Button>
            </Col>
            <Col>
              <Button
                selected={stateNav === config.routes.products}
                navigation
                to={config.routes.products}
              >
                {config.texts.products}
              </Button>
            </Col>
            <Col>
              <Button
                selected={stateNav === config.routes.about}
                navigation
                to={config.routes.about}
              >
                {config.texts.about}
              </Button>
            </Col>
          </Row>
          <Row className={cx("action-icon")}>
            <Col>
              <Button to={config.routes.cart} className={cx("icon")}>
                <MdOutlineShoppingCart />
              </Button>
            </Col>
            <Col>
              {currentUser ? (
                <div>
                  <Button text onClick={toggleDropdown}>
                    {currentUser.FullName}
                  </Button>
                  {isOpenDropdown && (
                    <ul className={`${cx("dropdown-list")} shadow`}>
                      <li>
                        <Button
                          text
                          to={
                            config.routes.accountInformation +
                            currentUser.FullName
                          }
                          onClick={toggleDropdown}
                        >
                          {config.texts.accountInformation}
                        </Button>
                      </li>
                      <li>
                        <Button
                          text
                          to={config.routes.invoices}
                          onClick={toggleDropdown}
                        >
                          {config.texts.orderHistory}
                        </Button>
                      </li>
                      <hr />
                      <li>
                        <Button className="mx-auto" text onClick={handleLogout}>
                          {config.texts.logout}
                        </Button>
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Button to={config.routes.login} className={cx("icon")}>
                  <RxAvatar />
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </header>
  );
}

export default Header;
