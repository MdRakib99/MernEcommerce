import { create } from "zustand";

import axios from "axios";
import { unauthorized } from "../Utility/utility";

const wishStore = create((set) => ({
  isWishSubmit: false,
  wishSaveRequest: async (productID) => {
    try {
      set({ isWishSubmit: true });
      let res = await axios.post(`/api/v1/saveWishList`, {
        productID: productID,
      });
      return res.data["status"] === "success";
    } catch (error) {
      unauthorized(error.response.status);
    } finally {
      set({ isWishSubmit: false });
    }
  },
  wishList: null,
  wishCount: 0,

  wishListRequest: async () => {
    try {
      let res = await axios.get(`/api/v1/wishList`);
      set({ wishList: res.data["data"] });
      set({ wishCount: res.data["data"].length });
    } catch (error) {
      unauthorized(error.response.status);
    }
  },
}));

export default wishStore;
