import classNames from "classnames/bind";

import styles from "./TableTotalPrice.module.scss";
import Button from "~/components/Button";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import config from "~/config";

const cx = classNames.bind(styles);

function TableTotalPrice({ listCart, VND }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    listCart.forEach((cart) => {
      total += cart.Product.PriceProduct * cart.CartProductQuantity;
    });
    setTotal(total);
  }, [listCart]);

  return (
    <div className={cx("wrapper")}>
      <p className={cx("title")}>{config.texts.titleIntoMoney}</p>
      <Table className="mb-5">
        <tbody>
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
        to={config.routes.checkout}
        state={listCart}
        fab
        disabled={listCart.length === 0}
      >
        {config.texts.btnProceedToCheckout}
      </Button>
    </div>
  );
}

export default TableTotalPrice;
