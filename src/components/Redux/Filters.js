import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listsByFilter: {},// lists by filters
    filteredData:[],//filtered data list
    filters:{},// all filters which we will apply on our data
  };
  
  export const filtersSlice = createSlice({
    name: 'Filters',
    initialState,
    reducers: {
      addFilterData:(state,action)=>{
        //console.log("data added",action.payload)
        state.filteredData.push(action.payload);
      },
      clearFilterData:(state,action)=>{
        console.log("list Cleaed")
        state.filteredData=[];// clear the filtered list
      },
      addFilter: (state, action) => {
        const { key, data } = action.payload;
        // Create a new object with the updated filters
        const updatedFilters = {
          ...state.filters,
          [key]: state.filters[key] ? [...state.filters[key], data] : [data]
        };
        // Update the state with the new filters object
        state.filters = updatedFilters;
      },
      deleteFilter: (state, action) => {
        const { key, data } = action.payload;
        //console.log("deleteFilter ",key,data);
        if (state.filters[key]) {
          state.filters[key] = state.filters[key].filter(item => item !== data);
          if (state.filters[key].length === 0) {// if in filter type there is no filter then delete that
          delete state.filters[key];
        }
        }
      },
      deleteFilterType: (state, action) => {// created this because of Experience,companyName and salary
       // console.log("deleteFilterType ",action.payload);
          delete state.filters[action.payload];
      },
      

      // addListsByFilter: (state, action) => {
      //   const { category, subcategory, data } = action.payload;
      //   if (!state.allData[category]) {
      //     state.allData[category] = {};
      //   }
      //   if (!state.allData[category][subcategory]) {
      //     state.allData[category][subcategory] = [];
      //   }
      //   state.allData[category][subcategory].push(data);
      // },
      // deleteListsByFilter: (state, action) => {
      //   const { category, subcategory } = action.payload;
      //   if (subcategory) {
      //     if (state.allData[category] && state.allData[category][subcategory]) {
      //       delete state.allData[category][subcategory];
      //     }
      //   } else {
      //     if (state.allData[category]) {
      //       delete state.allData[category];
      //     }
      //   }
      // },
    },
  });
  
  export const {addFilterData,clearFilterData,addFilter,deleteFilter,deleteFilterType,addListsByFilter,deleteListsByFilter} = filtersSlice.actions;
  export default filtersSlice.reducer;