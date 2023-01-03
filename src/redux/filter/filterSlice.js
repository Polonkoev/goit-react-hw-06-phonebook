import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  filter: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    filter: (state, {payload}) =>{
        state.filter = payload
    }
  },
});

export const {filterContacts} = filterSlice.actions
export default filterSlice.reducer