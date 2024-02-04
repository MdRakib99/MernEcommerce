import React from "react";

import UserSubmitButton from "./UserSubmitButton";
import userStore from "../../Store/UserStore";
import validationHelper from "../../Utility/validationHelper";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  let navigate = useNavigate();
  let { loginFormData, loginFormOnChange, userOTPRequest } = userStore();

  const onFormSubmit = async () => {
    if (!validationHelper.isEmail(loginFormData.email)) {
      toast("Enter Valid Email");
    } else {
      let res = await userOTPRequest(loginFormData.email);
      res ? navigate("/otp") : toast.error("Please Enter valid Email");
    }
  };

  return (
    <div className='container section'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-5'>
          <div className='card p-5'>
            <h4>Enter Your Email</h4>
            <p>
              A verification code will be sent to the email address you provide
            </p>
            <input
              placeholder='Email Address'
              value={loginFormData.email}
              onChange={(e) => {
                loginFormOnChange("email", e.target.value);
              }}
              type='email'
              className='form-control'
            />
            <UserSubmitButton
              onClick={onFormSubmit}
              className='btn mt-3 btn-success'
              text='Next'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
