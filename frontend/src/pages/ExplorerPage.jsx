import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import styles from "./ExplorerPage.module.css";

import ExplorerTopBar from "../components/ExplorerTopBar";
import ExplorerLevelControls from "../components/ExplorerLevelControls";
import GenomeScene from "../components/GenomeScene";

export default function ExplorerPage() {
    const [level, setLevel] = useState(1);
    const [selectedCell, setSelectedCell] = useState("");
    const [selectedObject, setSelectedObject] = useState(null);
    // <- YOU MUST ADD THIS

    return (
        <div className={styles.explorerWrapper}>

            {/* TOP BAR */}
            <ExplorerTopBar
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
            />

            {/* 3D BACKGROUND */}
            <div className={styles.canvasBackground}>
                <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enablePan enableRotate enableZoom />

                    {/*  */}
                    <GenomeScene level={level} onSelect={setSelectedObject} />
                </Canvas>
            </div>

            {/* FLOATING LEVEL BUTTONS */}
            <div className={styles.uiContainer}>
                <ExplorerLevelControls level={level} setLevel={setLevel} />
            </div>


            {selectedObject ? (
                <div className={styles.infoPanel}>
                    <div className={styles.infoTitle}>Selection Details</div>
                    <div className={styles.infoRow}><strong>ID:</strong> {selectedObject.id}</div>
                    <div className={styles.infoRow}><strong>Type:</strong> {selectedObject.type}</div>
                    <div className={styles.infoRow}><strong>Description:</strong> {selectedObject.description}</div>
                </div>
            ) : (
                <div className={styles.infoPanel}>
                    <div className={styles.infoTitle}>Selection Details</div>
                    <div className={styles.infoEmpty}>
                        Click any element in the 3D view to inspect it.
                    </div>
                </div>
            )}

        </div>
    );
}
