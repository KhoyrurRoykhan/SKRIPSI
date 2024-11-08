import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Navigasibar from "./components/navbar/navbar";
import LandingPage from "./components/Landing-page/landingPage";
import Footer from "./components/Footer/footer";
// import KategoriGrid from "./components/Landing-page/KategoriGrid";
import Pendahuluan from "./components/Tutorial-page/Pendahuluan";
import Compile from "./components/Compiler/compile";
import LeftRight from "./components/Tutorial-page/Turtle-motion/LeftRight";
import ForwardBackward from "./components/Tutorial-page/Turtle-motion/ForwardBackward";
import SetPosition from "./components/Tutorial-page/Turtle-motion/SetPosition";
import SetXY from "./components/Tutorial-page/Turtle-motion/SetXY";
import SetHeading from "./components/Tutorial-page/Turtle-motion/SetHeading";
import SetHome from "./components/Tutorial-page/Turtle-motion/SetHome";
import Circle from "./components/Tutorial-page/Turtle-motion/Circle";
import Dot from "./components/Tutorial-page/Turtle-motion/Dot";
import UndoSpeed from "./components/Tutorial-page/Turtle-motion/UndoSpeed";
import Challanges from "./components/Challanges-page/Challanges";
import TantanganSatu from "./components/Challanges-page/all-challanges/TantanganSatu";




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<><Navigasibar/><Login/></>}/>
      <Route exact path="/register" element={<><Navigasibar/><Register/></>}/>
      <Route path="/" element={<><Navigasibar/><LandingPage/><Footer/></>}/>
      {/* <Route path="/kat" element={<><KategoriGrid/></>}/> */}
      <Route path="/tutorial" element={<><Navigasibar/><Pendahuluan/><Footer/></>}/>
      <Route path="/tutorial/leftright" element={<><Navigasibar/><LeftRight/></>}/>
      <Route path="/tutorial/forwardbackward" element={<><Navigasibar/><ForwardBackward/></>}/>
      <Route path="/tutorial/setposition" element={<><Navigasibar/><SetPosition/></>}/>
      <Route path="/tutorial/setxy" element={<><Navigasibar/><SetXY/></>}/>
      <Route path="/tutorial/setheading" element={<><Navigasibar/><SetHeading/></>}/>
      <Route path="/tutorial/home" element={<><Navigasibar/><SetHome/></>}/>
      <Route path="/tutorial/circle" element={<><Navigasibar/><Circle/></>}/>
      <Route path="/tutorial/dot" element={<><Navigasibar/><Dot/></>}/>
      <Route path="/tutorial/undospeed" element={<><Navigasibar/><UndoSpeed/></>}/>

      <Route path="/challanges" element={<><Navigasibar/><Challanges/></>}/>
      <Route path="/challanges/1" element={<><Navigasibar/><TantanganSatu/></>}/>
      <Route path="/compile" element={<><Compile/><Footer/></>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
