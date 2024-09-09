import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Navigasibar from "./components/navbar/navbar";
import LandingPage from "./components/Landing-page/landingPage";
import Footer from "./components/Footer/footer";
import KategoriGrid from "./components/Landing-page/KategoriGrid";
import TutorialPage from "./components/Tutorial-page/TutorialPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<><Navigasibar/><Login/></>}/>
      <Route exact path="/register" element={<><Navigasibar/><Register/></>}/>
      <Route path="/" element={<><Navigasibar/><LandingPage/><KategoriGrid/><Footer/></>}/>
      <Route path="/kat" element={<><KategoriGrid/></>}/>
      <Route path="/tutorial" element={<><Navigasibar/><TutorialPage/><Footer/></>}/>


    </Routes>
    </BrowserRouter>
  );
}

export default App;
