import React, { useEffect } from "react";
import { useEth } from "../contexts/EthContext";

const AddUserDetails = () => {
  const { state } = useEth();

  useEffect(() => {
    if (!state.contract) return;

    return () => {};
  }, [state.contract]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    state.contract.methods
      .addUser(name, email, phone)
      .send({ from: state.accounts[0] })
      .on("receipt", (receipt) => {
        console.log(receipt);
        window.location.reload();
      })
      .on("error", (error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="mx-auto">
        <p>
          It appears that you have not yet added your details to our database.
          Please add your details below.
        </p>
        <h1 className="text-xl font-bold my-4">Add Details:</h1>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center ">
          <input className="w-full h-14 px-4" type="text" placeholder="Name" />
          <input className="w-full h-14 px-4" type="text" placeholder="Email" />
          <input
            className="w-full h-14 px-4"
            type="text"
            placeholder="Phone Number"
          />
          <button
            className="bg-blue-400 w-fit p-4 rounded mx-auto"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserDetails;
