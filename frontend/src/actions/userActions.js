import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS , USER_LOGIN_FAILURE, USER_LOGOUT ,
         USER_REGISTER_REQUEST , USER_REGISTER_SUCCESS , USER_REGISTER_FAILURE ,
         USER_DETAILS_REQUEST , USER_DETAILS_SUCCESS , USER_DETAILS_FAILURE , USER_DETAILS_RESET ,
         USER_UPDATE_PROFILE_REQUEST , USER_UPDATE_PROFILE_SUCCESS , USER_UPDATE_PROFILE_FAILURE ,
         USER_LIST_REQUEST , USER_LIST_SUCCESS , USER_LIST_FAILURE , USER_LIST_RESET ,
         USER_DELETE_REQUEST , USER_DELETE_SUCCESS , USER_DELETE_FAILURE , 
         USER_UPDATE_REQUEST , USER_UPDATE_SUCCESS , USER_UPDATE_FAILURE } from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import { emptyCart } from './cartActions'
import axios from 'axios'

export const login = (email , password) => async (dispatch) =>
{
    try
    {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json'}}

        const { data } = await axios.post('/api/users/login' , { email , password } , config)

        dispatch({ type: USER_LOGIN_SUCCESS , payload: data })

        localStorage.setItem('userInfo' , JSON.stringify(data))
    }
    catch(error)
    {
        dispatch({
                    type: USER_LOGIN_FAILURE , 
                    payload: error.response && error.response.data.message ? error.response.data.message : error.message
                })
    }
}

export const logout = () => (dispatch) =>
{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')

    dispatch(emptyCart())
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_DETAILS_RESET })
    dispatch({ type: ORDER_LIST_MY_RESET })
    dispatch({ type: USER_LIST_RESET })
}

export const register = (name , email , password) => async (dispatch) =>
{
    try
    {
        dispatch({ type: USER_REGISTER_REQUEST })

        const config = { headers: { 'Content-Type': 'application/json'}}

        const { data } = await axios.post('/api/users' , { name , email , password } , config)

        dispatch({ type: USER_REGISTER_SUCCESS , payload: data })

        dispatch({ type: USER_LOGIN_SUCCESS , payload: data })

        localStorage.setItem('userInfo' , JSON.stringify(data))
    }
    catch(error)
    {
        dispatch({
                    type: USER_REGISTER_FAILURE , 
                    payload: error.response && error.response.data.message ? error.response.data.message : error.message
                })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) =>
{
    try
    {
        dispatch({
                    type: USER_DETAILS_REQUEST,
                })
  
      const { userLogin: { userInfo }, } = getState()
  
      const config = { headers: { Authorization: `Bearer ${userInfo.token}`, }, }
  
      const { data } = await axios.get(`/api/users/${id}`, config)
  
      dispatch({
                  type: USER_DETAILS_SUCCESS,
                  payload: data,
              })
    }
    catch(error)
    {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      
      if(message === 'Not authorized, token failed')
      {
         dispatch(logout())
      }

      dispatch({
                  type: USER_DETAILS_FAILURE,
                  payload: message,
              })
    }
}

export const updateUserProfile = (user) => async (dispatch , getState) =>
{
    try
    {
        dispatch({
                    type: USER_UPDATE_PROFILE_REQUEST,
                })
  
        const { userLogin: { userInfo }, } = getState()
  
        const config = { headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${userInfo.token}`, }, }
  
        const { data } = await axios.put(`/api/users/profile`, user , config)
  
        dispatch({
                     type: USER_UPDATE_PROFILE_SUCCESS,
                     payload: data,
                 })

        dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: data,
                })
                            
        localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error)
    {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      
      if(message === 'Not authorized, token failed')
      {
         dispatch(logout())
      }

      dispatch({
                  type: USER_UPDATE_PROFILE_FAILURE,
                  payload: message,
              })
    }
}

export const listUsers = () => async (dispatch , getState) =>
{
    try
    {
        dispatch({ type: USER_LIST_REQUEST , })
  
      const { userLogin: { userInfo } , } = getState()
  
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` , } , }
  
      const { data } = await axios.get(`/api/users` , config)

      data.sort((e1 , e2) =>
                {
                    if((!e1.isAdmin && !e2.isAdmin) || (e1.isAdmin && e2.isAdmin))
                    {
                        if(e1.name < e2.name) return -1

                        if(e1.name > e2.name) return 1

                        return 0
                    }

                    if(e1.isAdmin) return -1

                    if(e2.isAdmin) return 1

                    return 0
                })
  
      dispatch({ type: USER_LIST_SUCCESS , payload: data , })
    }
    catch(error)
    {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
    
        dispatch({
                    type: USER_LIST_FAILURE,
                    payload: message,
                })
    }
}

export const deleteUser = (id) => async (dispatch , getState) =>
{
    try
    {
        dispatch({ type: USER_DELETE_REQUEST , })
  
      const { userLogin: { userInfo } , } = getState()
  
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` , } , }
  
      await axios.delete(`/api/users/${id}` , config)
  
      dispatch({ type: USER_DELETE_SUCCESS })
    }
    catch (error)
    {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

      dispatch({
                    type: USER_DELETE_FAILURE,
                    payload: message,
                })
    }
}

export const updateUser = (user) => async (dispatch , getState) =>
{
    try
    {
        dispatch({ type: USER_UPDATE_REQUEST , })
  
        const { userLogin: { userInfo } , } = getState()
    
        const config = { headers: { 'Content-Type': 'application/json' , Authorization: `Bearer ${userInfo.token}` , } , }
    
        const { data } = await axios.put(`/api/users/${user._id}` , user , config)
    
        dispatch({ type: USER_UPDATE_SUCCESS })
    
        dispatch({ type: USER_DETAILS_SUCCESS , payload: data })
    
        dispatch({ type: USER_DETAILS_RESET })
    }
    catch (error)
    {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message

        dispatch({
                    type: USER_UPDATE_FAILURE,
                    payload: message,
                })
    }
}