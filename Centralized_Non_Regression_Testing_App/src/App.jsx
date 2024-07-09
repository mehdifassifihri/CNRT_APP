import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import TestCases from "./pages/TestCases";
import TestScenarios from "./pages/TestScenarios";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <div className="flex h-screen">
              <Sidebar />
              <main className="p-8 h-full w-full ml-56">
                <Routes>
                  <Route path="/testcases" element={<TestCases />} />
                  <Route path="/testscenarios" element={<TestScenarios />} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
