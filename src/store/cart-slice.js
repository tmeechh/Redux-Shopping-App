import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: [],
    totalQuantity: 0,
    showCart: false,
    changed: false,
  },
 
  reducers: {
    replaceData(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.itemsList = action.payload.itemsList;
    },
    addToCart(state, action) {
      state.changed = true;
      const newItem = action.payload;
      const existingItemIndex = state.itemsList.findIndex(
        (item) => item.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.itemsList[existingItemIndex].quantity++;
        state.itemsList[existingItemIndex].totalPrice +=
          newItem.price;
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
        });
      }
      state.totalQuantity++;
    },
    removeFromCart(state, action) {
      state.changed = true;
      const id = action.payload;
      const existingItemIndex = state.itemsList.findIndex(
        (item) => item.id === id
      );
      if (existingItemIndex !== -1) {
        if (state.itemsList[existingItemIndex].quantity === 1) {
          state.itemsList.splice(existingItemIndex, 1);
        } else {
          state.itemsList[existingItemIndex].quantity--;
          state.itemsList[existingItemIndex].totalPrice -=
            state.itemsList[existingItemIndex].price;
        }
        state.totalQuantity--;
      }
    },
    setShowCart(state) {
      state.showCart = !state.showCart;
    },
  },
});



export const cartActions = cartSlice.actions;

export default cartSlice;