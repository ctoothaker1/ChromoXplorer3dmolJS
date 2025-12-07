import { useMemo } from "react";
import * as THREE from "three";
import { generateChromosomeCluster } from "../../utils/generation/generateChromosomeCluster";

function simulatedCompartmentType(i) {
    return Math.sin(i * 0.15) > 0 ? "A" : "B";
}

export default function ABCompartmentView({ onSelect }) {

    const chromosomes = ["Chr1", "Chr2", "Chr3", "Chr4"];

    const bins = useMemo(() => {
        return chromosomes.map((chr, idx) => {

            const rotation = new THREE.Euler(
                0,
                (idx / chromosomes.length) * Math.PI * 2,
                (idx % 2) * 0.6
            );

            const path = generateChromosomeCluster({
                points: 450,
                radius: 4,
                sectorRotation: rotation
            });

            // Divide chromosome path into smaller bins
            const binSize = 5; // 5 path points per bin
            const result = [];

            for (let i = 0; i < path.length; i += binSize) {

                const segment = path.slice(i, i + binSize);

                const centroid = segment.reduce(
                    (acc, v) => acc.add(v),
                    new THREE.Vector3()
                ).divideScalar(segment.length);

                const compType = Math.sin(i * 0.2) > 0 ? "A" : "B";

                result.push({
                    chr,
                    type: compType,
                    position: centroid
                });
            }

            return result;

        }).flat();
    }, []);

    return (
        <group>
            {bins.map((bin, i) => (
                <mesh
                    key={i}
                    position={bin.position}
                    onClick={() =>
                        onSelect({
                            id: `${bin.chr}-bin${i}`,
                            type: `Compartment ${bin.type}`,
                            description: `Simulated A/B compartment for ${bin.chr}.`
                        })
                    }
                >
                    <sphereGeometry args={[0.15, 16, 16]} />
                    <meshStandardMaterial
                        color={bin.type === "A" ? "#4dabf7" : "#adb5bd"}
                        transparent
                        opacity={bin.type === "A" ? 0.9 : 0.5}
                    />
                </mesh>
            ))}
        </group>
    );
}