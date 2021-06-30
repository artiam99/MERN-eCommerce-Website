import { PRODUCT_LIST_REQUEST , PRODUCT_LIST_SUCCESS , PRODUCT_LIST_FAILURE,
         PRODUCT_DETAILS_REQUEST , PRODUCT_DETAILS_SUCCESS , PRODUCT_DETAILS_FAILURE ,
         PRODUCT_DELETE_REQUEST , PRODUCT_DELETE_SUCCESS , PRODUCT_DELETE_FAILURE ,
         PRODUCT_CREATE_REQUEST , PRODUCT_CREATE_SUCCESS , PRODUCT_CREATE_FAILURE ,
         PRODUCT_UPDATE_REQUEST , PRODUCT_UPDATE_SUCCESS , PRODUCT_UPDATE_FAILURE ,
         PRODUCT_CREATE_REVIEW_REQUEST , PRODUCT_CREATE_REVIEW_SUCCESS , PRODUCT_CREATE_REVIEW_FAILURE ,
         PRODUCT_TOP_REQUEST , PRODUCT_TOP_SUCCESS , PRODUCT_TOP_FAILURE , } from '../constants/productConstants'
import axios from 'axios'

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) =>
{
    try
    {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get( `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({ type: PRODUCT_LIST_SUCCESS ,
                   payload: data
                })
    }
    catch (error)
    {
        dispatch({
                   type: PRODUCT_LIST_FAILURE , 
                   payload: error.response && error.response.data.message ? error.response.data.message : error.message
                })
    }
}


export const listProductDetails = (id) => async (dispatch) =>
{
    try
    {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({ type: PRODUCT_DETAILS_SUCCESS ,
                   payload: data
                })
    }
    catch (error)
    {
        dispatch({
                   type: PRODUCT_DETAILS_FAILURE , 
                   payload: error.response && error.response.data.message ? error.response.data.message : error.message
                })
    }
}

export const deleteProduct = (id) => async (dispatch , getState) =>
{
    try
    {
        dispatch({ type: PRODUCT_DELETE_REQUEST , })
    
        const { userLogin: { userInfo } , } = getState()
    
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` , } , }
    
        await axios.delete(`/api/products/${id}` , config)
    
        dispatch({ type: PRODUCT_DELETE_SUCCESS , })
    }
    catch(error)
    {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        
        dispatch({
                    type: PRODUCT_DELETE_FAILURE,
                    payload: message,
                })
    }
}
  
export const createProduct = () => async (dispatch , getState) =>
{
    try
    {
        dispatch({ type: PRODUCT_CREATE_REQUEST , })
  
        const { userLogin: { userInfo } , } = getState()
    
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` , } , }
    
        const { data } = await axios.post(`/api/products` , {} , config)
    
        dispatch({ type: PRODUCT_CREATE_SUCCESS , payload: data , })
    }
    catch(error)
    {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        dispatch({
                    type: PRODUCT_CREATE_FAILURE,
                    payload: message,
                })
    }
}
  
export const updateProduct = (product) => async (dispatch , getState) =>
{
    try
    {
        dispatch({ type: PRODUCT_UPDATE_REQUEST , })
    
        const { userLogin: { userInfo } , } = getState()
    
        const config = { headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${userInfo.token}` , } , }
    
        const { data } = await axios.put(`/api/products/${product._id}` , product , config)
    
        dispatch({ type: PRODUCT_UPDATE_SUCCESS , payload: data , })

        dispatch({ type: PRODUCT_DETAILS_SUCCESS , payload: data })
    }
    catch(error)
    {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
       
      dispatch({
                    type: PRODUCT_UPDATE_FAILURE,
                    payload: message,
              })
    }
}
  
export const createProductReview = (productId , review) => async (dispatch , getState) =>
{
    try
    {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST , })
  
        const { userLogin: { userInfo } , } = getState()
    
        const config = { headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${userInfo.token}` , } , }
    
        await axios.post(`/api/products/${productId}/reviews` , review , config)
    
        dispatch({ type: PRODUCT_CREATE_REVIEW_SUCCESS , })
    }
    catch(error)
    {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

      dispatch({
                    type: PRODUCT_CREATE_REVIEW_FAILURE,
                    payload: message,
               })
    }
}
  
export const listTopProducts = () => async (dispatch) =>
{
    try
    {
        dispatch({ type: PRODUCT_TOP_REQUEST })
  
        const { data } = await axios.get(`/api/products/top`)
  
        dispatch({ type: PRODUCT_TOP_SUCCESS , payload: data , })
    }
    catch(error)
    {
        dispatch({
                    type: PRODUCT_TOP_FAILURE,
                    payload: error.response && error.response.data.message ? error.response.data.message : error.message ,
                })
    }
}