import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from '../Features/Auth/authSlice'
import cartReducer from  '../Features/Cart/cartSlice'
import addressReducer from '../Features/Address/addressSlice'
import notificationReducer from '../Features/Notifications/notificationSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'

const persistConfig = {
  key :'root',
  storage,
  whitelist : ['auth', 'allCart', 'notifications']
}

const reducer = combineReducers({
  auth : authReducer,
  allCart : cartReducer,
  address : addressReducer,
  notifications : notificationReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)
export const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleWare)=>
  getDefaultMiddleWare({
    serializableCheck : {
      ignoredActions : [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    },
  })
})
