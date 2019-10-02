import axios from 'axios';
const baseURL = 'http://localhost:3000/auth'

const SERVICE = axios.create({ withCredentials: true, baseURL });

const AUTH_SERVICE = {
  signup: async (user) => {
    return await SERVICE.post('/signup', user);
  },
  login: async (user) => {
    return await SERVICE.post('/login', user);
  },
  logOut: async () => {
    return await SERVICE.get('/logout');
  },
  profile: async () => {
    return await SERVICE.get('/profile');
  },
  editProfile: async () => {
    return await SERVICE.put('/profile');
  }
};

export default AUTH_SERVICE;