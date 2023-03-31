import classNames from "classnames/bind";

import styles from "./Sidebar.module.scss";
import Button from "~/components/Button";
import productsSlice from "../../productsSlice";
import * as productServices from "~/services/productServices";

const cx = classNames.bind(styles);

function Sidebar({ category, dispatch }) {
  const handleChangeSelected = (idSex, idType) => {
    if (idType) {
      dispatch(productsSlice.actions.setSelected(idType));
      productServices.getAllProductsBySexAndType(idSex, idType, dispatch);
    } else {
      dispatch(productsSlice.actions.setSelected(idSex));
      productServices.getAllProductsBySex(idSex, dispatch);
    }
  };

  return (
    <div className={cx("sidebar")}>
      <div className={cx("text")}>Category</div>
      <div>
        {category.sex?.map((sex) => (
          <div key={sex.id} className={cx("sidebar-sex-wrap")}>
            <Button
              expand
              selected={sex.id === category.selected}
              onClick={() => {
                handleChangeSelected(sex.id);
              }}
            >
              {sex.NameSex}
            </Button>
            <ul className={cx("sidebar-category-wrap")}>
              {category.type.map((type) => {
                if (type.Sex.id === sex.id) {
                  return (
                    <li key={type.id}>
                      <Button
                        expand
                        selected={type.id === category.selected}
                        onClick={() => {
                          handleChangeSelected(sex.id, type.id);
                        }}
                      >
                        {type.NameProductType}
                      </Button>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
