import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./Product.module.scss";
import config from "~/config";

const cx = classNames.bind(styles);

function Product({ product, className, ...passProps }) {
  let VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const classes = cx("product-wrap", {
    [className]: className,
  });

  return (
    <Col md={3} className={classes} {...passProps}>
      <div className={cx("product-inner")}>
        <Link
          to={
            config.routes.products +
            "/" +
            product.NameProduct.replace(/\s+/g, "-").toLowerCase()
          }
          state={product}
        >
          <img
            className={cx("product-image")}
            src={product.ImageProduct.DuongDanHinh}
            alt={product.NameProduct}
          />

          <div className={cx("product-info-wrap")}>
            <p title={product.NameProduct} className={cx("product-name")}>
              {product.NameProduct}
            </p>

            <p className={cx("product-price")}>
              {VND.format(product.PriceProduct)}
            </p>
          </div>
        </Link>
      </div>
    </Col>
  );
}

export default Product;
