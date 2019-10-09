import axios from 'axios';
// process.env.NODE_ENV === 'production'
//   ? (const baseURL = 'https://arcane-plateau-89806.herokuapp.com')
//   : (const baseURL = 'http://localhost:3000/api');

  const baseURL = 'http://localhost:3000/api'

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
  editProfile: async (user) => {
    return await SERVICE.put('/profile', user);
  },
  createCareer: async(career) => {
    return await SERVICE.post('/createCareer', career);
  },
  asignCareer: async(career) => {
    return await SERVICE.post('/career/asign', career)
  }
};

export default AUTH_SERVICE;