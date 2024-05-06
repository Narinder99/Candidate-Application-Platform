import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './JobsData'
import filterReducer from './Filters'

export default configureStore({
    reducer: {
        Jobs: jobsReducer,
        Filters:filterReducer
    }
    
  })