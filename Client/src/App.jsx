import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Dashboard from "./pages/Dashboard";
import CreateProject from "./pages/CreateProject";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProjectDetails from "./pages/ProjectDetails";
import ErrorPage from "./pages/ErrorPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 container mx-auto">
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Dashboard />} />
          <Route path="/projects/create" element={<CreateProject />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          <Route
            path="/projects/:projectId/tasks/create"
            element={<CreateTask />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
