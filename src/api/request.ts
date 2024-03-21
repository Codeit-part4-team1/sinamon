import axios from 'axios';
// import { getHeader } from './network';

export const request = axios.create({
  baseURL: 'https://sp-globalnomad-api.vercel.app/2-1',
  timeout: 1000,
});

// export const axiosAuthInstance = () => {
//   const instance = axios.create({
//     baseURL: 'https://sp-taskify-api.vercel.app/2-10/',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     timeout: 2500,
//   });

//   instance.interceptors.request.use(
//     (config) => {
//       const token = getHeader();
//       if (token) {
//         config.headers.Authorization = token.Authorization;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     },
//   );
//   instance.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       return Promise.reject(error);
//     },
//   );

//   return instance;
// };
