import styles from "./AccountSidebar.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AccountSidebar({ activeTab, setActiveTab }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <div className={styles.userBox}>
                <div className={styles.avatar}>{user.name[0]}</div>
                <div className={styles.userName}>{user.name}</div>
                <div className={styles.userEmail}>{user.email}</div>
            </div>

            <div
                className={`${styles.item} ${activeTab === "profile" ? styles.active : ""}`}
                onClick={() => setActiveTab("profile")}
            >
                Profile
            </div>

            <div
                className={`${styles.item} ${activeTab === "security" ? styles.active : ""}`}
                onClick={() => setActiveTab("security")}
            >
                Security
            </div>

            <div className={styles.itemLogout} onClick={() => { logout(); navigate("/"); }}>
                Logout
            </div>
        </div>
    );
}
