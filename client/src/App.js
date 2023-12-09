import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartupGrid from "./components/StartupGrid";
import AddStartupForm from "./components/AddStartupForm";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" exact element={<StartupGrid />} />
        <Route path="/addstartup" exact element={<AddStartupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
