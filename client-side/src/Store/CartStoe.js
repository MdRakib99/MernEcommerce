import { create } from "zustand";
import axios from "axios";
import { unauthorized } from "../Utility/utility";

const cartStore = create((set) => ({
  isCartSubmit: false,
  cartForm: { productID: "", color: "", qty: "", size: "" },

  cartFormChange: (name, value) => {
    set((state) => ({
      cartForm: {
        ...state.cartForm,

        [name]: value,
      },
    }));
  },

  cartSaveRequest: async (postBody, productID, qty) => {
    try {
      set({ isCartSubmit: true });
      postBody.productID = productID;
      postBody.qty = qty;
      let res = await axios.post(`/api/v1/saveCartList`, postBody);
      return res.data["status"] === "success";
    } catch (error) {
      unauthorized(error.response.status);
    } finally {
      set({ isCartSubmit: false });
    }
  },

  cartList: null,
  cartCount: 0,

  cartListRequest: async () => {
    try {
      let res = await axios.get(`/api/v1/cartList`);
      set({ cartList: res.data["data"] });
      set({ cartCount: res.data["data"].length });
    } catch (error) {
      unauthorized(error.response.status);
    }
  },

  createInvoiceRequest: async () => {
    try {
      set({ isCartSubmit: true });
      let res = await axios.get(`/api/v1/createInvoice`);
      window.location.href = res.data["data"]["GatewayPageURL"];
    } catch (error) {
      unauthorized(error.response.status);
    } finally {
      set({ isCartSubmit: false });
    }
  },

  invoiceList: null,
  invoiceListRequest: async () => {
    try {
      let res = await axios.get(`/api/v1/invoiceList`);
      set({ invoiceList: res.data["data"] });
    } catch (error) {
      unauthorized(error.response.status);
    }
  },
}));

export default cartStore;
