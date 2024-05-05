import React, { useEffect, useRef, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear';
export const SingleFilterComponent = ()=> {
  const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState('100px'); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const [filterItems,setFilterItems]=useState([])


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

  // Run once at intially when this component will render.
  useEffect(() => {
    updateInputWidth();
  }, []);
  const handleInputClick = (event) => {
    setIsDropdownOpen(!isDropdownOpen);
  };



  return (
    <div className="flex flex-col">
      <div className="flex  justify-between rounded-md shadow-s border-2 border-gray-300 items-center"
      onClick={handleInputClick}>
        <div className="flex rounded-sm bg-gray-300 px-1 mx-1">
          <div className="name text-gray-800 ">
            Android
          </div>
          <ClearIcon className='clearCurrentFilter p-1'></ClearIcon>
        </div>
      <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Role"
            className="bg-transparent text-gray-600 focus:outline-none p-2 "
            style={{ width: inputWidth }}
          />
          <ClearIcon className='clearAllFilters p-1'></ClearIcon>
          <div className="border-l-2 border-gray-400 px-2">
          <ExpandMoreIcon className='hover:cursor-pointer '></ExpandMoreIcon>
          </div>
         
      </div>
      {isDropdownOpen && (
        <div className="flex flex-col mt-2 rounded-md shadow-md">
        <div className="text-gray-500 text-md p-2 flex justify-start hover:bg-slate-200 pl-4">Software Developer</div>
        <div className="text-gray-500 text-md p-2 ">Software Developer</div>
        <div className="text-gray-500 text-md p-2 ">Software Developer</div>
        <div className="text-gray-500 text-md p-2 ">Software Developer</div>
        <div className="text-gray-500 text-md p-2 ">Software Developer</div>
      </div>
      )}
      
    </div>
  );
}
