import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./Searchbar.module.scss";
import productsSlice from "~/pages/Products/productsSlice";
import config from "~/config";

const cx = classNames.bind(styles);

function Searchbar() {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(productsSlice.actions.setSearchText(searchInput));
  }, [searchInput, dispatch]);

  return (
    <div className={cx("wrapper")}>
      <input
        placeholder={config.texts.searchProducts}
        onChange={(e) => setSearchInput(e.target.value)}
      ></input>
    </div>
  );
}

export default Searchbar;
