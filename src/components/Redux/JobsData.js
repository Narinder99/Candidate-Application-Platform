import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    Jobs: [], // initialize an empty array
  };
  
  export const jobsSlice = createSlice({
    name: 'Jobs',
    initialState,
    reducers: {
      addJob: (state, action) => {
        state.Jobs.push(action.payload); // add a new Job to the array
      },
    //   removeJob: (state, action) => {
    //     state.Jobs = state.Jobs.filter((obj) => obj.id !== action.payload); // remove an Job by id
    //   },
    },
  });
  
  export const { addJob } = jobsSlice.actions;
  export default jobsSlice.reducer;