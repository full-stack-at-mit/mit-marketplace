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
          src={"https://plushiepulse.com/wp-content/uploads/2023/11/S628b97b2356846ffbac8ed47f6769954v.webp"}
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
