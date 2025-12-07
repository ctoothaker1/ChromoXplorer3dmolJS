import { useMemo } from "react";
import * as THREE from "three";

import ChromosomeTerritories3D from "./ChromosomeTerritories3D";
import ABCompartmentView from "./ABCompartmentView";

/**
 * Main genome scene router
 * Chooses which visualization level to show.
 */
export default function GenomeScene({ level, genome, onSelect }) {
    return (
        <>
            {level === 1 && <ChromosomeTerritories3D onSelect={onSelect} />}
            {level === 2 && <ABCompartmentView onSelect={onSelect} />}
            {level === 3 && <TadInteractionView onSelect={onSelect} />}
        </>
    );
}



/* -------------------------------------- */
/* LEVEL 3 — TAD INTERACTION NETWORK      */
/* -------------------------------------- */
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
                <mesh key={node.id} position={node.position} onClick={() =>
                    onSelect({
                        id: node.id,
                        type: "TAD Node",
                        description: "Mock representation of a TAD interaction node.",
                    })
                }>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color="#fcc419" />
                </mesh>
            ))}
        </group>
    );
}
