import React, { useEffect, useState } from "react";
import productStore from "../../Store/ProductStore";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ProductsSkeleton from "../../LoadingSkeleton/ProductsSkeleton";

const ProductList = () => {
  const {
    productList,
    brandList,
    brandListRequest,
    categoryList,
    categoryListRequest,
    listByFilterRequest,
  } = productStore();

  let [filter, setFilter] = useState({
    brandID: "",
    categoryID: "",
    minPrice: "",
    maxPrice: "",
  });

  const inputOnchange = async (name, value) => {
    setFilter((data) => ({
      ...data,
      [name]: value,
    }));
  };

  useEffect(() => {
    (async () => {
      brandList === null ? await brandListRequest() : null;
      categoryList === null ? await categoryListRequest() : null;
      let isEveryFilterPropertyEmpty = Object.values(filter).every(
        (value) => value === ""
      );
      !isEveryFilterPropertyEmpty ? await listByFilterRequest(filter) : null;
    })();
  }, [filter]);

  return (
    <div className='container mt-2'>
      <div className='row'>
        <div className='col-md-3 p-2'>
          <div className='card vh-100 p-3 shadow-sm'>
            <label className='form-label mt-3'>Brands</label>
            <select
              className='form-control form-select'
              value={filter.brandID}
              onChange={async (e) => {
                await inputOnchange("brandID", e.target.value);
              }}
            >
              <option value=''>Choose Brand</option>
              {brandList !== null ? (
                brandList.map((item, i) => {
                  return (
                    <option value={item["_id"]}>{item["brandName"]}</option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className='form-label mt-3'>Categories</label>
            <select
              className='form-control form-select'
              value={filter.categoryID}
              onChange={async (e) => {
                await inputOnchange("categoryID", e.target.value);
              }}
            >
              <option>Choose Category</option>
              {categoryList !== null ? (
                categoryList.map((item, i) => {
                  return (
                    <option value={item["_id"]}>{item["categoryName"]}</option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className='form-label mt-3'>
              Maximum Price ${filter.maxPrice}
            </label>
            <input
              min={0}
              max={10000}
              step={100}
              type='range'
              className='form-range'
              value={filter.maxPrice}
              onChange={async (e) => {
                await inputOnchange("maxPrice", e.target.value);
              }}
            />
            <label className='form-label mt-3'>
              Minimum Price ${filter.minPrice}
            </label>
            <input
              min={0}
              max={10000}
              step={100}
              type='range'
              className='form-range'
              value={filter.minPrice}
              onChange={async (e) => {
                await inputOnchange("minPrice", e.target.value);
              }}
            />
          </div>
        </div>
        <div className='col-md-9 p-2'>
          <div className='container'>
            <div className='row'>
              {productList === null ? (
                <ProductsSkeleton />
              ) : (
                <div className='container'>
                  <div className='row'>
                    {productList.map((item, i) => {
                      let price = (
                        <p className='bodyMedium  text-dark my-1'>
                          Price: ${item["price"]}{" "}
                        </p>
                      );
                      if (item["discount"] === true) {
                        price = (
                          <p className='bodyMedium  text-dark my-1'>
                            Price:<strike> ${item["price"]} </strike> $
                            {item["discountPrice"]}{" "}
                          </p>
                        );
                      }
                      return (
                        <div className='col-md-3 p-2 col-lg-3 col-sm-6 col-12'>
                          <Link
                            to={`/details/${item["_id"]}`}
                            className='card shadow-sm h-100 rounded-3 bg-white'
                          >
                            <img
                              className='w-100 rounded-top-2'
                              src={item["image"]}
                            />
                            <div className='card-body'>
                              <p className='bodySmal text-secondary my-1'>
                                {item["title"]}
                              </p>
                              {price}
                              <StarRatings
                                rating={parseFloat(item["star"])}
                                starRatedColor='red'
                                starDimension='15px'
                                starSpacing='2px'
                              />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
