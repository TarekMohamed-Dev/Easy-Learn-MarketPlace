// Importing the configured Axios client instance
const { default: axiosClient } = require('./axiosClient');

// Function to fetch the latest products
const getLatestProducts = () => axiosClient.get('/products?populate=*');

// Function to fetch a product by its ID
const getProductById = (id) => axiosClient.get(`/products/${id}?populate=*`);

// Function to fetch products by category
const getProductsByCategory = (category) => axiosClient.get(`/products?filters[category][$eq]=${category}&populate=*`);

// Exporting the functions for use in other modules
export default {
    getLatestProducts,
    getProductById,
    getProductsByCategory
};
