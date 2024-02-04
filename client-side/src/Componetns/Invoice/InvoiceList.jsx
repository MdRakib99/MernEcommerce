import React, { useEffect } from "react";
import cartStore from "../../Store/CartStoe";
import LegalContentSkeleton from "../../LoadingSkeleton/LegalContentSkeleton";

const InvoiceList = () => {
  const { invoiceListRequest, invoiceList } = cartStore();

  useEffect(() => {
    (async () => {
      await invoiceListRequest();
    })();
  }, []);

  if (invoiceList === null) {
    return <LegalContentSkeleton />;
  } else {
    return (
      <div>
        {
          <ul>
            {invoiceList.map((item, i) => {
              return (
                <li>
                  <p>Invoice No:{item["tran_id"]}</p>
                  <p>TotalPayable:{item["payable"]}</p>
                  <p>Customer Details:{item["cus_details"]}</p>
                  <p>Payment Status:{item["payment_status"]}</p>
                  <p>Delivery Status:{item["delivery_status"]}</p>
                </li>
              );
            })}
          </ul>
        }
      </div>
    );
  }
};

export default InvoiceList;
