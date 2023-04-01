import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames/bind";

import styles from "./InvoiceDetail.module.scss";
import * as invoicesServices from "~/services/invoiceServices";
import config from "~/config";

const cx = classNames.bind(styles);

function InvoiceDetail() {
  let VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const location = useLocation();
  const invoice = location.state;

  const [details, setDetails] = useState([]);

  const fetchInvoiceDetailByIdInvoice = async () => {
    const details = await invoicesServices.getInvoiceDetailByIdInvoice(
      invoice.id
    );
    setDetails(details);
  };

  useEffect(() => {
    if (invoice) {
      fetchInvoiceDetailByIdInvoice();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cx("background")}>
      <div className={cx("inner")}>
        <h2 className={cx("heading")}>
          {config.texts.titleInvocicesDetailPage} #{invoice.id}
        </h2>
        <div className={cx("wrap-product")}>
          <div>
            <p className={cx("title-card")}>
              {config.texts.labelFullName}:{" "}
              <span>{invoice.InvoiceNameReceiver}</span>
            </p>
            <p className={cx("title-card")}>
              {config.texts.labelPhoneNumber}:{" "}
              <span>{invoice.InvoicePhoneReceiver}</span>
            </p>
            <p className={cx("title-card")}>
              {config.texts.labelAddress}:{" "}
              <span>{invoice.InvoiceAddressReceiver}</span>
            </p>
            <p className={cx("title-card")}>
              {config.texts.labelBookingDate}:{" "}
              <span>{invoice.InvoiceDate}</span>
            </p>
            <p className={cx("title-card")}>
              {config.texts.titleTableTotalMoney}:{" "}
              <span>{VND.format(invoice.TotalInvoice)}</span>
            </p>
            <p className={cx("title-card")}>
              {config.texts.labelNote}: <span>{invoice.NoteInvoice}</span>
            </p>
            <p className={cx("title-card")}>
              {config.texts.labelStatus}:{" "}
              <span>
                {invoice.StatusInvoice === 0
                  ? config.texts.unconfirmed
                  : config.texts.confirmed}
              </span>
            </p>
          </div>
          {details?.map((detail) => (
            <div key={detail.id} className={cx("product-card")}>
              <div>
                <p className={cx("title-card")}>
                  {config.texts.titleTableProduct}
                </p>

                <Link
                  to={
                    config.routes.products +
                    "/" +
                    detail.Product.NameProduct.replace(
                      /\s+/g,
                      "-"
                    ).toLowerCase()
                  }
                  state={detail.Product}
                >
                  {detail.Product.NameProduct}
                </Link>
              </div>
              <div>
                <p className={cx("title-card")}>
                  {config.texts.titleTableSize}
                </p>
                <p>{detail.TenSize}</p>
              </div>
              <div>
                <p className={cx("title-card")}>
                  {config.texts.titleTableQuantity}
                </p>
                <p>{detail.Quantity}</p>
              </div>
              <div>
                <p className={cx("title-card")}>
                  {config.texts.titleTableTotal}
                </p>
                <p>{VND.format(detail.UnitPrice)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetail;
