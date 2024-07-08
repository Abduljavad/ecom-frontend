import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "allCart",
  initialState: {
    carts:[],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.carts = [...state.carts,action.payload]
      state.quantity += action.payload.quantity;
      state.total += action.payload.quantity * action.payload.mrp;
    },
    removeFromCart: (state, action) => {
      const removedItem = state.carts.find(item => item._id === action.payload.productId);

      if (removedItem) {
        state.quantity -= removedItem.quantity;
        state.total -= removedItem.quantity * removedItem.mrp;
        state.carts = state.carts.filter(item => item._id !== action.payload.productId);
      }
    },
    addQuantity: (state, action) => {
      const item = state.carts.find(item => item.title === action.payload.title);
      if (item) {
        item.quantity++;
        state.quantity++;
        state.total += item.mrp;
      }
    },
    minusQuantity: (state, action) => {
      const item = state.carts.find(item => item.title === action.payload.title);
      if (item && item.quantity > 0) {
        item.quantity--;
        state.quantity--;
        state.total -= item.mrp;
      }
      
    },
    clearCart : (state)=>{
      state.carts = []
    }
    
  },
  
});


export const { addToCart, removeFromCart, addQuantity, minusQuantity,clearCart } = cartSlice.actions;

export default cartSlice.reducer;

