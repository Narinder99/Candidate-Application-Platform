import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './JobsData'

export default configureStore({
    reducer: {
        Jobs: jobsReducer
    }
  })