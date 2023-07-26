import React from 'react'
import DashBoard from './components/DashBoard/DashBoard'
import { BrowserRouter } from "react-router-dom";
import MuiTest from './MuiTest';



function App() {

  return (
    <BrowserRouter>
      <DashBoard />
      {/* <MuiTest/> */}
 

    </BrowserRouter>
   
  )
}

export default App