import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
