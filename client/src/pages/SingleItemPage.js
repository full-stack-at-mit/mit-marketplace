import { useEffect, useState } from "react";
import "../stylesheets/SingleItemPage.css";
import { useParams } from "react-router-dom";
import { getItemByID } from "../api/products";
import { CalendarIcon, MapPinIcon, PhoneIcon, TagIcon } from 'lucide-react'


const SingleItemPage = () => {
  const { id } = useParams()
  const [items, setItems] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemByID(id);
        if (response.data.success) {
          setItems(response.data.items[0]);
          console.log(response.data.items[0]);
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
        <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={"https://www.kawaiies.com/cdn/shop/products/kawaiies-plushies-plush-softtoy-fluffy-banana-duck-crew-plushies-soft-toy-388339.jpg?v=1661877645"}
              alt={items.name}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
           
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src="https://www.kawaiies.com/cdn/shop/products/kawaiies-plushies-plush-softtoy-fluffy-banana-duck-crew-plushies-soft-toy-180373.jpg?v=1661877744"
                  alt={items.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src="https://m.media-amazon.com/images/I/816b2L6qlcL.jpg"
                  alt={items.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  src="https://www.bigsquishies.com/cdn/shop/products/O1CN01R5Blk029AsN9QDF4F__409278028.jpg?v=1710747517&width=416"
                  alt={items.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
          
          </div>
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{items.name}</h1>
          <p className="text-2xl font-semibold text-green-600">${items.price}</p>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            New {items.condition}
          </span>
          <p className="text-gray-600">{items.description}</p>
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Product Details</h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <TagIcon className="h-5 w-5 text-gray-400 mr-2" />
                    {items.category}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{items.category}</dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    Date Added
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{items.dateAdded}</dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                    Pickup
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{items.pickupDetails}</dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 flex items-center">
                    <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                    Contact
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{items.contact}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

       
         
        </>
      ) : (
        <p>Loading item...</p>
      )}
    </div>
  );


};

export default SingleItemPage;
