import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { currentUserSelector } from "~/redux/selectors";
import classNames from "classnames/bind";

import styles from "./Checkout.module.scss";
import { Col, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import config from "~/config";
import Button from "~/components/Button";
import * as invociceServices from "~/services/invoiceServices";

const cx = classNames.bind(styles);

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const listCart = location.state;
  const currentUser = useSelector(currentUserSelector);

  const [note, setNote] = useState("");
  const [total, setTotal] = useState(0);

  let VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    let total = 0;
    listCart.forEach((cart) => {
      total += cart.Product.PriceProduct * cart.CartProductQuantity;
    });
    setTotal(total);
  }, [listCart]);

  const handleOrder = () => {
    const fetchOrder = async () => {
      const response = await invociceServices.createInvoice(
        currentUser.id,
        note,
        config.texts.transportFee,
        currentUser.token
      );
      if (response) {
        navigate(config.routes.orderNotice, { state: { response } });
      }
    };
    fetchOrder();
  };

  return (
    <div className={cx("background")}>
      <div className={cx("inner")}>
        <h2 className={cx("heading")}>{config.texts.titleCheckoutPage}</h2>
        <Row>
          <Col md={6}>
            <div className={cx("form-group")}>
              <p>
                {config.texts.labelFullName}{" "}
                <span className="text-muted">{config.texts.readOnly}</span>
              </p>
              <input readOnly value={currentUser.FullName}></input>
            </div>
            <div className={cx("form-group")}>
              <p>
                {config.texts.labelAddress}{" "}
                <span className="text-muted">{config.texts.readOnly}</span>
              </p>
              <input readOnly value={currentUser.AddressUser}></input>
            </div>
            <div className={cx("form-group")}>
              <p>
                {config.texts.labelPhoneNumber}{" "}
                <span className="text-muted">{config.texts.readOnly}</span>
              </p>
              <input readOnly value={currentUser.PhoneNumber}></input>
            </div>
            <div className={cx("form-group")}>
              <p>{config.texts.labelNote}</p>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></input>
            </div>
          </Col>
          <Col md={6}>
            <div className={cx("wrap-order")}>
              <Table className="mb-5">
                <tbody>
                  {listCart.map((cart) => {
                    return (
                      <tr key={cart.id}>
                        <th>{`${cart.Product.NameProduct} x${cart.CartProductQuantity}`}</th>
                        <td>
                          {VND.format(
                            cart.Product.PriceProduct * cart.CartProductQuantity
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
                    <th>{config.texts.titleTableTotalProductCost}</th>
                    <td>{VND.format(total)}</td>
                  </tr>
                  <tr>
                    <th>{config.texts.titleTableTransportFee}</th>
                    <td>{VND.format(config.texts.transportFee)}</td>
                  </tr>
                  <tr>
                    <th>{config.texts.titleTableTotalMoney}</th>
                    <td>{VND.format(total + config.texts.transportFee)}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                className={cx("btn-order")}
                fab
                disabled={listCart.length === 0}
                onClick={() => {
                  handleOrder();
                }}
              >
                {config.texts.btnOrder}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Checkout;
