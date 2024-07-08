import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notification: "",
  },
  reducers: {
    addNotification : (state,action)=>{
      state.notification = action.payload
      
    }
}})

export const {addNotification} = notificationSlice.actions

export default notificationSlice.reducer