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
  return await axios.get(`http://localhost:8000/api/get-item/${id}`);
}

// gets both products and services
export async function getAllProducts() {
  return await axios.get("http://localhost:8000/api/get-all-products");
}

export const getProducts = async () => {
  return await axios.get("http://localhost:8000/api/products");
};

export const getServices = async () => {
  return await axios.get("http://localhost:8000/api/services");
};

export const uploadImageS3 = async (file) => {
  console.log(file.name, file.type);
  const response = await axios.get(
    "http://localhost:8000/api/generate-presigned-url",
    {
      params: { fileName: file.name, fileType: file.type },
    }
  );

  console.log(response);
  if (response.status !== 200) {
    console.log(
      `unable to generate presigned url because of: ${response.data.error}`
    );
    alert(response.data.error);
    return;
  }

  const { url } = response.data;
  await axios.put(url, file);
  const accessUrl = url.split("?")[0];
  return accessUrl;
};
