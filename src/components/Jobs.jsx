import React from 'react'
import { SingleJobDetails } from './SingleJobDetails'

export const Jobs = () => {
  return (
    <div className="mainClass">
    <div className=" grid grid-cols-2 gap-14 m-14">
        <SingleJobDetails></SingleJobDetails>
        <SingleJobDetails></SingleJobDetails>
        <SingleJobDetails></SingleJobDetails>
        <SingleJobDetails></SingleJobDetails>
        <SingleJobDetails></SingleJobDetails>
        <SingleJobDetails></SingleJobDetails>
    </div>
    </div>
  )
}
