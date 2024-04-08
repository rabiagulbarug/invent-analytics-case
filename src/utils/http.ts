import axios from 'axios';

const http = axios.create({
    baseURL: "https://www.omdbapi.com/",
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});
export default http;
