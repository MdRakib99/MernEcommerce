import React from "react";
import wishStore from "../../Store/WishStore";

const WishSubmitButton = (props) => {
  let { isWishSubmit } = wishStore();

  if (isWishSubmit === false) {
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

export default WishSubmitButton;
