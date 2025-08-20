import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  bakerRoomId:'',
  balance:0
}


const expenseSlice = createSlice({
  name:"Expense",
  initialState,
  reducers:{
    setBakerRoom : (state,action:PayloadAction<[string, number]>) => {
      state.bakerRoomId = action.payload[0];
      state.balance = action.payload[1]
    }
  }
})

export const {setBakerRoom} = expenseSlice.actions;
export default expenseSlice.reducer