import axios from "axios";
import { create } from "zustand";

const productStore = create((set) => ({
  brandList: null,
  brandListRequest: async () => {
    let res = await axios.get(`/api/v1/productBrandList`);
    if (res.data["status"] === "success") {
      set({ brandList: res.data["data"] });
    }
  },

  categoryList: null,
  categoryListRequest: async () => {
    let res = await axios.get(`/api/v1/productCategoryList`);
    if (res.data["status"] === "success") {
      set({ categoryList: res.data["data"] });
    }
  },

  sliderList: null,

  sliderListRequest: async () => {
    let res = await axios.get(`/api/v1/productSliderList`);
    if (res.data["status"] === "success") {
      set({ sliderList: res.data["data"] });
    }
  },

  listByRemark: null,
  listByRemarkRequest: async (remark) => {
    set({ listByRemark: null });
    let res = await axios.get(`/api/v1/productListByRemark/${remark}`);
    if (res.data["status"] === "success") {
      set({ listByRemark: res.data["data"] });
    }
  },

  productList: null,
  listByBrandRequest: async (brandID) => {
    set({ productList: null });
    let res = await axios.get(`/api/v1/productListByBrand/${brandID}`);
    if (res.data["status"] === "success") {
      set({ productList: res.data["data"] });
    }
  },

  listByCategoryRequest: async (categoryID) => {
    set({ productList: null });
    let res = await axios.get(`/api/v1/productListByCategory/${categoryID}`);
    if (res.data["status"] === "success") {
      set({ productList: res.data["data"] });
    }
  },

  listByKeywordRequest: async (keyword) => {
    set({ productList: null });
    let res = await axios.get(`/api/v1/productListBykeyword/${keyword}`);
    if (res.data["status"] === "success") {
      set({ productList: res.data["data"] });
    }
  },

  listByFilterRequest: async (postBody) => {
    set({ productList: null });
    let res = await axios.post(`/api/v1/productListByFilter`, postBody);
    if (res.data["status"] === "success") {
      set({ productList: res.data["data"] });
    }
  },

  searchKeyword: "",
  setSearchKeyword: async (keyword) => {
    set({ searchKeyword: keyword });
  },

  productDetails: null,
  productDetailsRequest: async (id) => {
    set({ listByRemark: null });
    let res = await axios.get(`/api/v1/productDetails/${id}`);
    if (res.data["status"] === "success") {
      set({ productDetails: res.data["data"] });
    }
  },

  reviewList: null,
  reviewListRequest: async (id) => {
    set({ listByRemark: null });
    let res = await axios.get(`/api/v1/productReviewList/${id}`);
    if (res.data["status"] === "success") {
      set({ reviewList: res.data["data"] });
    }
  },
}));

export default productStore;
