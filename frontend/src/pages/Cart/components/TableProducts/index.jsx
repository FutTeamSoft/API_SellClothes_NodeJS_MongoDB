import { Table } from "react-bootstrap";
import classNames from "classnames/bind";
import { FaTrashAlt } from "react-icons/fa";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

import Button from "~/components/Button";
import styles from "./TableProducts.module.scss";
import { Link } from "react-router-dom";
import config from "~/config";

const cx = classNames.bind(styles);

function TableProducts({
  listCart,
  vnd,
  handleClearCart,
  handleUpdateQuantity,
  handleDeleteCart,
}) {
  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>{config.texts.titleTableIndex}</th>
            <th>{config.texts.titleTableProduct}</th>
            <th>{config.texts.titleTableSize}</th>
            <th>{config.texts.titleTablePrice}</th>
            <th>{config.texts.titleTableQuantity}</th>
            <th>{config.texts.titleTableTotal}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listCart.length > 0 ? (
            listCart.map((cart, index) => {
              const quantity = cart.CartProductQuantity;
              return (
                <tr key={cart.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link className={cx("product-name")}>
                      {cart.Product.NameProduct}
                    </Link>
                  </td>
                  <td>{cart.CartProductSize}</td>
                  <td>{vnd.format(cart.Product.PriceProduct)}</td>
                  <td>
                    <div className={cx("wrapper-quantity")}>
                      <Button
                        text
                        onClick={() => {
                          handleUpdateQuantity(cart.id, quantity - 1);
                        }}
                      >
                        <AiOutlineMinusCircle />
                      </Button>
                      <p> {quantity}</p>
                      <Button
                        className="m-0"
                        text
                        onClick={() => {
                          handleUpdateQuantity(cart.id, quantity + 1);
                        }}
                      >
                        <AiOutlinePlusCircle />
                      </Button>
                    </div>
                  </td>
                  <td>{vnd.format(cart.Product.PriceProduct * quantity)}</td>
                  <td>
                    <Button
                      text
                      onClick={() => {
                        handleDeleteCart(cart.id);
                      }}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>{config.texts.warningNoProducts}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button
        disabled={listCart.length === 0}
        primary
        onClick={handleClearCart}
      >
        {config.texts.btnClearCart}
      </Button>
    </div>
  );
}

export default TableProducts;
