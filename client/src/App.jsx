import CheckHistory from "./components/CheckHistory";
import Main from "./components/Main";
import ShowAttendance from "./components/ShowAttendance";
import { EthProvider } from "./contexts/EthContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/history",
    element: <CheckHistory />,
  },
  {
    path: "/attendance/:id",
    element: <ShowAttendance />,
  },
]);

function App() {
  return (
    <EthProvider>
      <RouterProvider router={router} />
    </EthProvider>
  );
}

export default App;
