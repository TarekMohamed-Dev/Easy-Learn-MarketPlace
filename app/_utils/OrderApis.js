// Importing the configured Axios client instance
const { default: axiosClient } = require('./axiosClient');

// Function to create a new order
const createOrder = (data) => axiosClient.post('/orders', data);

// Exporting the function for use in other modules
export default {
    createOrder
};
