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

    return (
        <div className={styles.explorerWrapper}>
            {/* Floating Top Bar */}
            <ExplorerTopBar
                selectedCell={selectedCell}
                setSelectedCell={setSelectedCell}
            />

            {/* 3D Background */}
            <div className={styles.canvasBackground}>
                <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} />
                    <OrbitControls enablePan enableZoom enableRotate />
                    <GenomeScene level={level} />
                </Canvas>
            </div>

            {/* Floating UI: Level Controls */}
            <div className={styles.uiContainer}>
                <ExplorerLevelControls level={level} setLevel={setLevel} />
            </div>
        </div>
    );
}
