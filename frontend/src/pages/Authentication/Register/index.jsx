import classNames from "classnames/bind";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaLocationArrow,
  FaPhoneAlt,
} from "react-icons/fa";

import style from "../Authentication.module.scss";
import config from "~/config";
import imgAuthen from "~/assets/images/authenbackgroundImage.jpg";
import Button from "~/components/Button";
import { useEffect, useState } from "react";
import * as authServices from "~/services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messageRegister } from "~/redux/selectors";
import authSlice from "~/pages/Authentication/authSlice";

const cx = classNames.bind(style);

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repass, setRepass] = useState("");

  const warningMessage = useSelector(messageRegister);

  useEffect(() => {
    dispatch(authSlice.actions.registerSuccess({ message: null }));
    // eslint-disable-next-line
  }, []);

  const checkInfo = () => {
    var vnf_regex = /(09|03|07|08|05)+([0-9]{8})/;
    if (phone.length === 10) {
      if (vnf_regex.test(phone) === false) {
        dispatch(
          authSlice.actions.registerSuccess(
            config.texts.warningPhoneNumberIsNotInTheCorrectFormat
          )
        );
      } else {
        if (password === repass) {
          return {
            FullName: fullName,
            Email: email,
            PhoneNumber: phone,
            AddressUser: address,
            PasswordUser: password,
          };
        } else {
          dispatch(
            authSlice.actions.registerSuccess({
              message: config.texts.warningPasswordsAreNotTheSame,
            })
          );
        }
      }
    } else {
      dispatch(
        authSlice.actions.registerSuccess({
          message: config.texts.warningPhoneNumberIsNotInTheCorrectFormat,
        })
      );
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = checkInfo();

    if (newUser) {
      authServices.registerUser(newUser, dispatch, navigate);
    }
  };

  return (
    <div className={cx("background")}>
      <div className={`${cx("container-authenForm")} shadow`}>
        <div className={cx("cover")}>
          <img src={imgAuthen} alt="" />
        </div>
        <div className={cx("form-content")}>
          <div>
            <div className={cx("title")}>{config.texts.titleRegister}</div>
            <form className="input-boxes" onSubmit={handleRegister}>
              <div className={cx("input-box")}>
                <FaUser className={cx("icon")} />
                <input
                  type="text"
                  placeholder={config.texts.enterYourName}
                  name="fullName"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={cx("input-box")}>
                <FaEnvelope className={cx("icon")} />
                <input
                  type="email"
                  placeholder={config.texts.enterYourEmail}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={cx("input-box")}>
                <FaLocationArrow className={cx("icon")} />
                <input
                  type="text"
                  placeholder={config.texts.enterYourAddress}
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className={cx("input-box")}>
                <FaPhoneAlt className={cx("icon")} />
                <input
                  type="tel"
                  placeholder={config.texts.enterYourPhone}
                  name="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className={cx("input-box")}>
                <FaLock className={cx("icon")} />
                <input
                  type="password"
                  placeholder={config.texts.enterYourPassword}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className={cx("input-box")}>
                <FaLock className={cx("icon")} />
                <input
                  type="password"
                  placeholder={config.texts.confirmPassword}
                  name="repass"
                  onChange={(e) => setRepass(e.target.value)}
                  required
                />
              </div>

              {warningMessage && (
                <p className={cx("warning-text")}>{warningMessage} </p>
              )}

              <Button className={cx("button")} primary type="submit">
                {config.texts.buttonRegister}
              </Button>
              <div className={cx("textChangeScreen")}>
                <p>{config.texts.alreadyHaveAnAccount}</p>
                <Button text to={config.routes.login}>
                  {config.texts.loginNow}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
