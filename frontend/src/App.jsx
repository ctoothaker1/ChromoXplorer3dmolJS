import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Layout/NavBar.jsx";
import Footer from "./components/Layout/Footer.jsx";

import SplashPage from "./pages/SplashPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ExplorerPage from "./pages/ExplorerPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ManageDatasetsPage from "./pages/ManageDatasetsPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Pages that hide navbar
  const hideNavbarOn = ["/explorer"];
  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  // Pages that hide footer
  const hideFooterOn = ["/login", "/signup", "/explorer"];
  const shouldShowFooter = !hideFooterOn.includes(location.pathname);

  console.log("CURRENT ROUTE:", location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/explorer" element={<ExplorerPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/datasets" element={<ManageDatasetsPage />} />

      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
}
