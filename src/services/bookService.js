import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_SERVER;

export const getAllBooks = async() => {
    try {
        const response = await axios.get(`${API_URL}/api/books/`, { 
            headers : {
                "authorization" : `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || error;
    }
};

export const createBook = async( formData ) => {
    try {
        const response = await axios.post(`${API_URL}/api/books/`, formData,
            { 
                headers : {
                    "Content-Type": "multipart/form-data",
                    "authorization" : `Bearer ${Cookies.get('token')}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error.response || error;
    }
};

export const updateBook = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/api/books/${id}`, formData, {
            headers : {
                "Content-Type": "multipart/form-data",
                "authorization" : `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;;
    } catch (error) {
        throw error.response || error;
    }
};

export const favourite = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/api/books/${id}`, {
            headers : {
              "authorization" : `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;
    } catch (error) {
        throw error.response || error;
    }
};

export const deleteBook = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/api/books/${id}`, {
            headers : {
                "authorization" : `Bearer ${Cookies.get('token')}`
            }
        });
        return response.data;;
    } catch (error) {
        throw error.response || error;
    }
};