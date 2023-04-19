import React, { useEffect, useState } from "react";
import { useEth } from "../contexts/EthContext";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
  },
  {
    name: "Branch",
    selector: (row) => row.branch,
    sortable: true,
  },
  {
    name: "Division",
    selector: (row) => row.division,
    sortable: true,
  },
  {
    name: "Subject",
    selector: (row) => row.subject,
    sortable: true,
  },
  {
    name: "Lecture Timings",
    selector: (row) => row.lectureStartTime + " - " + row.lectureEndTime,
  },
  {
    name: "Timestamp",
    selector: (row) => new Date(parseInt(row.timestamp)).toLocaleString(),
    sortable: true,
    sortFunction: (a, b) => {
      return a - b;
    },
  },
  {
    name: "Attendance Button",
    selector: (row) => (
      <Link
        to={`/attendance/${row.id}`}
        className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          console.log(row);
        }}
      >
        Check Attendance
      </Link>
    ),
  },
];

const CheckHistory = () => {
  const { state } = useEth();
  const [attendance, setAttendance] = useState([]);
  console.log(attendance);
  useEffect(() => {
    console.log("CheckHistory");
    if (!state.contract) return;
    else {
      state.contract.methods.attendanceCount().call((error, cntresult) => {
        console.log(cntresult);
        // alert(error);
        if (error) {
          console.log(error);
        } else {
          console.log(cntresult);
          // count = result;
          let tempatt = [];
          for (let i = 1; i <= cntresult; i++) {
            state.contract.methods.getAttendance(i).call((error, result) => {
              console.log(i, result, cntresult);
              // alert(error);
              tempatt.push({ id: i, ...result });
              if (i === parseInt(cntresult)) {
                setAttendance(tempatt);
                console.log(tempatt);
              }
            });
          }
        }
      });
    }
  }, [state.contract]);
  return (
    <section className="p-20 mt-10">
      <h1 className="text-3xl font-bold text-center mb-10">History</h1>
      <DataTable
        title="Attendance History"
        columns={columns}
        data={attendance}
        pagination
        paginationPerPage={5}
      />
    </section>
  );
};

export default CheckHistory;
