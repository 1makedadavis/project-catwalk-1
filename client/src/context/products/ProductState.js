import React, { useReducer, useEffect } from 'react';
import Axios from 'axios';
import ProductContext from './ProductContext.js';
import ProductReducer from './ProductReducer.js';

import {
  GET_PRODUCTS,
  GET_PRODUCT_INFO,
  GET_PRODUCT_STYLES,
  GET_RELATED_PRODUCTS,
  GET_CURRENT_STYLE,
  SET_LOADING
} from '../types';

const API_URL = '/api/products';

const ProductState = props => {
  const initialState = {
    products: [],
    productStyles: [],
    productInfo: {},
    currentStyle: {},
    relatedProducts: [],
    loading: false
  }

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  // GET PRODUCTS
  useEffect(() => {
    getProductInfo('1');
    getProductStyles('1');
  }, [])

  const getProducts = async () => {
    const res = await Axios.get(`${API_URL}`);

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  }

  const getProductInfo = async (id) => {
    const res = await Axios.get(`${API_URL}/${id}`);

    dispatch({
      type: GET_PRODUCT_INFO,
      payload: res.data
    })
  }

  const getProductStyles = async (id) => {
    console.log("PRODID", id)
    const res = await Axios.get(`${API_URL}/${id}/styles`);

    dispatch({
      type: GET_PRODUCT_STYLES,
      payload: res.data
    })
  }

  const getCurrentStyle = (id) => {
    console.log("ID", id)
    const res = state.productStyles.results.find((product) => product.id == id);
    console.log("CURRENT", id, state.productStyles.result, res)
    dispatch({
      type: GET_CURRENT_STYLE,
      payload: res
    })
  }

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        productStyles: state.productStyles,
        productInfo: state.productInfo,
        relatedProducts: state.relatedProducts,
        currentStyle: state.currentStyle,
        loading: state.loading,
        getProducts,
        getProductInfo,
        getProductStyles,
        getCurrentStyle,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  )
}

export default ProductState;