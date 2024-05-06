import React, { useEffect, useRef, useState } from "react";
import { SingleFilterComponent } from "./SingleFilterComponent";
import { useSelector, useDispatch } from "react-redux";
import {addFilterData,clearFilterData,addFilter,deleteFilter,deleteFilterType} from './Redux/Filters'
export const Filters = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputWidth, setInputWidth] = useState("130px"); // Initial width
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const dummyData = [
    {
      name: "Role",
      data: ["IOS", "Android", "Frontend", "Backend"],
    },
    {
      name: "Experience",
      data: [1, 2, 3, 4, 5, 6],
    },
    {
      name: "Location",
      data: ["Mumbai", "Chennai", "Delhi NCR", "bangalore"],
    },
    {
      name: "Remote",
      data: ["Remote", "Onsite"],
    },
    {
      name: "Min Base Pay (Lac)",
      data: [0, 10, 20, 30, 40, 50],
    },
  ];
  // Function to handle changes in the input value
  const handleInputChange = (event) => {
    dispatch(deleteFilterType("companyName"));
    if(event.target.value.length > 0 ){
    dispatch(addFilter({ key: "companyName", data: event.target.value }));
    }
    setInputValue(event.target.value);
    updateInputWidth(); // after every change we have to update the width
  };

  const updateInputWidth = () => {
    if (inputRef.current) {
      setInputWidth(
        `${Math.max(130, inputRef.current.value.length * 8 + 24)}px`
      ); // Adjusting the width dynamically
    }
  };


  return (
    <div className="flex flex-wrap justify-start  filters m-8">
      {dummyData.map((item,index)=>( // used map to traverse the array and send the data to
          <div className="m-2">
            <SingleFilterComponent
              className="px-2"
              prop={item}
            ></SingleFilterComponent>
          </div>
        )
      )}
      <div className="flex items-start">
      <div className="flex m-2 justify-between rounded-md shadow-s border-2 border-gray-300 items-center">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Company Name"
          className="bg-transparent text-gray-600 focus:outline-none p-2 "
          style={{ width: inputWidth }}
        />
      </div>
      </div>
    </div>
  );
};
