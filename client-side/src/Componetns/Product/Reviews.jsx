import React from "react";
import productStore from "../../Store/ProductStore";
import StarRatings from "react-star-ratings";

const Reviews = () => {
  const { reviewList } = productStore();
  return (
    <div>
      <ul class='list-group mt-4 list-group-flush'>
        {reviewList !== null ? (
          reviewList.map((item, i) => {
            return (
              <li key={i} className='list-group-item bg-transparent'>
                <h6 className='m-0, p-0'>
                  <i class='bi bi-person-fill'></i>{" "}
                  {item["profile"]["cus_name"]}
                </h6>
                <StarRatings
                  rating={parseFloat(item["rating"])}
                  starRatedColor='red'
                  starDimension='15px'
                  starSpacing='2px'
                />
                <p>{item["des"]}</p>
              </li>
            );
          })
        ) : (
          <span></span>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
