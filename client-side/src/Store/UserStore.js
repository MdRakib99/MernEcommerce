import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { getEmail, setEmail, unauthorized } from "../Utility/utility";

const userStore = create((set) => ({
  isLogin: () => {
    return !!Cookies.get("token");
  },

  loginFormData: { email: "" },
  loginFormOnChange: (name, value) => {
    set((state) => ({
      loginFormData: {
        ...state.loginFormData,
        [name]: value,
      },
    }));
  },

  OTPFormData: { otp: "" },
  OTPFormOnChange: (name, value) => {
    set((state) => ({
      OTPFormData: {
        ...state.OTPFormData,
        [name]: value,
      },
    }));
  },

  isFormSubmit: false,

  userLogoutRequest: async () => {
    set({ isFormSubmit: true });
    let res = await axios.get("/api/v1/userLogout");
    return res.data["status"] === "success";
  },

  userOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`/api/v1/userOTP/${email}`);
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  verifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });
    let email = getEmail();
    let res = await axios.get(`/api/v1/verifyLogin/${email}/${otp}`);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  profileForm: {
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_postcode: "",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_Country: "",
    ship_name: "",
    ship_postcode: "",
    ship_state: "",
  },
  profileFormChange: (name, value) => {
    set((state) => ({
      profileForm: {
        ...state.profileForm,
        [name]: value,
      },
    }));
  },

  profileDetails: null,
  profileDetailsRequest: async () => {
    try {
      let res = await axios.get(`/api/v1/readProfile`);
      if (res.data["data"].length > 0) {
        set({ profileDetails: res.data["data"][0] });
        set({ profileForm: res.data["data"][0] });
      } else {
        set({ profileDetails: [] });
      }
    } catch (error) {
      unauthorized(error.res.status);
    }
  },

  profileSaveRequest: async (postBody) => {
    try {
      set({ profileDetails: null });
      let res = await axios.post(`/api/v1/updateProfile`, postBody);
      return res.data["status"] === "success";
    } catch (error) {
      unauthorized(error.res.status);
    }
  },
}));

export default userStore;
