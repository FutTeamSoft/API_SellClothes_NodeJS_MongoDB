import classNames from "classnames/bind";

import Button from "~/components/Button";

import config from "~/config";
import style from "./Home.module.scss";

const cx = classNames.bind(style);

function Home() {
  return (
    <>
      <div className={cx("img-wrap")}>
        <div className={cx("img-inner")}></div>
        <div className={cx("caption")}>
          <h1>{config.texts.welcome}</h1>
          <p>{config.texts.describeHome}</p>
          <Button primary to={config.routes.product}>
            {config.texts.shopNow}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
