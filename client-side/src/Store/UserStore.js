import { create } from "zustand";
import axios from "axios";
import { getEmail, setEmail } from "../Utility/utility";

const userStore = create((set) => ({
  loginFormData: { email: "" },
  loginFormOnChange: (name, value) => {
    set((state) => ({
      loginFormData: {
        ...state.loginFormData,
        [name]: value,
      },
    }));
  },
  isFormSubmit: false,

  userOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.get(`/api/v1/userOTP/${email}`);
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },

  verifyLoginRequest: async (otp) => {
    set({ isFormSubmit: false });
    let email = getEmail();
    let res = await axios.get(`/api/v1/verifyLogin/${email}`);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },
}));

export default userStore;
