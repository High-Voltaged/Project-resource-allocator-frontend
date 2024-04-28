import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "~/pages/Register";
import Login from "~/pages/Login";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<div>welcome</div>}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </Router>
);

export default App;
