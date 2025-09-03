import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmount:0
}

const sotuvSlice = createSlice({
  name:"Sotuv",
  initialState,
  reducers:{
    setTotalAmount:(state,action) => {state.totalAmount = action.payload}
  }
})

export const {setTotalAmount} = sotuvSlice.actions;
export default sotuvSlice.reducer