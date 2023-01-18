import { RouterProvider } from "react-router-dom";
import "./App.css";
import { Router } from "./Router/Routes";
import { GlobalContextProvider } from "./context/GlobalContext";

// import { useEffect } from "react";
// import api from "axios"
// import { setChatDetails } from "./slices/chat.slice";
// import { useDispatch } from "react-redux";


function App() {
  // const url = "http://localhost:8001/";

  // const dispatch=useDispatch()
  // useEffect(()=>{
  //   fetchCS()
  // },[])

  // const fetchCS=async()=>{
  //   const {data} = await api.get(url + "user/customersupport");
  //   console.log(data.user._id);
  //   dispatch(setChatDetails({user:data.user._id}))
  // }

  return (
    <>
      <GlobalContextProvider>
        <RouterProvider router={Router}></RouterProvider>
      </GlobalContextProvider>
    </>
  );
}

export default App;
