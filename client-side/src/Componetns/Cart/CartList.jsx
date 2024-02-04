import React, { useEffect } from "react";
import cartStore from "../../Store/CartStoe";
import FeaturesSkeleton from "../../LoadingSkeleton/FeaturesSkeleton";
import CartSubmitButton from "./CartSubmitButton";

const CartList = () => {
  const { cartListRequest, cartList, paymentMethodList, createInvoiceRequest } =
    cartStore();

  useEffect(() => {
    (async () => {
      await cartListRequest();
    })();
  }, []);

  if (cartList === null) {
    return <FeaturesSkeleton />;
  } else {
    return (
      <div>
        <ul>
          {cartList.map((item, i) => {
            return (
              <li key={i}>
                <p> Product Name:{item["product"]["title"]}</p>
                <p> Price{item["product"]["price"]}</p>
                <p> Discount Price {item["product"]["discountPrice"]}</p>
                {/* <img src={item["product"]["image"]} alt='#' /> */}
                <p> Quantity: {item["qty"]}</p>
                <p> Size: {item["size"]}</p>
              </li>
            );
          })}
        </ul>
        <CartSubmitButton
          onClick={async () => {
            await createInvoiceRequest();
          }}
          text='Checkout'
          className='btn btn-success'
        />
      </div>
    );
  }
};

export default CartList;
