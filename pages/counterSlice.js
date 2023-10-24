import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: {value: 0},
  reducers: {
    up: (state, action) => {
      console.log(action);
      // 개발자가 직접 불변하게 데이터를 처리하지 않아도 된다
      state.value += action.payload;
    }
  }
})

export default counterSlice;
export const { up } = counterSlice.actions;