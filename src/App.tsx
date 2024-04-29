import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "~/pages/Register";
import Login from "~/pages/Login";
import Navbar from "./components/shared/Navbar/Navbar";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<div>welcome</div>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </Router>
);

export default App;
