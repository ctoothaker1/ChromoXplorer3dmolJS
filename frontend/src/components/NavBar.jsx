import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Collapse,
    Button,
} from "reactstrap";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import styles from "./NavBar.module.css";

export default function AppNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Products", path: "/products" },
        { label: "About Us", path: "/about" },
        { label: "Resources", path: "/resources" },
        { label: "Pricing", path: "/pricing" },
    ];

    return (
        <Navbar expand="lg" className={styles.navbarContainer}>
            {/* Logo */}
            <NavbarBrand
                onClick={() => navigate("/")}
                className={styles.brand}
            >
                <img src={logo} alt="ChroMonauts Logo" className={styles.logo} />
                ChromoXplorer
            </NavbarBrand>

            {/* Mobile Toggler */}
            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

            {/* Collapsible Menu */}
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    {navItems.map((item) => (
                        <NavItem key={item.path}>
                            <NavLink
                                onClick={() => navigate(item.path)}
                                className={`${styles.navLink} ${location.pathname === item.path ? styles.activeNavLink : ""
                                    }`}
                            >
                                {item.label}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>

                {/* Buttons */}
                <div className="d-flex gap-2 mt-3 mt-md-0">
                    <Button
                        className={styles.purpleButton}
                        onClick={() => navigate("/explorer")}
                    >
                        Go to App
                    </Button>
                    <Button
                        className={styles.purpleButton}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </Button>
                    <Button
                        className={styles.purpleButton}
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </Button>
                </div>
            </Collapse>
        </Navbar>
    );
}
