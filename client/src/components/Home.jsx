import AddUserDetails from "./AddUserDetails";
// import CharityList from "../CharityList";
// import { Landing } from "../Landing";
// import "react-tooltip/dist/react-tooltip.css";
import MainScreen from "./MainScreen";

const Home = ({ loading, userDetails }) => {
  return loading ? (
    <div></div>
  ) : userDetails.name === "" ? (
    <AddUserDetails />
  ) : (
    <section>
      <MainScreen />
    </section>
  );
};

export default Home;
