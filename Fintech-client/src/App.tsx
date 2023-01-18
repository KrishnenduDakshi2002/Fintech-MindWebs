import { Routes,Route } from "react-router-dom"
import NavBar from "./NavBar"
import Home from "./Home"
import Visualize from "./Visualize"
import Layout from "./Layout"
import LandingPage from "./LandingPage"
import Login from "./components/Login"
import SignUp from "./components/Signup"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="signup" element={<SignUp/>}/>
        </Route>
      <Route path="/user/" element={<Layout/>}>
        <Route path="dashboard" element={<Home/>}/>
        <Route path="visualize" element={<Visualize/>}/>
      </Route>
    </Routes>
  )
}

export default App