import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames/bind";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

import styles from "./Pagination.module.scss";
import Button from "~/components/Button";
import productsSlice from "~/pages/Products/productsSlice";
import {
  productsPerPageSelector,
  currentPageSelector,
} from "~/redux/selectors";

const cx = classNames.bind(styles);

function Pagination({ products }) {
  const dispatch = useDispatch();

  const productsPerPage = useSelector(productsPerPageSelector);
  const currentPage = useSelector(currentPageSelector);

  let pages = [];
  const lastPageIndex = Math.ceil(products?.length / productsPerPage);

  for (let i = 1; i <= lastPageIndex; i++) {
    pages.push(i);
  }

  const setCurrentPage = (page) => {
    dispatch(productsSlice.actions.setCurrentPage(page));
  };

  return (
    <div className={cx("wrapper")}>
      <Button
        pagination
        onClick={() => {
          setCurrentPage(1);
        }}
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>
      {pages.map((page, index) => {
        return (
          <Button
            pagination
            selected={page === currentPage}
            key={index}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </Button>
        );
      })}
      <Button
        pagination
        onClick={() => {
          setCurrentPage(lastPageIndex);
        }}
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </div>
  );
}

export default Pagination;
