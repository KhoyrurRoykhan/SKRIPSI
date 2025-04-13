import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Navigasibar from "./components/navbar/navbar";
import LandingPage from "./components/Landing-page/landingPage";
import Footer from "./components/Footer/footer";
// import KategoriGrid from "./components/Landing-page/KategoriGrid";
// import Pendahuluan from "./components/Tutorial-page/Pendahuluan/Pendahuluan";
import Compile from "./components/Compiler/compile";
// import LeftRight from "./components/Tutorial-page/Turtle-motion/LeftRight";
// import ForwardBackward from "./components/Tutorial-page/Turtle-motion/ForwardBackward";
// import SetPosition from "./components/Tutorial-page/Turtle-motion/SetPosition";
// import SetXY from "./components/Tutorial-page/Turtle-motion/SetXY";
// import SetHeading from "./components/Tutorial-page/Turtle-motion/SetHeading";
// import SetHome from "./components/Tutorial-page/Turtle-motion/SetHome";
// import Circle from "./components/Tutorial-page/Turtle-motion/Circle";
// import Dot from "./components/Tutorial-page/Turtle-motion/Dot";
import UndoSpeed from "./components/Tutorial-page/Turtle-motion/UndoSpeed";
import Challanges from "./components/Challanges-page/Challanges";
import TantanganSatu from "./components/Challanges-page/all-challanges/TantanganSatu";
import Susursungai from "./components/Susursungai/Susursungai";
import Baritoriver from "./components/Susursungai/all-susursungai/Baritoriver";
import TantanganDua from "./components/Challanges-page/all-challanges/TantanganDua";
import ChallangeOne from "./components/Challanges-page/all-challanges/ChallangeOne";
import Tutorialpage from "./components/Tutorial-page/Tutorial-page";
import Texteditor from "./components/Tutorial-page/Texteditor";
import Tampung from "./components/Tutorial-page/Pen-control/Tampung";
import LandingNew from "./components/Landing-page/LandingNew";
import SidebarTutor from "./components/Tutorial-page/SidebarTutor";
import CobaHalaman from "./components/Tutorial-page/CobaHalaman";
import CobaHalamanLeftRight from "./components/Tutorial-page/CobaHalamanLeftRight";
import CobaHalamanForwardBackward from "./components/Tutorial-page/CobaHalamanForwardBackward";

import Pendahuluan from "./components/Belajar/Pengenalan/Pendahuluan";
import LeftRight from "./components/Belajar/Turtle-motion/LeftRight";
import ForwardBackward from "./components/Belajar/Turtle-motion/ForwardBackward";
import SetPosition from "./components/Belajar/Turtle-motion/SetPosition";
import SetXY from "./components/Belajar/Turtle-motion/SetXY";
import SetHeading from "./components/Belajar/Turtle-motion/SetHeading";
import SetHome from "./components/Belajar/Turtle-motion/SetHome";
import Circle from "./components/Belajar/Turtle-motion/Circle";
import Dot from "./components/Belajar/Turtle-motion/Dot";


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
      <Route path="/tampung" element={<Tampung/>}/>

      <Route path="/cobalanding" element={<><LandingNew/></>}/>


      {/* percobaan */}
      <Route path="/cobasidebar/pendahuluan" element={<><Navigasibar/><CobaHalaman/></>}/>
      <Route path="/cobasidebar/leftright" element={<><Navigasibar/><CobaHalamanLeftRight/></>}/>
      <Route path="/cobasidebar/forwardbackward" element={<><Navigasibar/><CobaHalamanForwardBackward/></>}/>

      {/* update */}
      <Route path="/belajar/pendahuluan" element={<><Navigasibar/><Pendahuluan/></>}/>

      <Route path="/belajar/turtlemotion/leftright" element={<><Navigasibar/><LeftRight/></>}/>
      <Route path="/belajar/turtlemotion/forwardbackward" element={<><Navigasibar/><ForwardBackward/></>}/>
      <Route path="/belajar/turtlemotion/setposition" element={<><Navigasibar/><SetPosition/></>}/>
      <Route path="/belajar/turtlemotion/setxy" element={<><Navigasibar/><SetXY/></>}/>
      <Route path="/belajar/turtlemotion/setheading" element={<><Navigasibar/><SetHeading/></>}/>
      <Route path="/belajar/turtlemotion/home" element={<><Navigasibar/><SetHome/></>}/>
      <Route path="/belajar/turtlemotion/circle" element={<><Navigasibar/><Circle/></>}/>
      <Route path="/belajar/turtlemotion/dot" element={<><Navigasibar/><Dot/></>}/>



    </Routes>
    </BrowserRouter>
  );
}

export default App;
