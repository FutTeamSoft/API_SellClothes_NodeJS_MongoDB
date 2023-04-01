import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./OrderNotice.module.scss";
import Button from "~/components/Button";
import config from "~/config";

const cx = classNames.bind(styles);

function OrderNotice() {
  const location = useLocation();
  const Notice = location.state.response;

  return (
    <div className={cx("background")}>
      <div className={`${cx("inner")} shadow`}>
        {Notice.error ? (
          <div className={cx("wrap-notice")}>
            <p className={cx("warning-text")}>{Notice.message}</p>
            <p>{config.texts.orderFailed}</p>
          </div>
        ) : (
          <div className={cx("wrap-notice")}>
            <p className={cx("success-text")}>{Notice.message}</p>
            <p>{config.texts.yourOrderCode}:</p>
            <p>{Notice.invoice.id}</p>
            <p>{config.texts.orderSuccess}</p>
          </div>
        )}

        <div className={cx("wrap-button")}>
          <Button to={config.routes.home} primary>
            {config.texts.backHome}
          </Button>
          <Button to={config.routes.products} primary>
            {config.texts.backProducts}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OrderNotice;
