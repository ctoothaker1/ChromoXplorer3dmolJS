import * as THREE from "three";
import { useMemo } from "react";
import { generateChromosomeCluster } from "../../utils/generation/generateChromosomeCluster";

const COLORS = [
    "#ff6b6b", "#4dabf7", "#51cf66", "#f783ac",
    "#ffd43b", "#845ef7", "#20c997", "#ff922b",
];

export default function ChromosomeTerritories3D({ onSelect }) {

    const chromosomes = ["Chr1", "Chr2", "Chr3", "Chr4", "Chr5", "Chr6", "Chr7", "ChrX"];

    const clusters = useMemo(() => {
        return chromosomes.map((chr, i) => {
            const rotation = new THREE.Euler(
                0,
                (i / chromosomes.length) * Math.PI * 2,
                (i % 2) * 0.8
            );

            return {
                id: chr,
                color: COLORS[i % COLORS.length],
                path: generateChromosomeCluster({
                    points: 450,
                    radius: 4,
                    sectorRotation: rotation
                })
            };
        });
    }, []);

    return (
        <group>

            {/* Transparent nucleus */}
            <mesh>
                <sphereGeometry args={[5, 32, 32]} />
                <meshStandardMaterial transparent opacity={0.05} color="#ffffff" />
            </mesh>

            {/* Chromosome squiggles */}
            {clusters.map((chr, i) => {
                const curve = new THREE.CatmullRomCurve3(chr.path);
                const tube = new THREE.TubeGeometry(curve, 300, 0.06, 8, false);

                return (
                    <mesh
                        key={chr.id}
                        geometry={tube}
                        onClick={() =>
                            onSelect({
                                id: chr.id,
                                type: "Chromosome Territory",
                                description: `Simulated 3D random-walk model of ${chr.id}.`,
                            })
                        }
                    >
                        <meshStandardMaterial
                            color={chr.color}
                            transparent
                            opacity={0.75}
                            roughness={0.8}
                        />
                    </mesh>
                );
            })}

        </group>
    );
}
