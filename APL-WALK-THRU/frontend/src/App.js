import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Navigasibar from "./components/navbar/navbar";
import LandingPage from "./components/Landing-page/landingPage";
import Footer from "./components/Footer/footer";
// import KategoriGrid from "./components/Landing-page/KategoriGrid";
import Pendahuluan from "./components/Tutorial-page/Pendahuluan/Pendahuluan";
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
import Susursungai from "./components/Susursungai/Susursungai";
import Baritoriver from "./components/Susursungai/all-susursungai/Baritoriver";
import TantanganDua from "./components/Challanges-page/all-challanges/TantanganDua";
import ChallangeOne from "./components/Challanges-page/all-challanges/ChallangeOne";
import Tutorialpage from "./components/Tutorial-page/Tutorial-page";
import Texteditor from "./components/Tutorial-page/Texteditor";




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<><Navigasibar/><Login/></>}/>
      <Route exact path="/register" element={<><Navigasibar/><Register/></>}/>
      <Route path="/" element={<><Navigasibar/><LandingPage/><Footer/></>}/>
      {/* <Route path="/kat" element={<><KategoriGrid/></>}/> */}

      <Route path="/belajarturtle" element={<><Navigasibar/><Tutorialpage/></>}/>


      <Route path="/tutorial" element={<><Navigasibar/><Pendahuluan/></>}/>
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
      <Route path="/challanges/2" element={<><Navigasibar/><TantanganDua/></>}/>
      <Route path="/challanges/one" element={<><Navigasibar/><ChallangeOne/></>}/>
      <Route path="/compile" element={<><Compile/><Footer/></>}/>

      <Route path="/susursungai" element={<><Navigasibar/><Susursungai/></>}/>
      <Route path="/susursungai/1" element={<><Navigasibar/><Baritoriver/></>}/>

      <Route path="/texteditor" element={<><Navigasibar/><Texteditor/></>}/>



    </Routes>
    </BrowserRouter>
  );
}

export default App;
