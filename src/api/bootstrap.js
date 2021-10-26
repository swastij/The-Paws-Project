import axios from 'axios';

export const JSONClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        "Content-Type": "application/json"
    }
})

export const URLEncodedClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
})

export const FORMClient = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        "Content-Type": "multipart/form-data"
    }
})