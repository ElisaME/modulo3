import axios from 'axios';
const baseURL = process.env.NODE_ENV === 'production' ? 'https://arcane-plateau-89806.herokuapp.com/api' : 'http://localhost:3000/api';

  //const baseURL = 'http://localhost:3000/api'

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
  },
  deleteEvent: async() => {
    return await SERVICE.delete('/eraseEvent/:id')
  },
  newEvent: async(event) => {
    return await SERVICE.post('/newEvent', event)
  },
  sendTest: async(data) => {
    return await SERVICE.post('/test', data)
  }
};

export default AUTH_SERVICE;