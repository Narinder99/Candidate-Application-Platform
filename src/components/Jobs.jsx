import React, { useEffect, useState } from "react";
import { SingleJobDetails } from "./SingleJobDetails";
import { useSelector, useDispatch } from "react-redux";
import { addJob } from "./Redux/JobsData";

export const Jobs = () => {
  const Jobs = useSelector((state) => state.Jobs.Jobs);//get data from the redux store
  const [totalJobs, setTotalJobs] = useState(0);
  const [offset, setOffset] = useState(0);
  const dispatch = useDispatch();

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
        setOffset(offset + 10); //increase the offset to call next jobs
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const clickfun = () => {
    callApi();
  };
  return (
    <div className="mainClass">
      <div className="flex bg-black w-full h-10" onClick={clickfun}></div>
      <div className=" grid grid-cols-2 gap-14 m-14">
        {Jobs.map((item, index) => ( // used map to traverse the array and send the data to 
          <SingleJobDetails prop={item}></SingleJobDetails>
        ))}
      </div>
    </div>
  );
};
