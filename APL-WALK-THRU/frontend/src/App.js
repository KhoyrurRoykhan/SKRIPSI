import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Navbar from "./components/navbar/navbar";
import LandingPage from "./components/Landing-page/landingPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<><Navbar/><Login/></>}/>
      <Route exact path="/register" element={<><Navbar/><Register/></>}/>
      <Route exact path="/" element={<><Navbar/><LandingPage/></>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
