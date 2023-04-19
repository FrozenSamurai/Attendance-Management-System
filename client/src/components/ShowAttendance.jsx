import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEth } from "../contexts/EthContext";

const ShowAttendance = () => {
  const { id } = useParams();
  const { state } = useEth();
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    if (!state.contract) return;
    state.contract.methods.getAttendance(id).call((error, result) => {
      state.contract.methods
        .getTotalStudents(id)
        .call((error, totalStudents) => {
          setAttendance({
            ...result,
            totalStudents: parseInt(totalStudents),
          });
        });
      console.log({ result });
    });
  }, [id, state.contract]);

  return (
    <section className="p-20 mt-10">
      <h1 className="text-3xl font-bold text-center mb-10">Attendance</h1>

      {attendance && (
        <div className="flex flex-col">
          <div className="flex flex-row gap-2">
            <div className="font-bold text-xl">Branch:</div>
            <div className="text-xl">{attendance.branch}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-bold text-xl">Division:</div>
            <div className="text-xl">{attendance.division}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-bold text-xl">Subject:</div>
            <div className="text-xl">{attendance.subject}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-bold text-xl">Start Time:</div>
            <div className="text-xl">{attendance.lectureStartTime}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-bold text-xl">End Time:</div>
            <div className="text-xl">{attendance.lectureEndTime}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="font-bold text-xl">Total Students:</div>
            <div className="text-xl">{attendance.totalStudents}</div>
          </div>
        </div>
      )}
      <div className="mt-6">
        <div className="flex flex-row flex-wrap gap-4">
          {attendance &&
            Array(attendance.totalStudents)
              .fill(0)
              .map((rollNum, ind) => (
                <div
                  key={ind}
                  className={`flex p-6 rounded-md text-xl flex-col gap-2 ${
                    attendance.rollNums.includes((ind + 1).toString())
                      ? "bg-green-400"
                      : "bg-red-400"
                  }`}
                >
                  <div className="font-bold text-xl">{ind + 1}</div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default ShowAttendance;
