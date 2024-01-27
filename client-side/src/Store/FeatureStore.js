import axios from "axios";
import { create } from "zustand";
const featureStore = create((set) => ({
  featureList: null,
  featureListRequest: async () => {
    let res = await axios.get(`/api/v1/featureList`);
    if (res.data["status"] === "success") {
      set({ featureList: res.data["data"] });
    }
  },
  legalDetails: null,
  legalDetailsRequest: async (type) => {
    set({ legalDetails: null });
    let res = await axios.get(`/api/v1/legalDetails/${type}`);
    if (res.data["status"] === "success") {
      set({ legalDetails: res.data["data"] });
    }
  },
}));

export default featureStore;
