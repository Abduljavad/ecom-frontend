import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    address: [],
  },
  reducers: {
    addAddress : (state,action)=>{
      state.address = action.payload
      
    }
}})

export const {addAddress} = addressSlice.actions

export default addressSlice.reducer