import React from "react";

const ProductCard = ({ product }) => {
    const {image , price} = product;
  return (
    <div className="card card-compact w-60 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title"></h2>
        <p>Price: {price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
