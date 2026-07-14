import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Admissions from "./pages/Admissions.jsx";
import Departments from "./pages/Departments.jsx";
import Placements from "./pages/Placements.jsx";
import Fees from "./pages/Fees.jsx";
import Scholarships from "./pages/Scholarships.jsx";
import Facilities from "./pages/Facilities.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-mist">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/placements" element={<Placements />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
