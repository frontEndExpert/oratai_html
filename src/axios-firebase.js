import axios from 'axios';
//API-Key (secret) AIzaSyDW7ozYaZ9Z8_6pqHnyeVIJFNgwEkKrD_A
const instance = axios.create({
    baseURL: 'https://oratai-2018.firebaseio.com/'
});

export default instance;