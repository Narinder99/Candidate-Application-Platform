import React, { useEffect, useRef, useState } from "react";
import { SingleFilterComponent } from "./SingleFilterComponent";
import { useSelector, useDispatch } from "react-redux";
import { addJob } from "./Redux/JobsData";
export const Filters = () => {
  const [inputValue, setInputValue] = useState("");
  const [inputWidth, setInputWidth] = useState("130px"); // Initial width
  const inputRef = useRef(null);
  const Jobs = useSelector((state) => state.Jobs.Jobs);
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
    <div className="flex flex-wrap justify-start  filters m-10">
      {dummyData.map((item,index)=>( // used map to traverse the array and send the data to
          <div className="m-4">
            <SingleFilterComponent
              className="px-4"
              prop={item}
            ></SingleFilterComponent>
          </div>
        )
      )}
      <div className="flex items-start">
      <div className="flex m-4 justify-between rounded-md shadow-s border-2 border-gray-300 items-center">
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
