import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler,
    Collapse,
    Button,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";   // <-- NEW
import logo from "../../assets/images/logo.png";
import styles from "./NavBar.module.css";

export default function AppNavbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth(); // <-- NEW

    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const navItems = [
        { label: "Home", path: "/" },
        { label: "Products", path: "/products" },
        { label: "About Us", path: "/about" },
        { label: "Resources", path: "/resources" },
        { label: "Pricing", path: "/pricing" },
    ];

    return (
        <Navbar expand="lg" className={styles.navbarContainer}>
            {/* Brand */}
            <NavbarBrand onClick={() => navigate("/")} className={styles.brand}>
                <img src={logo} alt="ChroMonauts Logo" className={styles.logo} />
                ChromoXplorer
            </NavbarBrand>

            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    {navItems.map((item) => (
                        <NavItem key={item.path}>
                            <NavLink
                                onClick={() => navigate(item.path)}
                                className={`${styles.navLink} ${location.pathname === item.path
                                    ? styles.activeNavLink
                                    : ""
                                    }`}
                            >
                                {item.label}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>

                {/* RIGHT SIDE BUTTONS */}
                <div className="d-flex gap-3 align-items-center mt-3 mt-md-0">

                    <Button
                        className={styles.purpleButton}
                        onClick={() => navigate("/explorer")}
                    >
                        Go to App
                    </Button>

                    {/* ====================== */}
                    {/* AUTH LOGIC BEGINS HERE */}
                    {/* ====================== */}

                    {!user && (
                        <>
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
                        </>
                    )}

                    {user && (
                        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle
                                caret
                                className={styles.purpleButton}
                            >
                                {user.name}
                            </DropdownToggle>

                            <DropdownMenu end>
                                <DropdownItem onClick={() => navigate("/account")}>
                                    My Account
                                </DropdownItem>

                                <DropdownItem divider />

                                <DropdownItem
                                    onClick={() => {
                                        logout();
                                        navigate("/");
                                    }}
                                >
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                    {user?.role === "admin" && (
                        <Button
                            className={styles.purpleButton}
                            onClick={() => navigate("/admin")}
                        >
                            Admin
                        </Button>
                    )}
                </div>
            </Collapse>
        </Navbar>
    );
}
