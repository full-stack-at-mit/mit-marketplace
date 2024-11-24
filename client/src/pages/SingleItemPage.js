import { useEffect, useState } from "react";
import "../stylesheets/SingleItemPage.css";
import { useParams } from "react-router-dom";
import { getItemByID } from "../api/products";

const SingleItemPage = () => {
  const { id } = useParams()
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemByID(id);
        if (response.data.success) {
          setItems(response.data.items);
        } else {
          console.error(response.data.message);
          setItems(null);
        }
      } catch (error) {
        console.error("Failed to fetch item:", error);
      }
    };

    fetchItem();
  }, [id]);


  return (
    <div>
      {items ? (
        <>
          <h1 >{items.name}</h1>
          <h2 className="text-gray-300 font-bold w-16">Cost: $1000</h2>
          <h2>Contact Jensen Coonradt at coonradt@mit.edu to purchase</h2>
          <br />
          <p>Description: This item is a one-of-a-kind banana duck. Banana ducks are the most glorious animal on this planet, so you should appreciate this glorious item</p>
          <img
            src="https://www.kawaiies.com/cdn/shop/products/kawaiies-plushies-plush-softtoy-fluffy-banana-duck-crew-plushies-soft-toy-388339.jpg?v=1661877645"
            alt="Banana Duck"
          />
        </>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );


};

export default SingleItemPage;
