import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { MdKeyboardArrowRight, MdLocationPin } from "react-icons/md";

import styles from "./About.module.scss";
import { useChangeStateNav } from "~/hooks";
import config from "~/config";
import imgAboutUs from "~/assets/images/aboutImage.png";
import imgDinhPhucDev from "~/assets/images/dinhphucDevImage.jpg";
import imgVanTuanDev from "~/assets/images/vantuanDevImage.jpg";
import imgLuongLinhDev from "~/assets/images/luonglinhDevImage.jpg";
import { Col, Row } from "react-bootstrap";
import { FaClock, FaEnvelope, FaPhone } from "react-icons/fa";

const cx = classNames.bind(styles);

function About() {
  const location = useLocation();
  useChangeStateNav(location);
  return (
    <div className={cx("background")}>
      <div className={cx("breadcrumb")}>
        <div className={cx("breadcrumb-inner")}>
          <Link to={config.routes.home}>{config.texts.home}</Link>
          <MdKeyboardArrowRight />
          <p>{config.texts.about}</p>
        </div>
      </div>
      <div className={cx("inner")}>
        <h2 className={cx("heading")}>{config.texts.titleAboutPage}</h2>

        <Row>
          <Col sm={7} className={cx("wrap-info")}>
            <p className={cx("title")}>{config.texts.logo}</p>
            <p>{config.texts.websiteDescription}</p>
            <p className={cx("title")}>{config.texts.titleMyTeam}</p>
            <div className={cx("wrap-member")}>
              <div className={cx("member")}>
                <img src={imgDinhPhucDev} alt="" />
                <p>Lê Đình Phúc</p>
                <p>{config.texts.jobPositionFrontend}</p>
              </div>
              <div className={cx("member")}>
                <img src={imgLuongLinhDev} alt="" />
                <p>Mã Lương Linh</p>
                <p>{config.texts.jobPositionBackend}</p>
              </div>
              <div className={cx("member")}>
                <img src={imgVanTuanDev} alt="" />
                <p>Nguyễn Văn Tuấn</p>
                <p>{config.texts.jobPositionBackend}</p>
              </div>
            </div>
          </Col>
          <Col sm={5}>
            <img width="100%" src={imgAboutUs} alt="" />
          </Col>
        </Row>

        <div className={cx("wrap-contact")}>
          <p className={cx("title")}>{config.texts.titleContact}</p>
          <Row>
            <Col sm={6} md={3} className={cx("contact-item")}>
              <FaPhone className={cx("contact-img")} />
              <p>{config.texts.phoneContact}</p>
              <p>+84-399-128-713</p>
            </Col>
            <Col sm={6} md={3} className={cx("contact-item")}>
              <MdLocationPin className={cx("contact-img")} />
              <p>{config.texts.addressContact}</p>
              <p>KCNC Quận 9 Hồ Chí Minh</p>
            </Col>
            <Col sm={6} md={3} className={cx("contact-item")}>
              <FaClock className={cx("contact-img")} />
              <p>{config.texts.openTimeContact}</p>
              <p>09:00 am to 20:00 pm</p>
            </Col>
            <Col sm={6} md={3} className={cx("contact-item")}>
              <FaEnvelope className={cx("contact-img")} />
              <p>{config.texts.emailContact}</p>
              <p>fteam@gmail.com</p>
            </Col>
          </Row>
        </div>

        <div className="mb-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5472917264988!2d106.81273301531651!3d10.845915160871744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273506d4db9f%3A0x2f839ae95bec1682!2zNTQgxJDGsOG7nW5nIHPhu5EgMTJELCBMb25nIFRo4bqhbmggTeG7uSwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1679893524277!5m2!1svi!2s"
            title="hihi"
            width="100%"
            height="450"
            style={{
              border: 0,
              allowfullscreen: "",
              loading: "lazy",
              referrerpolicy: "no-referrer-when-downgrade",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default About;
