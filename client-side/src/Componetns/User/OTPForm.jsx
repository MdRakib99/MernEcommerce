import React from "react";
import UserSubmitButton from "./UserSubmitButton";
import userStore from "../../Store/UserStore";
import validationHelper from "../../Utility/validationHelper";

import { useNavigate } from "react-router-dom";

const OTPForm = () => {
  let navigate = useNavigate();
  let { OTPFormData, OTPFormOnChange, verifyLoginRequest } = userStore();

  const onFormSubmit = async () => {
    if (validationHelper.isEmpty(OTPFormData.otp)) {
    } else {
      let res = await verifyLoginRequest(OTPFormData.otp);
      res ? navigate("/") : toast.error("Invalid OTP");
    }
  };
  return (
    <div className='container section'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-5'>
          <div className='card p-5'>
            <h4>Enter Verification Code</h4>
            <p>
              A verification code has been sent to the email address you provide
            </p>
            <input
              onChange={(e) => {
                OTPFormOnChange("otp", e.target.value);
              }}
              value={OTPFormData.otp}
              placeholder='Verification'
              type='text'
              className='form-control'
            />
            <UserSubmitButton
              onClick={onFormSubmit}
              submit={false}
              className='btn mt-3 btn-success'
              text='Submit'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
