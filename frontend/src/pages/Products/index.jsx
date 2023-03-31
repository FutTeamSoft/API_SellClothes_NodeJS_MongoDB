import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import classNames from "classnames/bind";
import { MdKeyboardArrowRight } from "react-icons/md";

import styles from "./Products.module.scss";
import Product from "~/components/Product";
import * as productServices from "~/services/productServices";
import productsSlice from "./productsSlice";
import {
  categorySelector,
  currentProductsSelector,
  currentPageSelector,
  productsPerPageSelector,
} from "~/redux/selectors";
import { useChangeStateNav } from "~/hooks";
import config from "~/config";
import Pagination from "~/pages/Products/components/Pagination";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/Searchbar";

const cx = classNames.bind(styles);

function Products() {
  const dispatch = useDispatch();
  const location = useLocation();

  const category = useSelector(categorySelector);
  const currentPage = useSelector(currentPageSelector);
  const productsPerPage = useSelector(productsPerPageSelector);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  const currentProducts = useSelector(currentProductsSelector);
  const productDisplay = currentProducts?.slice(
    firstProductIndex,
    lastProductIndex
  );

  useChangeStateNav(location);

  useEffect(() => {
    const fetchCategory = async () => {
      const newListSex = await productServices.getAllSex();
      const newListType = await productServices.getAllType();
      const category = {
        sex: newListSex,
        type: newListType,
      };
      dispatch(productsSlice.actions.setCategory(category));
    };
    fetchCategory();
    if (category.selected === "") {
      productServices.getAllProducts(dispatch);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("breadcrumb")}>
        <div className={cx("breadcrumb-inner")}>
          <Link to={config.routes.home}>{config.texts.home}</Link>
          <MdKeyboardArrowRight />
          <p>{config.texts.products}</p>
        </div>
      </div>

      <div className={cx("inner")}>
        <h2 className={cx("heading")}>{config.texts.titleProductsPage}</h2>
        <Row>
          <Col md={3}>
            <Searchbar />
            <Sidebar category={category} dispatch={dispatch} />
          </Col>
          <Col md={9}>
            <Row>
              {productDisplay?.map((product, index) => (
                <Product key={index} product={product} />
              ))}
            </Row>
            <Pagination products={currentProducts} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Products;
