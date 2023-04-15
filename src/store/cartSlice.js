import { createSlice } from "@reduxjs/toolkit";

const initialCartState={
    items:[],
    totalQuantity: 0
}

const cartSlice = createSlice({
    name:"cart",
    initialState: initialCartState,
    reducers:{
        addItemToCart:(state, action)=>{
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            if(!existingItem){
                state.items.push({
                    itemId: newItem.id,
                    price:newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
            } else{
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItem:(state, action)=>{

        }
    }
})

export const { addItemToCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;