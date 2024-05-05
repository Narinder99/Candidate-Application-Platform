import React, { useRef, useState } from "react";
import { SingleFilterComponent } from "./SingleFilterComponent";

export const Filters = () => {

  const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState('100px'); // Initial width
  const inputRef = useRef(null);

  // Function to handle changes in the input value
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    updateInputWidth();
  };

  const updateInputWidth = () => {
    if (inputRef.current) {
      setInputWidth(`${Math.max(100,inputRef.current.value.length * 8 + 24)}px`); // Adjusting the width dynamically
    }
  };

  // // Run once at intially when this component will render.
  // useEffect(() => {
  //   updateInputWidth();
  // }, []);

  return (
    <div className="flex flex-wrap justify-start  filters m-10">
      <div className="m-4">
        <SingleFilterComponent className="px-10"></SingleFilterComponent>
      </div>
      <div className="m-4">
        <SingleFilterComponent className="px-10"></SingleFilterComponent>
      </div>
      <div className="m-4">
        <SingleFilterComponent className="px-10"></SingleFilterComponent>
      </div>
      <div className="m-4">
        <SingleFilterComponent className="px-10"></SingleFilterComponent>
      </div>
      <div className="m-4">
        <SingleFilterComponent className="px-10"></SingleFilterComponent>
      </div>
      <div
        className="flex m-4 justify-between rounded-md shadow-s border-2 border-gray-300 items-center"
      >
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
  );
};
