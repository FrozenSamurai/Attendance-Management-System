import { useEffect, useState } from "react";
import { useEth } from "../contexts/EthContext";

import Home from "./Home";
// import AddCharityModal from "./AddCharityModal";
// import NavBar from "./NavBar";

const Main = () => {
  const { state } = useEth();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  //   const [showAddCharityModal, setShowAddCharityModal] = useState(false);

  useEffect(() => {
    if (!state.contract) return;
    state.contract.methods.users(state.accounts[0]).call((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
        setUserDetails(res);
      }
      setLoading(false);
    });

    return () => {};
  }, [state]);
  return (
    <>
      {/* <NavBar
        user={loading && userDetails.name ? userDetails : null}
        setShowModal={setShowAddCharityModal}
      /> */}
      <Home loading={loading} userDetails={userDetails} />
      {/* <AddCharityModal
        showModal={showAddCharityModal}
        setShowModal={setShowAddCharityModal}
      /> */}
    </>
  );
};

export default Main;
