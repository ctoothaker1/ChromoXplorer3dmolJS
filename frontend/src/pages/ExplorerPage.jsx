import { useState, useMemo } from "react";
import { Container, Row, Col, Card, CardBody, Button, Badge } from "reactstrap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import styles from "./ExplorerPage.module.css";

export default function ExplorerPage() {
    const [level, setLevel] = useState(1); // 1: Territories, 2: Compartments, 3: TADs
    const [selected, setSelected] = useState(null);

    const levelLabel =
        level === 1
            ? "Chromosome Territories"
            : level === 2
                ? "A/B Compartments"
                : "TAD Interactions";

    return (
        <div className={styles.pageWrapper}>
            <Container fluid>
                <Row className="mb-4">
                    <Col>
                        <h2 className={styles.heading}>Genome Explorer</h2>
                        <p className={styles.subheading}>
                            Navigate chromatin architecture from whole chromosomes to local TAD
                            interaction networks.
                        </p>
                    </Col>
                </Row>

                <Row className="gy-4">
                    {/* Sidebar */}
                    <Col xs="12" lg="4">
                        <Card className="h-100">
                            <CardBody>
                                <h5 className={styles.sidebarSectionTitle}>Visualization Level</h5>
                                <Button
                                    color="light"
                                    className={`${styles.levelButton} ${level === 1 ? styles.levelButtonActive : ""
                                        }`}
                                    onClick={() => setLevel(1)}
                                >
                                    <strong>Level 1:</strong> Chromosome Territories
                                </Button>
                                <Button
                                    color="light"
                                    className={`${styles.levelButton} ${level === 2 ? styles.levelButtonActive : ""
                                        }`}
                                    onClick={() => setLevel(2)}
                                >
                                    <strong>Level 2:</strong> A/B Compartments
                                </Button>
                                <Button
                                    color="light"
                                    className={`${styles.levelButton} ${level === 3 ? styles.levelButtonActive : ""
                                        }`}
                                    onClick={() => setLevel(3)}
                                >
                                    <strong>Level 3:</strong> TAD Interactions
                                </Button>

                                <hr className="my-4" />

                                <h6 className={styles.sidebarSectionTitle}>Current View</h6>
                                <p className="mb-2">
                                    <Badge color="secondary" pill>
                                        {levelLabel}
                                    </Badge>
                                </p>
                                <p className="text-muted">
                                    Use your mouse or trackpad to rotate and zoom the 3D scene. Click on
                                    elements to inspect mock details.
                                </p>

                                <hr className="my-4" />

                                <h6 className={styles.sidebarSectionTitle}>Selection Details</h6>
                                {selected ? (
                                    <>
                                        <p className="mb-1">
                                            <strong>ID:</strong> {selected.id}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Type:</strong> {selected.type}
                                        </p>
                                        <p className="mb-1">
                                            <strong>Description:</strong> {selected.description}
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-muted">
                                        Click a chromosome, compartment, or TAD node in the 3D view to see
                                        details here.
                                    </p>
                                )}

                                <hr className="my-4" />

                                <h6 className={styles.sidebarSectionTitle}>Legend</h6>
                                {level === 1 && (
                                    <>
                                        <p>
                                            <span
                                                className={styles.legendDot}
                                                style={{ backgroundColor: "#ff6b6b" }}
                                            />
                                            Chromosome 1–7
                                        </p>
                                        <p>
                                            <span
                                                className={styles.legendDot}
                                                style={{ backgroundColor: "#4dabf7" }}
                                            />
                                            Chromosome 8–14
                                        </p>
                                        <p>
                                            <span
                                                className={styles.legendDot}
                                                style={{ backgroundColor: "#51cf66" }}
                                            />
                                            Chromosome 15–22 / X
                                        </p>
                                    </>
                                )}
                                {level === 2 && (
                                    <>
                                        <p>
                                            <span
                                                className={styles.legendDot}
                                                style={{ backgroundColor: "#4dabf7" }}
                                            />
                                            Compartment A (active)
                                        </p>
                                        <p>
                                            <span
                                                className={styles.legendDot}
                                                style={{ backgroundColor: "#adb5bd" }}
                                            />
                                            Compartment B (inactive)
                                        </p>
                                    </>
                                )}
                                {level === 3 && (
                                    <>
                                        <p>
                                            <span
                                                className={styles.legendDot}
                                                style={{ backgroundColor: "#fcc419" }}
                                            />
                                            TAD nodes
                                        </p>
                                        <p>
                                            <span
                                                className={styles.legendDot}
                                                style={{ backgroundColor: "#ffffff", border: "1px solid #999" }}
                                            />
                                            Interaction edges
                                        </p>
                                    </>
                                )}
                            </CardBody>
                        </Card>
                    </Col>

                    {/* 3D Viewer */}
                    <Col xs="12" lg="8">
                        <Card className={styles.viewerCard}>
                            <div className={styles.canvasContainer}>
                                <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                                    <ambientLight intensity={0.4} />
                                    <pointLight position={[10, 10, 10]} intensity={1.0} />
                                    <GenomeScene level={level} onSelect={setSelected} />
                                    <OrbitControls enablePan enableZoom enableRotate />
                                </Canvas>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

/* ---------- 3D Scene + Level Components ---------- */

function GenomeScene({ level, onSelect }) {
    return (
        <>
            {level === 1 && <ChromosomeTerritories onSelect={onSelect} />}
            {level === 2 && <CompartmentView onSelect={onSelect} />}
            {level === 3 && <TadInteractionView onSelect={onSelect} />}
        </>
    );
}

function ChromosomeTerritories({ onSelect }) {
    const chromosomes = useMemo(
        () => [
            { id: "Chr1", color: "#ff6b6b", position: [-2.5, 1.5, 0] },
            { id: "Chr2", color: "#4dabf7", position: [2, 1.8, -1] },
            { id: "Chr3", color: "#51cf66", position: [-1.5, -1.5, 1] },
            { id: "Chr4", color: "#f783ac", position: [1.8, -1.3, -1.5] },
            { id: "ChrX", color: "#ffd43b", position: [0.2, 0.1, 2] },
        ],
        []
    );

    return (
        <group>
            {/* nucleus sphere */}
            <mesh>
                <sphereGeometry args={[4, 32, 32]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.15} />
            </mesh>

            {chromosomes.map((chr) => (
                <mesh
                    key={chr.id}
                    position={chr.position}
                    onClick={() =>
                        onSelect({
                            id: chr.id,
                            type: "Chromosome Territory",
                            description: `Mock territory representing ${chr.id} within the nucleus.`,
                        })
                    }
                >
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshStandardMaterial color={chr.color} />
                </mesh>
            ))}
        </group>
    );
}

function CompartmentView({ onSelect }) {
    const compartments = useMemo(
        () => [
            { id: "A1", type: "A", color: "#4dabf7", position: [-2, 1, 0] },
            { id: "A2", type: "A", color: "#4dabf7", position: [2, -0.5, 1] },
            { id: "B1", type: "B", color: "#adb5bd", position: [0, 2, -1] },
            { id: "B2", type: "B", color: "#adb5bd", position: [-1.5, -2, -0.5] },
        ],
        []
    );

    return (
        <group>
            {compartments.map((c) => (
                <mesh
                    key={c.id}
                    position={c.position}
                    onClick={() =>
                        onSelect({
                            id: c.id,
                            type: `Compartment ${c.type}`,
                            description: `Mock ${c.type} compartment illustrating active/inactive chromatin regions.`,
                        })
                    }
                >
                    <boxGeometry args={[1.4, 1.0, 1.4]} />
                    <meshStandardMaterial color={c.color} transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
}

function TadInteractionView({ onSelect }) {
    const nodes = useMemo(
        () => [
            { id: "TAD1", position: [-2, 0, 0] },
            { id: "TAD2", position: [0, 1.8, 0.5] },
            { id: "TAD3", position: [2, 0.3, -0.5] },
            { id: "TAD4", position: [0, -1.8, 0.3] },
        ],
        []
    );

    const edges = useMemo(
        () => [
            ["TAD1", "TAD2"],
            ["TAD2", "TAD3"],
            ["TAD2", "TAD4"],
            ["TAD1", "TAD4"],
        ],
        []
    );

    // helper to find node by id
    const getNode = (id) => nodes.find((n) => n.id === id);

    return (
        <group>
            {/* edges as simple lines */}
            {edges.map(([a, b], idx) => {
                const na = getNode(a);
                const nb = getNode(b);
                if (!na || !nb) return null;

                const points = [
                    [na.position[0], na.position[1], na.position[2]],
                    [nb.position[0], nb.position[1], nb.position[2]],
                ];

                return (
                    <line key={idx}>
                        <bufferGeometry
                            attach="geometry"
                            attributes={{
                                position: {
                                    itemSize: 3,
                                    array: new Float32Array(points.flat()),
                                    count: 2,
                                },
                            }}
                        />
                        <lineBasicMaterial color="#ffffff" />
                    </line>
                );
            })}

            {/* nodes */}
            {nodes.map((node) => (
                <mesh
                    key={node.id}
                    position={node.position}
                    onClick={() =>
                        onSelect({
                            id: node.id,
                            type: "TAD",
                            description: `Mock topologically associating domain representing local chromatin interaction hub.`,
                        })
                    }
                >
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color="#fcc419" />
                </mesh>
            ))}
        </group>
    );
}
