import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";

import "./Product.css";
const Product = ({ name, id, imgURL, price }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = () => {
    setIsLoading(true);


     setTimeout(() => {
      dispatch(
        cartActions.addToCart({
          name,
          id,
          price,
        })
      );
      setIsLoading(false); // Stop loading after dispatch
    }, 1000); // Adjust delay time as needed
  };
  return (
    <div className="card">
      <img src={imgURL} alt={name} />
      <h2>{name}</h2>
      <p>$ {price}</p>
      <button onClick={addToCart} disabled={isLoading}>
      {isLoading ? "Adding..." : "Add to cart"}
      </button>
    </div>
  );
};

export default Product;