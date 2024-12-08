import React from "react";
import "../stylesheets/ItemCard.css";
import Cheese from "../assets/healthiest-cheese-swiss.jpg";
import { Link } from "react-router-dom";

const ItemCard = ({ product }) => {
  return (
  
    <Link to = {`/item/${product.id}`} className="product-card">
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
    </Link>
  );
};

export default ItemCard;
