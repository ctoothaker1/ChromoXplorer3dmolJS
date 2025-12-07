import { useState } from "react";
import { loadPresets } from "../utils/presets/loadPresets";
import { savePresets } from "../utils/presets/savePresets";
import { useAuth } from "../context/AuthContext";
import DatasetList from "../components/Admin/DatasetList";
import DatasetUploadForm from "../components/Admin/DatasetUploadForm";
import styles from "./ManageDatasetsPage.module.css";
import { useNavigate } from "react-router-dom";

export default function ManageDatasetsPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user || user.role !== "admin") {
        return <div className={styles.denied}>Access Denied</div>;
    }

    const [datasets, setDatasets] = useState(loadPresets());

    function handleSave(updated) {
        setDatasets(updated);
        savePresets(updated);
    }

    function addDataset(dataset) {
        const updated = [...datasets, dataset];
        handleSave(updated);
    }

    function deleteDataset(id) {
        const updated = datasets.filter(d => d.id !== id);
        handleSave(updated);
    }

    function setActive(id) {
        const updated = datasets.map(d => ({
            ...d,
            active: d.id === id
        }));

        handleSave(updated);
    }

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.header}>Manage Genome Datasets</h1>

            <div className={styles.section}>
                <DatasetUploadForm onAdd={addDataset} />
            </div>

            <div className={styles.section}>
                <DatasetList
                    datasets={datasets}
                    onDelete={deleteDataset}
                    onActivate={setActive}
                />
            </div>

            <button
                className={styles.backButton}
                onClick={() => navigate("/admin")}
            >
                Back to Admin Dashboard
            </button>
        </div>
    );
}
