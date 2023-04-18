import CheckHistory from "./components/CheckHistory";
import Main from "./components/Main";
// import MainScreen from "./components/MainScreen";
import { EthProvider } from "./contexts/EthContext";

function App() {
  return (
    <EthProvider>
      <Main />
      <CheckHistory />
    </EthProvider>
  );
}

export default App;
