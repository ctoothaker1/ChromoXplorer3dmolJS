import { Button } from "reactstrap";
import styles from "../pages/ExplorerPage.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

export default function ExplorerTopBar({ selectedCell, setSelectedCell }) {
    const navigate = useNavigate();

    return (
        <div className={styles.topBar}>
            <img src={logo} style={{ width: 38, height: 38 }} alt="logo" />

            {/* Center Dropdown */}
            <div className={styles.cellDropdownWrapper}>
                <select
                    className="form-select"
                    style={{
                        width: 240,
                        background: "#DDDCDC",
                        borderRadius: 17,
                        border: "none",
                    }}
                    value={selectedCell}
                    onChange={(e) => setSelectedCell(e.target.value)}
                >
                    <option>-- Select Cell Type --</option>
                    <option value="H1-hESC">H1-hESC</option>
                    <option value="GM12878">GM12878 (Lymphoblastoid)</option>
                    <option value="IMR-90">IMR-90 Fibroblast</option>
                    <option value="K562">K562 (Myelogenous Leukemia)</option>
                    <option value="mESC">Mouse ESC</option>
                </select>
            </div>

            {/* Right Buttons */}
            <div className={styles.topBarBtns}>
                <Button color="light" onClick={() => navigate(-1)}>
                    Go Back
                </Button>
                <Button color="light" onClick={() => navigate("/signup")}>
                    Sign Up
                </Button>
            </div>
        </div>
    );
}
