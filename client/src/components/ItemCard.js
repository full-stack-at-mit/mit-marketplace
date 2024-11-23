import React from "react";
import "../stylesheets/ItemCard.css";
import Cheese from "../assets/healthiest-cheese-swiss.jpg";

const ItemCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="img-container">
        <img
          className="product-image"
          src={product.image || Cheese}
          alt={product.title}
        />
      </div>
      <h2 className="product-title">{product.title}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price}</p>
    </div>
  );
};

export default ItemCard;
