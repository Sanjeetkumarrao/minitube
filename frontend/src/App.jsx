import { Routes, Route } from "react-router-dom"
import MainLayout from "./layout/MainLayout.jsx"
import HomePage from "./pages/Home.Page.jsx"

function App() {
  return (
    <Routes>
      {/* Public/Main Routes with Sidebar & Navbar */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage/>} />
        {/* Baaki routes jaise /tweets yahan aayenge */}
      </Route>

      {/* Auth Routes bina Sidebar ke */}
      <Route path="/login" element={<h1>Login Page</h1>} />
      <Route path="/signup" element={<h1>Signup Page</h1>} />
    </Routes>
  )
}

export default App