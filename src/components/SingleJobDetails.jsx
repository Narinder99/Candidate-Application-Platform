import React, { useState } from 'react'
import '../components/css/SingleJobDetails.css'
export const SingleJobDetails = ({prop}) => {
    const [showMore, setShowMore] = useState(false);
    const textLength=100;
  const truncatedText = prop.jobDetailsFromCompany.slice(0, textLength);

  const toggleExpanded = () => {
    setShowMore(!showMore);
  };
  return (
    <div className='jobsDetail rounded-md shadow-md hover:scale-105 bg-slate-100 p-3'>
        <div className="innerComponent flex flex-col">

            <div className="jobName flex">
                <div className="logo flex items-start w-10 h-10 bg-black rounded-md"></div>
                <div className="nameLoc flex flex-col pl-4">
                    <div className="companyName text-md text-gray-500 font-semibold flex justify-start">{prop.companyName}</div>
                    <div className="role text-sm flex justify-start">{prop.jobRole}</div>
                    <div className="companyLoc text-xs flex justify-start">{prop.location}</div>
                </div>
            </div>
            
            <div className="description flex flex-col mt-6 justify-start">
                <div className="AboutCompany text-black text-md flex justify-start">About Company:</div>
                <div className="relative flex justify-center">
                <p className="text text-black text-start"  >{showMore ? prop.jobDetailsFromCompany : `${truncatedText}...`}</p>
      {prop.jobDetailsFromCompany.length > textLength && (
        <div className='showMore absolute bottom-0 text-sm font-semibold text-blue-600 pt-16 hover:cursor-pointer' 
        onClick={toggleExpanded}> {showMore ? "Show less" : "Show more"}</div>
      )}                
      
            </div>
            </div>
            <div className="experience flex flex-col mt-3">
                <div className="text-md text-gray-500 text-md flex justify-start">Minimum Experience:</div>
                <div className="experienceYear text-gray-700 text-sm flex justify-start">{prop.minExp} Years</div>
            </div>
            <div className="apply mt-3 bg-orange-700 text-white rounded-md shadow-md p-2 flex justify-center items-center hover:cursor-pointer ">Apply</div>
        </div>

    </div>
  )
}
