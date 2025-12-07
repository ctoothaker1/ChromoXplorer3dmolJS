import { Navbar, NavbarBrand, Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import styles from "../pages/ExplorerPage.module.css";
import logo from "../assets/images/logo.png";

export default function ExplorerTopBar({ selectedCell, setSelectedCell }) {
    const navigate = useNavigate();

    return (
        <Navbar className={styles.explorerTopBar} expand="md">
            {/* LEFT — Logo */}
            <NavbarBrand
                onClick={() => navigate("/")}
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
                <img src={logo} alt="logo" className={styles.topbarLogo} />
            </NavbarBrand>

            {/* CENTER — Cell Type Dropdown */}
            <div className={styles.dropdownCenter}>
                <Input
                    type="select"
                    className={styles.topbarDropdown}
                    value={selectedCell}
                    onChange={(e) => setSelectedCell(e.target.value)}
                >
                    <option value="">-- Select Cell Type --</option>
                    <option value="H1-hESC">H1-hESC</option>
                    <option value="GM12878">GM12878</option>
                    <option value="IMR90">IMR-90</option>
                    <option value="K562">K562</option>
                    <option value="mESC">Mouse ESC</option>
                </Input>
            </div>

            {/* RIGHT — Buttons */}
            <div className={styles.topbarRight}>
                <Button className={styles.topbarButton} onClick={() => navigate(-1)}>
                    Go Back
                </Button>
                <Button className={styles.topbarButton} onClick={() => navigate("/signup")}>
                    Sign Up
                </Button>
            </div>
        </Navbar>
    );
}
