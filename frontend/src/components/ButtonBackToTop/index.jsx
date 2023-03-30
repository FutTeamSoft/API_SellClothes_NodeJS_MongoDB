import { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import classNames from "classnames/bind";

import style from "./ButtonBackToTop.module.scss";

const cx = classNames.bind(style);

function ButtonBackToTop() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {backToTopButton && (
        <button className={cx("button-on-top")} onClick={scrollUp}>
          <MdKeyboardArrowUp />
        </button>
      )}
    </>
  );
}

export default ButtonBackToTop;
