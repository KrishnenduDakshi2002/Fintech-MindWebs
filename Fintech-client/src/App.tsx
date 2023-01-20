import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./Screen/Home";
import Visualize from "./Screen/Visualize";
import Layout from "./components/Layout";
import LandingPage from "./Screen/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>
      <Route path="/user/" element={<Layout />}>
        <Route path="dashboard" element={<Home />} />
        <Route path="visualize" element={<Visualize />} />
      </Route>
    </Routes>
  );
};

export default App;
