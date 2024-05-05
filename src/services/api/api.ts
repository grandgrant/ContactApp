import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';

export const baseAPI = axios.create({
    baseURL: "https://contact.herokuapp.com",
    timeout: 30000,
})

// export const baseAPI = fetchBaseQuery({
//     baseUrl: "https://contact.herokuapp.com",
//     timeout: 30000,
//     // prepareHeaders: (headers, api) => {
//     //     const token = (api.getState() as RootState).user;
//     //     // Handle token from redux
//     //     return headers;
//     // } 
// });