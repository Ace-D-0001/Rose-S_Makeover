import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import About from "./pages/About"
import Packages from "./pages/Packages"
import PackageDetail from "./pages/PackageDetail"
import Contact from "./pages/Contact"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"

function App() {
  return (
    <Routes>
      {/* Public routes with layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/packages" element={<Layout><Packages /></Layout>} />
      <Route path="/packages/:id" element={<Layout><PackageDetail /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      
      {/* Admin routes without layout */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
