import React, { useEffect, useState } from "react";
import "../styles.css";
import { useEth } from "../contexts/EthContext";
import Navbar from "./Navbar";

const MainScreen = () => {
  const [numOfStudents, setNumOfStudents] = React.useState(0);
  const [branch, setBranch] = React.useState("IT");
  const [subject, setSubject] = useState("");
  const [divi, setDivi] = React.useState("A");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [attendanceList, setAttendanceList] = React.useState([]);

  const { state } = useEth();

  useEffect(() => {
    if (!state.contract) return;

    return () => {};
  }, [state.contract]);

  const addAttendance = () => {
    console.log(branch, divi, startTime, endTime, numOfStudents);
    const time = Date.now();
    console.log(time);
    state.contract.methods
      .addAttendance(
        branch,
        divi,
        subject,
        time.toString(),
        startTime,
        endTime,
        numOfStudents,
        attendanceList
      )
      .send({ from: state.accounts[0] })
      .on("receipt", (receipt) => {
        console.log(receipt);
        window.location.reload();
        alert("Attendance Added");
      })
      .on("error", (error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="p-20 mt-20">
        <h1 className="text-3xl font-bold text-center">Add Attendance</h1>
        <p className="text-center text-gray-500 text-xs">
          Please enter the details below to add the attendance.
        </p>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="branch"
        >
          Branch
        </label>
        <select
          id="branch"
          onChange={(e) => {
            setBranch(e.target.value);
          }}
          // css styles for select option
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        >
          <option value="IT">IT</option>
          <option value="CS">CS</option>
          <option value="ELEC">ELEC</option>
        </select>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="divi"
        >
          Division
        </label>
        <select
          id="divi"
          onChange={(e) => {
            setDivi(e.target.value);
          }}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        >
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="subject"
        >
          Subject
        </label>
        <input
          id="subject"
          type="text"
          placeholder="Start Time"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="start_time"
        >
          Start Time
        </label>
        <input
          id="start_time"
          type="text"
          placeholder="Start Time"
          onChange={(e) => {
            setStartTime(e.target.value);
          }}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="end_time"
        >
          End Time
        </label>
        <input
          id="end_time"
          type="text"
          placeholder="End Time"
          onChange={(e) => {
            setEndTime(e.target.value);
          }}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="num_of_students"
        >
          Number of Students
        </label>
        <input
          id="num_of_students"
          type="number"
          placeholder="Number of Students"
          min={0}
          onChange={(e) => {
            setNumOfStudents(parseInt(e.target.value));
          }}
          onWheel={(e) => {
            e.target.blur();
          }}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        />
        <div className="flex flex-col flex-wrap gap-1 max-h-[250px] w-full overflow-x-auto">
          {Boolean(numOfStudents) &&
            [...Array(numOfStudents)].map((e, i) => {
              return (
                <div
                  key={i}
                  className="flex w-20 items-center justify-between flex-row"
                >
                  <h1 className="font-bold text-xl">{i + 1}</h1>
                  <label class="switch">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked)
                          setAttendanceList([...attendanceList, i + 1]);
                        else
                          setAttendanceList(
                            attendanceList.filter((x) => x !== i + 1)
                          );
                      }}
                    />
                    <span class="slider round"></span>
                  </label>
                </div>
              );
            })}
        </div>
        <div className="flex jusce">
          <button
            onClick={addAttendance}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto mt-4"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
