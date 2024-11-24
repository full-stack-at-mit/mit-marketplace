import axios from "axios";
// sends cookies back to server
axios.defaults.withCredentials = true;

export async function createProduct(productData) {
  return await axios.post(
    "http://localhost:8000/api/create-product",
    productData
  );
}

export async function getItemByID(id) {
  return await axios.get(
    `http://localhost:8000/api/get-item/${id}`
  );
}

// gets both products and services
export async function getAllProducts() {
  return await axios.get(
    "http://localhost:8000/api/get-all-products"
  );
}

export const getProducts = async () => {
  return await axios.get("http://localhost:8000/api/products");
};

export const getServices = async () => {
  return await axios.get("http://localhost:8000/api/services");
};
