import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import WorkflowCanvas from "./components/WorkflowCanvas";
import WorkflowTable from "./components/WorkflowTable";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<WorkflowCanvas />} />
          <Route path="/table" element={<WorkflowTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
