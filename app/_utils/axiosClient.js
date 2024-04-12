// Importing Axios library
const { default: axios } = require('axios')

// Retrieving API key from environment variables
const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;

// API base URL
const apiUrl = 'http://localhost:1337/api';

// Creating an instance of Axios client with custom configuration
const axiosClient = axios.create({
    // Setting base URL for API requests
    baseURL: apiUrl,
    // Setting authorization header with API key
    headers: {
        Authorization: `Bearer ${apiKey}`
    }
});

// Exporting the configured Axios client instance
export default axiosClient;
