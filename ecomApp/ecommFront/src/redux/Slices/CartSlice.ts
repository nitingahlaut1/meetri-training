import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const CartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    add: (state, action: PayloadAction<CartItem>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = CartSlice.actions;
export default CartSlice.reducer;
