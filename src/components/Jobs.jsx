import React, { useEffect, useState } from "react";
import { SingleJobDetails } from "./SingleJobDetails";
import { useSelector, useDispatch } from "react-redux";
import { addJob } from "./Redux/JobsData";

export const Jobs = () => {
  const Jobs = useSelector((state) => state.Jobs.Jobs);//get data from the redux store
  const [totalJobs, setTotalJobs] = useState(0);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const callApi = async () => {
    //to check weather still jobs are there or not. if offset is greater then total jobs then we will not call api further
    // and second condition is for initially totalJobs will be zero to call the api for the first time i used second condition
    if (offset >= totalJobs && totalJobs !== 0) {
      return;
    }
    const body = JSON.stringify({ limit: 10, offset: offset });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };

    await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setTotalJobs(result.totalCount);

        //using loop to store the data in Job object using redux
        result.jdList.forEach((item) => {
          const jobObject = {
            jdUid: item.jdUid,
            jobRole: item.jobRole,
            companyName: item.companyName,
            location: item.location,
            jobDetailsFromCompany: item.jobDetailsFromCompany,
            minExp: item.minExp,
            maxExp: item.maxExp,
            logoUrl: item.logoUrl,
          };
          dispatch(addJob(jobObject));
        });
        setOffset(offset + 10);//increase the offset to call next jobs
        setIsLoading(false) 

      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false) 

      });
  };

  const clickfun = () => {
    callApi();
  };
  useEffect(() => {
    let callAPI = null;// created varibale to call the function only once. If we not use this technique then by the time we will change
    // the is loading value. condtion will be true for more then one time .So it will call tha api more than one time. 
  
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
  
      const scrollPercentageValue = (scrollTop / (scrollHeight - clientHeight)) * 100;
      // console.log(scrollPercentageValue)
      if (scrollPercentageValue >= 90 && !isLoading) {// using isLoading also because if api will take more time then also our api will run more than one time
        if (callAPI) {// if again condition will become true then clear the variable
          clearTimeout(callAPI);
        }
        
        callAPI = setTimeout(() => {
          console.log(scrollPercentageValue);// inside this will call after 500 seconds
          setIsLoading(true);
          callApi();
        }, 500); 
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(callAPI);
    };
  }, [isLoading]);
  return (
    <div className="mainClass">
      <div className="flex bg-black w-full h-10" onClick={clickfun}></div>
      <div className=" grid grid-cols-4 gap-14 m-14">
        {Jobs.map((item, index) => ( // used map to traverse the array and send the data to 
          <SingleJobDetails prop={item}></SingleJobDetails>
        ))}
      </div>
    </div>
  );
};
