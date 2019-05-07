import axios from 'axios';

export default {
    setupInterceptors: (store, history) => {
  
        axios.interceptors.response.use(response => {
          return response;
        }, error => {
  
        if (error.response.status === 401) {
          // store.dispatch(logoutUser());
        }
  
        if (error.response.status === 404) {
           history.push('/not-found');
        }
  
        return Promise.reject(error);
      });
    },
  };