import classNames from "classnames/bind";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./AccountInformation.module.scss";
import config from "~/config";
import Button from "~/components/Button";
import { currentUserSelector, messageUpdate } from "~/redux/selectors";
import * as authServices from "~/services/authServices";
import authSlice from "../Authentication/authSlice";

const cx = classNames.bind(styles);

function AccountInformation() {
  const dispatch = useDispatch();

  const currentUser = useSelector(currentUserSelector);
  const updateMess = useSelector(messageUpdate);

  const [fullName, setFullName] = useState(currentUser.FullName);
  const [email, setEmail] = useState(currentUser.Email);
  const [address, setAddress] = useState(currentUser.AddressUser);
  const [phone, setPhone] = useState(currentUser.PhoneNumber);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repassNewPassword, setRepassNewPassword] = useState("");

  useEffect(() => {
    dispatch(authSlice.actions.updateSuccess({ message: null }));
    // eslint-disable-next-line
  }, []);

  const checkChangePassword = () => {
    if (oldPassword === "" && newPassword === "" && repassNewPassword === "") {
      return false;
    } else {
      return true;
    }
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const userInfo = {
      FullName: fullName,
      Email: email,
      PhoneNumber: phone,
      AddressUser: address,
    };
    if (checkChangePassword) {
      if (newPassword === repassNewPassword) {
        userInfo.PassNew = newPassword;
      }
      userInfo.PasswordUserOld = oldPassword;
    }
    authServices.updateUser(
      currentUser.id,
      userInfo,
      currentUser.token,
      dispatch
    );
  };

  return (
    <div className={cx("background")}>
      <div className={`${cx("wrapper")} shadow`}>
        <h2 className="text-left mb-5">
          {config.texts.titleAccountInformation}
        </h2>
        <form onSubmit={handleUpdateUser}>
          <Row className="justify-content-between">
            <Col md={5}>
              <div className={cx("group-infor")}>
                <p>{config.texts.labelFullName}</p>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={cx("group-infor")}>
                <p>{config.texts.labelMail}</p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={cx("group-infor")}>
                <p>{config.texts.labelPhoneNumber}</p>
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className={cx("group-infor")}>
                <p>{config.texts.labelAddress}</p>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </Col>
            <Col md={5}>
              <p className={cx("title-content-wrap")}>
                {config.texts.titleChangePassword}
              </p>
              <div className={cx("group-infor")}>
                <p>{config.texts.labelOldPassword}</p>
                <input
                  type="password"
                  name="oldPass"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className={cx("group-infor")}>
                <p>{config.texts.labelNewPassword}</p>
                <input
                  type="password"
                  name="newPass"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className={cx("group-infor")}>
                <p>{config.texts.labelReNewPassword}</p>
                <input
                  type="password"
                  name="reNewPass"
                  onChange={(e) => setRepassNewPassword(e.target.value)}
                />
              </div>
              {updateMess && <p className="mt-4">{updateMess}</p>}
              <div className={cx("group-button")}>
                <Button outline to={config.routes.home}>
                  {config.texts.home}
                </Button>
                <Button primary type="submit">
                  {config.texts.save}
                </Button>
              </div>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
}

export default AccountInformation;
