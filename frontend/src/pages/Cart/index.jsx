import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import { currentUserSelector } from "~/redux/selectors";
import styles from "./Cart.module.scss";
import TableProducts from "./components/TableProducts";
import TableTotalPrice from "./components/TableTotalPrice";
import * as cartServices from "~/services/cartServices";
import config from "~/config";

const cx = classNames.bind(styles);

function Cart() {
  const currentUser = useSelector(currentUserSelector);

  const [warningMessage, setWarningMessage] = useState("");
  const [listCart, setListCart] = useState([]);

  const fetchAllCartByIdUser = async () => {
    const listCart = await cartServices.getAllCartByIdUser(currentUser.id);
    setListCart(listCart);
  };

  let VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    if (currentUser) {
      fetchAllCartByIdUser();
    } else {
      setWarningMessage(config.texts.warningSignInToViewCart);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const handleClearCart = () => {
    const fetchClearCart = async () => {
      const response = await cartServices.deleteAllCartByIdUser(currentUser.id);
      if (response) {
        setWarningMessage(response.message);
        fetchAllCartByIdUser();
      }
    };
    fetchClearCart();
  };

  const handleUpdateQuantity = (idCart, quantity) => {
    const fetchUpdateCart = async () => {
      const response = await cartServices.updateQuantityCart(idCart, quantity);
      if (response) {
        setWarningMessage(response.message);
        fetchAllCartByIdUser();
      }
    };
    if (quantity > 0) {
      fetchUpdateCart();
    }
  };

  const handleDeleteCart = (idCart) => {
    const fetchDeleteCart = async () => {
      const response = await cartServices.deleteCartByIdCart(idCart);
      if (response) {
        setWarningMessage(response.message);
        fetchAllCartByIdUser();
      }
    };
    fetchDeleteCart();
  };

  return (
    <div className={cx("background")}>
      <div className={cx("inner")}>
        <Row className="mx-auto">
          <Col md={8}>
            <TableProducts
              listCart={listCart}
              vnd={VND}
              handleClearCart={handleClearCart}
              handleUpdateQuantity={handleUpdateQuantity}
              handleDeleteCart={handleDeleteCart}
            ></TableProducts>

            {warningMessage && (
              <p className={cx("warning-text")}>{warningMessage}</p>
            )}
          </Col>
          <Col md={4}>
            <TableTotalPrice listCart={listCart} VND={VND}></TableTotalPrice>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Cart;
