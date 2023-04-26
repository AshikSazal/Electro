import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [],
  totalQuantity: 0,
  totalPrice:0,
  changed: false
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    replaceCart: (state, action) => {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items;
      state.totalPrice = action.payload.totalPrice
      state.changed=true;
    },
    removeCartItem: (state, action) => {
      const id = action.payload.id;
      const existingItem = state.items.find((item) => item.cart.prod_id === id);
      state.totalQuantity--;
      state.changed = true;
      if(existingItem.cart.quantity === 1){
        state.items = state.items.filter(item => item.cart.prod_id !==id );
      } else{
        existingItem.cart.quantity--;
        existingItem.cart.price = existingItem.cart.price - existingItem.product.price;
      }
      state.totalPrice = state.totalPrice - existingItem.product.price;
      state.changed=true;
    },
  },
});

export const {replaceCart, removeCartItem } = cartSlice.actions;
export default cartSlice.reducer;
