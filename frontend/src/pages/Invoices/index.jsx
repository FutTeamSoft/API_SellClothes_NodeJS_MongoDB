import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Button from "~/components/Button";
import config from "~/config";
import { currentUserSelector } from "~/redux/selectors";
import * as invoicesServices from "~/services/invoiceServices";
import styles from "./Invoices.module.scss";

const cx = classNames.bind(styles);

function Invoices() {
  let VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [listInvoice, setListInvoice] = useState([]);

  const currentUser = useSelector(currentUserSelector);

  const fetchAllInvoiceByIdUser = async () => {
    const listInvoice = await invoicesServices.getAllInvoiceByIdUser(
      currentUser.id,
      currentUser.token
    );
    setListInvoice(listInvoice);
  };

  useEffect(() => {
    if (currentUser) {
      fetchAllInvoiceByIdUser();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div className={cx("background")}>
      <div className={cx("inner")}>
        <h2 className={cx("heading")}>History</h2>
        <div className={cx("wrap-history")}>
          {listInvoice?.map((invoice) => (
            <div key={invoice.id} className={cx("history-card")}>
              <div>
                <p className={cx("title-card")}>
                  {config.texts.labelOrderCode}
                </p>
                <p>{invoice.id}</p>
              </div>
              <div>
                <p className={cx("title-card")}>
                  {config.texts.labelBookingDate}
                </p>
                <p>{invoice.InvoiceDate}</p>
              </div>
              <div>
                <p className={cx("title-card")}>
                  {config.texts.titleTableTotalMoney}
                </p>
                <p>{VND.format(invoice.TotalInvoice)}</p>
              </div>
              <div>
                <p className={cx("title-card")}>{config.texts.labelStatus}</p>
                <p>
                  {invoice.StatusInvoice === 0
                    ? config.texts.unconfirmed
                    : config.texts.confirmed}
                </p>
              </div>

              <Button
                to={config.routes.invoices + "/" + invoice.id}
                state={invoice}
                primary
              >
                {config.texts.btnDetail}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Invoices;
