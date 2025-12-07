import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Layout/NavBar.jsx";
import SplashPage from "./pages/SplashPage.jsx";
import Footer from "./components/Layout/Footer.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import ExplorerPage from "./pages/ExplorerPage.jsx";
// import AccountPage from "./pages/AccountPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Pages that DO NOT show the navbar
  const hideNavbarOn = ["/explorer"];
  const shouldShowNavbar = !hideNavbarOn.includes(location.pathname);

  // Pages that DO NOT show the footer
  const hideFooterOn = ["/login", "/signup", "/explorer"];
  const shouldShowFooter = !hideFooterOn.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/explorer" element={<ExplorerPage />} />
        {/* <Route path="/account" element={<AccountPage />} /> */}
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
}
