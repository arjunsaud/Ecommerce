import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Router } from "./Router/Routes";
import { GlobalContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <RouterProvider router={Router}></RouterProvider>
      </GlobalContextProvider>
    </>
  );
}

export default App;
