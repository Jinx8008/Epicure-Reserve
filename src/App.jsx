import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Profile from "./Components/Profile"
import ProtectedRoute from "./Components/ProtectedRoute";
function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
         <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          />
        </Routes>

        {/* Toast container should be here OUTSIDE the routes */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          limit={3}
          toastStyle={{
            borderRadius: "12px",
            background: "#1E1E1E",
            color: "#FFD700",
            fontFamily: "Inter, sans-serif",
            fontWeight: "600",
            fontSize: "1.05rem",
            padding: "1.2rem 1.6rem",
            textAlign: "center",
          }}
          bodyStyle={{
            margin: 0,
            padding: 0,
          }}
          icon={false}
        />
      </>
    </Router>
  );
}

export default App;
