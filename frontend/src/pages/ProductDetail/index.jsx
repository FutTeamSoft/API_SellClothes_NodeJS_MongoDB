import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ProductDetail.module.scss";
import config from "~/config";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as productServices from "~/services/productServices";
import * as cartServices from "~/services/cartServices";
import Button from "~/components/Button";
import { useSelector } from "react-redux";
import { currentUserSelector } from "~/redux/selectors";

const cx = classNames.bind(styles);

function ProductDetail() {
  const location = useLocation();
  const product = location.state;

  const currentUser = useSelector(currentUserSelector);

  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [listSize, setListSize] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedNumberOfSize, setSelectedNumberOfSize] = useState(0);
  const [quantity, setQuantity] = useState(0);

  let VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    if (!currentUser) {
      setWarningMessage(config.texts.warningSignInToAddCart);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchCategory = async () => {
      const listSize = await productServices.getAllSizeByIdProduct(product.id);
      if (listSize) {
        setListSize(listSize);
      }
    };
    fetchCategory();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let NumberOf = 0;
    listSize.forEach((size) => {
      if (size.SizeProduct === selectedSize) {
        NumberOf = size.SoLuongTon;
      }
    });
    setSelectedNumberOfSize(NumberOf);
  }, [selectedSize, listSize]);

  const addToCart = () => {
    if (selectedSize === "") {
      setWarningMessage(config.texts.warningChooseSize);
      setSuccessMessage("");
    } else if (quantity < 1 || quantity > selectedNumberOfSize) {
      setWarningMessage(config.texts.warningQuantityDoesNotMatch);
      setSuccessMessage("");
    } else {
      const productAddCart = {
        Product: product.id,
        Account: currentUser.id,
        CartProductSize: selectedSize,
        CartProductQuantity: quantity,
      };
      setWarningMessage("");
      const fetchAddToCart = async () => {
        const response = await cartServices.addCart(productAddCart);
        setSuccessMessage(response.message);
      };
      setQuantity(0);
      fetchAddToCart();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("breadcrumb")}>
        <div className={cx("breadcrumb-inner")}>
          <Link to={config.routes.home}>{config.texts.home}</Link>
          <MdKeyboardArrowRight />
          <Link to={config.routes.products}>{config.texts.products}</Link>
          <MdKeyboardArrowRight />
          <p>{product.NameProduct}</p>
        </div>
      </div>

      <div className={cx("inner")}>
        <h2 className={cx("heading")}>{config.texts.titleProductDetailPage}</h2>
        <Row>
          <Col md={6} className={cx("wrapper-image")}>
            <img
              className={cx("product-image")}
              src={product.ImageProduct.DuongDanHinh}
              alt={product.NameProduct}
            />
          </Col>
          <Col md={6} className={cx("wrapper-info")}>
            <div className={cx("wrapper-name")}>
              <p>{product.ProductType.NameProductType}</p>
              <p className={cx("name-product")} title={product.NameProduct}>
                {product.NameProduct}
              </p>
            </div>
            <p className={cx("price-product")}>
              {VND.format(product.PriceProduct)}
            </p>
            <hr />
            <div>
              <p>{config.texts.titleDescription}</p>
              <p>{product.Description}</p>
            </div>
            <div>
              <p>{config.texts.titleSize}</p>
              <div className="d-flex">
                {listSize?.map((size, index) => {
                  return (
                    <Button
                      key={index}
                      selected={size.SizeProduct === selectedSize}
                      pagination
                      onClick={() => {
                        setSelectedSize(size.SizeProduct);
                      }}
                    >
                      {size.SizeProduct}
                    </Button>
                  );
                })}
              </div>
              <p className="mt-2">
                {config.texts.quantity}: {selectedNumberOfSize}
              </p>
            </div>
            <div className="mb-5">
              <p>{config.texts.titleQuantity}</p>
              <div className={cx("wrapper-quantity")}>
                <Button
                  text
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                >
                  <AiOutlineMinusCircle style={{ fontSize: 24 }} />
                </Button>
                <p>{quantity}</p>
                <Button
                  text
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  <AiOutlinePlusCircle style={{ fontSize: 24 }} />
                </Button>
              </div>
              {warningMessage && (
                <p className={cx("warning-text")}>{warningMessage}</p>
              )}
              {successMessage && (
                <p className={cx("success-text")}>{successMessage}</p>
              )}
            </div>
            <Button disabled={!currentUser} fab onClick={addToCart}>
              {config.texts.btnAddToCart}
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProductDetail;
