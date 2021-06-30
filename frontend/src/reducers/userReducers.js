import { USER_LOGIN_REQUEST , USER_LOGIN_SUCCESS , USER_LOGIN_FAILURE , USER_LOGOUT ,
         USER_REGISTER_REQUEST , USER_REGISTER_SUCCESS , USER_REGISTER_FAILURE ,
         USER_DETAILS_REQUEST , USER_DETAILS_SUCCESS , USER_DETAILS_FAILURE , USER_DETAILS_RESET ,
         USER_UPDATE_PROFILE_REQUEST , USER_UPDATE_PROFILE_SUCCESS , USER_UPDATE_PROFILE_FAILURE ,
         USER_LIST_REQUEST, USER_LIST_SUCCESS , USER_LIST_FAILURE , USER_LIST_RESET , 
         USER_DELETE_REQUEST , USER_DELETE_SUCCESS , USER_DELETE_FAILURE ,
         USER_UPDATE_REQUEST , USER_UPDATE_SUCCESS , USER_UPDATE_FAILURE , USER_UPDATE_RESET } from '../constants/userConstants'

export const userLoginReducer = (state = {} , action) =>
{
    switch (action.type)
    {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false , userInfo: action.payload }
        case USER_LOGIN_FAILURE:
            return { loading: false , error: action.payload }
        case USER_LOGOUT:
            return { }
        default:
            return state
    }
}

export const userRegisterReducer = (state = {} , action) =>
{
    switch (action.type)
    {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false , userInfo: action.payload }
        case USER_REGISTER_FAILURE:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}

export const userDetailsReducer = (state = { user: {} } , action) =>
{
    switch (action.type)
    {
        case USER_DETAILS_REQUEST:
            return { ...state , loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false , user: action.payload }
        case USER_DETAILS_FAILURE:
            return { loading: false , error: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = { user: {} } , action) =>
{
    switch (action.type)
    {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false , success: true , userInfo: action.payload }
        case USER_UPDATE_PROFILE_FAILURE:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] } , action) =>
{
    switch (action.type)
    {
        case USER_LIST_REQUEST:
            return { loading: true }
        case USER_LIST_SUCCESS:
            return { loading: false , users: action.payload }
        case USER_LIST_FAILURE:
            return { loading: false , error: action.payload }
        case USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}
  
export const userDeleteReducer = (state = {} , action) =>
{
    switch (action.type)
    {
        case USER_DELETE_REQUEST:
            return { loading: true }
        case USER_DELETE_SUCCESS:
            return { loading: false , success: true }
        case USER_DELETE_FAILURE:
            return { loading: false , error: action.payload }
        default:
            return state
    }
}

export const userUpdateReducer = (state = { user: {} } , action) =>
{
    switch (action.type)
    {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false , success: true }
        case USER_UPDATE_FAILURE:
            return { loading: false , error: action.payload }
        case USER_UPDATE_RESET:
            return { user: {} , }
      default:
        return state
    }
  }