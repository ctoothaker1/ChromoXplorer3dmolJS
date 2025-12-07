import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./AdminPage.module.css";

export default function AdminPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user || user.role !== "admin") {
        return <div className={styles.denied}>Access Denied</div>;
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Admin Dashboard</h1>

            {/* User Management */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>User Management</h2>
                <p>View, promote, or remove users (mock UI for now)</p>
            </section>

            {/* Genome Preset Manager */}
            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Genome Presets</h2>

                <button
                    className={styles.purpleButton}
                    onClick={() => navigate("/admin/datasets")}
                >
                    Manage Genome Datasets
                </button>
            </section>

            <button
                onClick={() => navigate("/account")}
                className={styles.backButton}
            >
                Back to Account
            </button>
        </div>
    );
}
