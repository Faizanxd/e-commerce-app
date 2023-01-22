import {
  createSlice,
  CreateSliceOptions,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

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
    };
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
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
