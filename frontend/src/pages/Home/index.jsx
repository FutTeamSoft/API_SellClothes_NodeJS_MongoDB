import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import { Row } from "react-bootstrap";

import Button from "~/components/Button";
import Product from "~/components/Product";
import config from "~/config";
import style from "./Home.module.scss";
import * as productServices from "~/services/productServices";
import { useChangeStateNav } from "~/hooks";

const cx = classNames.bind(style);

function Home() {
  const location = useLocation();
  const [newProduct, setNewProduct] = useState([]);

  useChangeStateNav(location);

  useEffect(() => {
    const fetchNewProducts = async () => {
      const result = await productServices.newProduct(4);
      setNewProduct(result);
    };

    fetchNewProducts();
  }, []);

  return (
    <>
      <div className={cx("img-wrap")}>
        <div className={cx("img-inner")}></div>
        <div className={cx("caption")}>
          <h1>{config.texts.welcome}</h1>
          <p>{config.texts.describeHome}</p>
          <Button className={cx("button")} primary to={config.routes.products}>
            {config.texts.shopNow}
          </Button>
        </div>
      </div>
      <div className={cx("new-product-wrap")}>
        <h2 className={cx("new-product-wrap-tile")}>
          {config.texts.titleNewProducts}
        </h2>
        <Row
          className={`${cx(
            "new-product-wrap-content"
          )} justify-content-md-center`}
        >
          {newProduct?.map((result, index) => (
            <Product xxl={2} key={index} product={result} />
          ))}
        </Row>
      </div>
    </>
  );
}

export default Home;
