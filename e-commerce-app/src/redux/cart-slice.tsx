import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { productInfo } from "../common/types";

export type CartState = {
  value: {
    product: {
      title: string;
      rating: any;
      id: number;
      name: string;
      price: number;
      image: string;
      category: string;
      quantity: number;
    } & productInfo;
    quantity: number;
  }[];
};

const cartSlice = createSlice<CartState, SliceCaseReducers<CartState>>({
  name: "cart",
  initialState: {
    value: [],
  } as CartState,
  reducers: {
    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existingProd = state.value.find(
        ({ product: item }) => item.id === product.id
      );
      if (existingProd) {
        existingProd.quantity += 1;
      } else {
        state.value.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      const { product } = action.payload;
      const index = state.value.findIndex(
        ({ product: item }) => item.id === product.id
      );
      if (index !== -1) {
        const existingProd = state.value[index];
        if (existingProd.quantity === 1) {
          state.value.splice(index, 1);
        } else {
          existingProd.quantity -= 1;
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
