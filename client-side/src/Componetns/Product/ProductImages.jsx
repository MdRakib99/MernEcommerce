import React from "react";
import productStore from "../../Store/ProductStore";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const ProductImages = () => {
  const { productDetails } = productStore();
  let images = [
    {
      original: productDetails[0]["details"]["img1"],
      thumbnail: productDetails[0]["details"]["img1"],
    },
    {
      original: productDetails[0]["details"]["img2"],
      thumbnail: productDetails[0]["details"]["img2"],
    },
    {
      original: productDetails[0]["details"]["img3"],
      thumbnail: productDetails[0]["details"]["img3"],
    },
    {
      original: productDetails[0]["details"]["img4"],
      thumbnail: productDetails[0]["details"]["img4"],
    },
    {
      original: productDetails[0]["details"]["img5"],
      thumbnail: productDetails[0]["details"]["img5"],
    },
    {
      original: productDetails[0]["details"]["img6"],
      thumbnail: productDetails[0]["details"]["img6"],
    },
    {
      original: productDetails[0]["details"]["img7"],
      thumbnail: productDetails[0]["details"]["img7"],
    },
    {
      original: productDetails[0]["details"]["img8"],
      thumbnail: productDetails[0]["details"]["img8"],
    },
  ];
  return (
    <div>
      <ImageGallery autoPlay={true} items={images} />
    </div>
  );
};

export default ProductImages;
