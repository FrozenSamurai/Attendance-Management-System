import React, { useEffect, useState } from "react";
import { useEth } from "../contexts/EthContext";

const CheckHistory = () => {
  const { state } = useEth();
  const [attendance, setAttendance] = useState([]);
  useEffect(() => {
    console.log("CheckHistory");
    if (!state.contract) return;
    else {
      // state.contract.methods.getAttendance().call((err, res) => {

      // });
      // let count;
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
              tempatt.push(result);
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
  return <div>CheckHistory</div>;
};

export default CheckHistory;
