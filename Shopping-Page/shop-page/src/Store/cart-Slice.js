import { createSlice } from "@reduxjs/toolkit";

const cartSlice =  createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(cart,action) {
            const item = action.payload;
            const existingItem = state.items.find( item => item.id === newItem.id);
            if(!existingItem){
                state.items.push({
                    itemId : newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    name: newItem.title,
                })
            } else {
                existingItem.quantity = existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },

        removeItemFromCart(state,action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if(existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity-- ; 
            }
        }

    }
})

export const cartActions = cartSlice.action;

export default cartSlice;