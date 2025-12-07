import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import styles from "./ExplorerPage.module.css";

import ExplorerTopBar from "../components/Explorer/ExplorerTopBar";
import ExplorerLevelControls from "../components/Explorer/ExplorerLevelControls";
import GenomeScene from "../components/Genome3D/GenomeScene";
import Starfield from "../components/Background/Startfield";
import pdbText from "../data/hierarchicalGenome.txt?raw";
import GenomeModel from "../components/Genome3D/GenomeModel";
import genomeText from "../data/mockGenomeFile.txt?raw";
import { parseGenomeFile } from "../utils/parsing/parseGenomeFile";



export default function ExplorerPage() {
    const [level, setLevel] = useState(1);
    const [selectedCell, setSelectedCell] = useState("");
    const [selectedObject, setSelectedObject] = useState(null);
    const [genome, setGenome] = useState(null);

    useEffect(() => {
        const parsed = parseGenomeFile(genomeText);
        setGenome(parsed);
    }, []);

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
                    <Starfield />

                    {/*  */}
                    {level === 3 ? (
                        <GenomeModel pdbText={pdbText} onSelect={setSelectedObject} />
                    ) : (
                        <GenomeScene level={level} genome={genome} onSelect={setSelectedObject} />
                    )}

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
