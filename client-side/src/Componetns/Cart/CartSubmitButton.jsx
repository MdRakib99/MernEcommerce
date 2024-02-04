import React from "react";
import cartStore from "../../Store/CartStoe";

const CartSubmitButton = (props) => {
  let { isCartSubmit } = cartStore();

  if (isCartSubmit === false) {
    return (
      <button onClick={props.onClick} type='submit' className={props.className}>
        {props.text}
      </button>
    );
  } else {
    return (
      <button disabled={true} className={props.className}>
        <div className='spinner-border spinner-border-sm ' role='status'></div>
        wait...
      </button>
    );
  }
};

export default CartSubmitButton;
