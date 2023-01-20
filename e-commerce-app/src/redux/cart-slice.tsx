import {
  createSlice,
  CreateSliceOptions,
  PayloadAction,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

type CartState = {
  value: string[];
};

const cartSlice = createSlice<CartState, SliceCaseReducers<CartState>>({
  name: "cart",
  initialState: {
    value: [],
  } as CartState,
  reducers: {
    addToCart(state, action) {
      console.log(action);
      state.value.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
