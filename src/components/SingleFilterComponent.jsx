import React, { useEffect, useRef, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import {addFilterData,clearFilterList,addFilter,deleteFilter,deleteFilterType} from './Redux/Filters'

export const SingleFilterComponent = ({ prop }) => {
  const [inputValue, setInputValue] = useState("");
  const minLength = prop.name.length * 8 + 24;
  const [inputWidth, setInputWidth] = useState(minLength + "px");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const [filtersList, setFitersList] = useState([]);
  const dispatch = useDispatch();

  // Function to handle changes in the input value
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    updateInputWidth();
  };

  const updateInputWidth = () => {
    if (inputRef.current) {
      setInputWidth(
        `${Math.max(minLength, inputRef.current.value.length * 8 + 24)}px`
      ); // Adjusting the width dynamically
    }
  };

  // Run once at intially when this component will render.
  useEffect(() => {
    updateInputWidth();
  }, []);

  const handleInputClick = (event) => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const addFilterOnClick = (filter) => {
    if(prop.name === "Experience" || prop.name === "Min Base Pay (Lac)"){// if filters is one of them we will not add multiple filters
      setFitersList([filter]);
      dispatch(deleteFilterType(prop.name));
      dispatch(addFilter({ key: prop.name, data: filter }));
    }else{
      if (!filtersList.includes(filter)) {
        setFitersList((previous) => [...previous, filter]);
        dispatch(addFilter({ key: prop.name, data: filter }));
    }}    
    setIsDropdownOpen(false)
  };

  const clearFilterOnClick = (event) => {
    setFitersList([]);
    event.stopPropagation();
    setIsDropdownOpen(false)
    dispatch(deleteFilterType(prop.name));
    
  };

  const removeItemFromFilterOnClick = (item, event) => {
    setFitersList((previous) => previous.filter((filter) => filter !== item));
    setIsDropdownOpen(false);
    event.stopPropagation();
    dispatch(deleteFilter({ key: prop.name, data: item }));
  };
  return (
    <div className="flex flex-col">
      <div
        className="flex  justify-between rounded-md shadow-s border-2 border-gray-300 items-center"
        onClick={handleInputClick}
      >
        {filtersList.map((item) => (
          <div className="flex rounded-sm bg-gray-300 px-1 mx-1">
            <div className="name text-gray-800 ">{item}</div>
            <ClearIcon
              className="clearCurrentFilter p-1"
              onClick={(event) => removeItemFromFilterOnClick(item, event)}
            ></ClearIcon>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={prop.name}
          className="bg-transparent text-gray-600 focus:outline-none p-2 "
          style={{ width: inputWidth }}
        />
        {filtersList.length > 0 && (
          <ClearIcon
            className="clearAllFilters p-1"
            onClick={clearFilterOnClick}
          ></ClearIcon>
        )}
        <div className="border-l-2 border-gray-400 px-2">
          <ExpandMoreIcon className="hover:cursor-pointer "></ExpandMoreIcon>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="flex flex-col mt-2 rounded-md shadow-md">
          {prop.data.map((item, index) => (
            <div
              className="text-gray-500 text-md p-2 flex justify-start hover:bg-slate-200 pl-4 hover:cursor-pointer"
              onClick={() => addFilterOnClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
