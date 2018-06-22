import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://oratai-2018.firebaseio.com/'
});

export default instance;