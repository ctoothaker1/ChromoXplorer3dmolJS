import { useMemo } from "react";
import * as THREE from "three";

/**
 * Main genome scene router
 * Chooses which visualization level to show.
 */
export default function GenomeScene({ level }) {
    return (
        <>
            {level === 1 && <ChromosomeTerritories />}
            {level === 2 && <CompartmentView />}
            {level === 3 && <TadInteractionView />}
        </>
    );
}

/* -------------------------------------- */
/* LEVEL 1 — CHROMOSOME TERRITORIES       */
/* -------------------------------------- */
function ChromosomeTerritories() {
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
            {/* Transparent nucleus */}
            <mesh>
                <sphereGeometry args={[4, 32, 32]} />
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.1}
                />
            </mesh>

            {/* Chromosome spheres */}
            {chromosomes.map((chr) => (
                <mesh key={chr.id} position={chr.position}>
                    <sphereGeometry args={[0.6, 32, 32]} />
                    <meshStandardMaterial color={chr.color} />
                </mesh>
            ))}
        </group>
    );
}

/* -------------------------------------- */
/* LEVEL 2 — A/B COMPARTMENTS             */
/* -------------------------------------- */
function CompartmentView() {
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
                <mesh key={c.id} position={c.position}>
                    <boxGeometry args={[1.4, 1.0, 1.4]} />
                    <meshStandardMaterial
                        color={c.color}
                        transparent
                        opacity={0.65}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* -------------------------------------- */
/* LEVEL 3 — TAD INTERACTION NETWORK      */
/* -------------------------------------- */
function TadInteractionView() {
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

    const getNode = (id) => nodes.find((n) => n.id === id);

    return (
        <group>
            {/* Draw edges as 3D lines */}
            {edges.map(([from, to], i) => {
                const a = getNode(from);
                const b = getNode(to);

                const points = new Float32Array([
                    ...a.position,
                    ...b.position,
                ]);

                return (
                    <line key={i}>
                        <bufferGeometry attach="geometry">
                            <bufferAttribute
                                attach="attributes-position"
                                array={points}
                                itemSize={3}
                                count={2}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="white" linewidth={2} />
                    </line>
                );
            })}

            {/* Draw node spheres */}
            {nodes.map((node) => (
                <mesh key={node.id} position={node.position}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color="#fcc419" />
                </mesh>
            ))}
        </group>
    );
}
