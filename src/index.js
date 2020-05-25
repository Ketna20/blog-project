import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

//this is handling error for sending request
var requestInterceptors = axios.interceptors.request.use(request => {
  console.log(request);
  // you can edit request before returning it, like set headers, etc.
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

var responseInterceptors = axios.interceptors.response.use(response => {
  console.log(response);
  // you can edit request before returning it, like set headers, etc.
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

/* To remove the interceptors:
 * store the refereance to the intercepor in a variable
 * axios.interceptors.request.eject(requestInterceptors);
 * axios.interceptors.response.eject(responseInterceptors);
*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
