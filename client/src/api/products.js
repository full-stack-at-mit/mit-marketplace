import axios from "axios";
// sends cookies back to server
axios.defaults.withCredentials = true;

export async function createProduct(productData) {
  return await axios.post(
    "http://localhost:8000/api/create-product",
    productData
  );
}
