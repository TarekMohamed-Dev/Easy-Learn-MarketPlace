// Importing the configured Axios client instance
const { default: axiosClient } = require('./axiosClient');

// Function to add an item to the cart
const AddToCart = (payload) => axiosClient.post('/carts', payload);

// Function to get user's cart items
const getUserCartItems = (email) => axiosClient.get(`carts?populate[products][populate]=image&filters[email][$eq]=${email}`);

// Function to delete a cart item
const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`);

// Exporting the functions for use in other modules
export default {
    AddToCart,
    getUserCartItems,
    deleteCartItem
};
