import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Add auth token to requests if available
API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userInfo')).token
    }`;
  }
  return req;
});

// User APIs
export const login = (email, password) => API.post('/users/login', { email, password });
export const register = (name, email, password) => API.post('/users', { name, email, password });
export const getUserProfile = () => API.get('/users/profile');

// Post APIs
export const fetchPosts = (keyword = '', pageNumber = '') => API.get(`/posts?keyword=${keyword}&pageNumber=${pageNumber}`);
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (post) => API.post('/posts', post);
export const updatePost = (id, post) => API.put(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Category APIs
export const fetchCategories = () => API.get('/categories');
export const createCategory = (category) => API.post('/categories', category);

export default API;