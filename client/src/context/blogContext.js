import { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BlogContext = createContext();

const initialState = {
  posts: [],
  post: {},
  categories: [],
  loading: false,
  error: null,
  pages: 1,
  page: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        posts: action.payload.posts,
        pages: action.payload.pages,
        page: action.payload.page,
        loading: false,
      };
    case 'FETCH_POST_SUCCESS':
      return { ...state, post: action.payload, loading: false };
    case 'FETCH_CATEGORIES_SUCCESS':
      return { ...state, categories: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_SUCCESS':
      return { ...state, loading: false };
    case 'UPDATE_SUCCESS':
      return { ...state, loading: false };
    case 'DELETE_SUCCESS':
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Get all posts
  const getPosts = async (keyword = '', pageNumber = '') => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await axios.get(
        `/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: 'FETCH_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // Get single post
  const getPostById = async (id) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await axios.get(`/api/posts/${id}`);
      dispatch({
        type: 'FETCH_POST_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // Get all categories
  const getCategories = async () => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await axios.get('/api/categories');
      dispatch({
        type: 'FETCH_CATEGORIES_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  // Create a post
  const createPost = async (post) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await axios.post('/api/posts', post, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Post created successfully');
      return data;
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  // Update a post
  const updatePost = async (post) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await axios.put(`/api/posts/${post._id}`, post, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'UPDATE_SUCCESS' });
      toast.success('Post updated successfully');
      return data;
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  // Delete a post
  const deletePost = async (id) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      await axios.delete(`/api/posts/${id}`);
      dispatch({ type: 'DELETE_SUCCESS' });
      toast.success('Post deleted successfully');
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  // Create a category
  const createCategory = async (category) => {
    dispatch({ type: 'FETCH_REQUEST' });
    try {
      const { data } = await axios.post('/api/categories', category, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch({ type: 'CREATE_SUCCESS' });
      toast.success('Category created successfully');
      return data;
    } catch (error) {
      dispatch({
        type: 'FETCH_FAIL',
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <BlogContext.Provider
      value={{
        state,
        getPosts,
        getPostById,
        getCategories,
        createPost,
        updatePost,
        deletePost,
        createCategory,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);