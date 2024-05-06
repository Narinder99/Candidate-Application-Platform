import React, { useEffect, useRef, useState } from "react";
import { SingleJobDetails } from "./SingleJobDetails";
import { useSelector, useDispatch } from "react-redux";
import { addJob } from "./Redux/JobsData";
import { addFilterData, clearFilterData } from "./Redux/Filters";

export const Jobs = () => {
  const Jobs = useSelector((state) => state.Jobs.Jobs); //get data from the redux store
  const filters = useSelector((state) => state.Filters.filters); //filters which we are applying on the data
  const filterRef = useRef();
  const filteredData = useSelector((state) => state.Filters.filteredData); // single List which we have to just display
  const [totalJobs, setTotalJobs] = useState(1000);
  const [offset, setOffset] = useState(0);
  const offsetRef = useRef(offset);
  const dispatch = useDispatch();
  const scrollBarRef = useRef(null); // to check wheather we have sufficent data or not

  const [isLoading, setIsLoading] = useState(false);
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const callApi = async () => {
    //to check weather still jobs are there or not. if offset is greater then total jobs then we will not call api further
    // and second condition is for initially totalJobs will be zero to call the api for the first time i used second condition
    if (offsetRef.current >= totalJobs && totalJobs !== 0) {
      return;
    }

    const body = JSON.stringify({ limit: 10, offset: offsetRef.current });
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
        result.jdList.forEach((item) => {
          const jobObject = {
            jdUid: item.jdUid,
            jobRole: item.jobRole,
            companyName: item.companyName,
            location: item.location,
            jobDetailsFromCompany: item.jobDetailsFromCompany,
            minExp: item.minExp !== null ? item.minExp : 0,
            maxExp: item.maxExp !== null ? item.maxExp : 100,
            logoUrl: item.logoUrl,
            maxJdSalary: item.maxJdSalary,
          };
          //dispatch(addFilterData(jobObject));
          filterOnCurrentData(jobObject);
          dispatch(addJob(jobObject));
        });
        offsetRef.current = offsetRef.current + 10; //increase the offset to call next jobs
        setIsLoading(false);
        checkScollBar();
        // if data is less it should call the API again and again
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  function checkScollBar() {
    // if scroll bar is at last we have to call api to fetch more data
    const container = scrollBarRef.current;
    if (container) {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollPercentageValue =
        (scrollTop / (scrollHeight - clientHeight)) * 100;
        console.log("scroll",scrollPercentageValue)
      if (scrollPercentageValue > 90 || isNaN(scrollPercentageValue)) {
        callApi();
      }
    }
  }

  useEffect(() => {
    // to call the scroll bar first time
    let scrollBar = null; // use to make call only once
    if (scrollBar) {
      clearTimeout(scrollBar);
    }

    scrollBar = setTimeout(() => {
      checkScollBar();
      window.addEventListener("resize", checkScollBar);
    }, 500);
    return () => {
      clearTimeout(scrollBar);
      window.removeEventListener("resize", checkScollBar);
    };
  }, []);

  useEffect(() => {
    //handle scroll bar for every movement
    let callAPI = null; // created varibale to call the function only once. If we not use this technique then by the time we will change
    // the is loading value. condtion will be true for more then one time .So it will call tha api more than one time.

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      const scrollPercentageValue =
        (scrollTop / (scrollHeight - clientHeight)) * 100;
      // console.log(scrollPercentageValue)
      if (scrollPercentageValue >= 90 && !isLoading) {
        // using isLoading also because if api will take more time then also our api will run more than one time
        if (callAPI) {
          // if again condition will become true then clear the variable
          clearTimeout(callAPI);
        }

        callAPI = setTimeout(() => {
          console.log(scrollPercentageValue); // inside this will call after 500 seconds
          setIsLoading(true);
          callApi();
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(callAPI);
    };
  }, [isLoading]);

  useEffect(() => {
    //to update the filter Data when ever there is a chnage in the filter

    let callFilterOnAllData = null; // use to make call only once
    if (callFilterOnAllData) {
      // if again condition will become true then clear the variable
      clearTimeout(callFilterOnAllData);
    }

    callFilterOnAllData = setTimeout(() => {
      filterRef.current = filters;
      filterOnAllData();
    }, 500);
    return () => {
      clearTimeout(callFilterOnAllData);
    };
  }, [filters]);
  
  useEffect(() => {
    //previosuly for zero scroll is not working. beacuse of that i am not able to call api. so i am maually checking that my filteredData is empty or not. 
     if(filteredData.length===0 && offset<totalJobs){
      console.log("length is ",filteredData.length,offset)
       callApi()}
  }, [filteredData]);
  function filterOnAllData() {
    //use filter on comletet Data
    dispatch(clearFilterData());
    Jobs.map((item) => {
      let check = true; //at last value should be there in list
      for (const key in filterRef.current) {
        // Iterate over each value in the array associated with the key
        let temp = false; // iniltize with false . if filter got matched it will change temp to true and imediate
        // return . no need to wait for other filter in same filter type. if it get true with one that is enough
        for (let i = 0; i < filterRef.current[key].length; i++) {
          console.log(key, filterRef.current[key][i]);
          if (
            key === "Role" &&
            filterRef.current[key][i].toLowerCase() === item.jobRole
          ) {
            temp = true;
            break;
          } else if (
            key === "Experience" &&
            filterRef.current[key][i] >= item.minExp &&
            filterRef.current[key][i] <= item.maxExp
          ) {
            temp = true;
            break;
          } else if (
            key === "Location" &&
            filterRef.current[key][i].toLowerCase() ===
              item.location.toLowerCase()
          ) {
            temp = true;
            break;
          } else if (
            key === "Remote" &&
            filterRef.current[key][i].toLowerCase() ===
              item.location.toLowerCase()
          ) {
            temp = true;
            break;
          } else if (
            key === "Min Base Pay (Lac)" &&
            filterRef.current[key][i] <= item.maxJdSalary
          ) {
            temp = true;
            break;
          } else if (
            key === "companyName" &&
            filterRef.current[key][i].toLowerCase() ===
              item.companyName.toLowerCase()
          ) {
            temp = true;
            break;
          } else {
            temp = false;
          }
        }
        check = check && temp;
        if (!check) break;
      }
      if (check) {
        dispatch(addFilterData(item));
      }
    });
  }

  function filterOnCurrentData(item) {
    // apply filter on the new data only
    let check = true;
    for (const key in filterRef.current) {
      let temp = false;
      for (let i = 0; i < filterRef.current[key].length; i++) {
        console.log(key, filterRef.current[key][i]);
        if (
          key === "Role" &&
          filterRef.current[key][i].toLowerCase() === item.jobRole
        ) {
          temp = true;
          break;
        } else if (
          key === "Experience" &&
          filterRef.current[key][i] >= item.minExp &&
          filterRef.current[key][i] <= item.maxExp
        ) {
          temp = true;
          break;
        } else if (
          key === "Location" &&
          filterRef.current[key][i].toLowerCase() === item.location
        ) {
          temp = true;
          break;
        } else if (
          key === "Remote" &&
          filterRef.current[key][i].toLowerCase() === item.location
        ) {
          temp = true;
          break;
        } else if (
          key === "Min Base Pay (Lac)" &&
          filterRef.current[key][i] <= item.maxJdSalary
        ) {
          temp = true;
          break;
        } else if (
            key === "companyName" &&
            filterRef.current[key][i].toLowerCase() ===
              item.companyName.toLowerCase()
          ) {
            temp = true;
            break;
          }else {
          temp = false;
        }
      }
      check = check && temp;
      if (!check) break;
    }
    if (check) {
      dispatch(addFilterData(item));
    }
  }

  return (
    <div className="mainClass">
      <div ref={scrollBarRef} className=" grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-14 m-14 p-1">
        {filteredData.map(
          (
            item,
            index // used map to traverse the array and send the data to
          ) => (
            <SingleJobDetails prop={item}></SingleJobDetails>
          )
        )}
      </div>
    </div>
  );
};
