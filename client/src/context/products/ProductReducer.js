import {
  GET_PRODUCTS,
  GET_PRODUCT_INFO,
  GET_PRODUCT_STYLES,
  GET_RELATED_PRODUCTS,
  GET_CURRENT_STYLE,
  SET_LOADING
} from '../types';

export default (state, action) => {
  switch(action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
     }
    case GET_PRODUCT_INFO:
      return {
        ...state,
        productInfo: action.payload
      }
    case GET_PRODUCT_STYLES:
      return {
        ...state,
        productStyles: action.payload,
        currentStyle: action.payload.results.find((product) => product.default_style == true)
        //change back to default?
      }
    case GET_CURRENT_STYLE:
      return {
        ...state,
        currentStyle: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}