import { useState, useEffect } from "react";
import { parsePDB } from "../utils/parsePDB";
import * as THREE from "three";

function colorFromIndex(i, total) {
    const t = i / total;
    return new THREE.Color().setHSL(t, 0.65, 0.5);
}

export default function GenomeModel({ pdbText, onSelect }) {
    const [data, setData] = useState(null);
    const scale = 0.3;

    useEffect(() => {
        console.log("PDB TEXT LOADED:", pdbText.slice(0, 200));

        const parsed = parsePDB(pdbText);

        // Remove invalid atoms
        parsed.atoms = parsed.atoms.filter(
            a => a && Number.isFinite(a.x) && Number.isFinite(a.y) && Number.isFinite(a.z)
        );

        setData(parsed);
    }, [pdbText]);

    if (!data) return null;

    const { atoms, bonds } = data;

    const getAtomById = (id) => atoms.find((a) => a.id === id);

    return (
        <group>
            {/* ATOMS */}
            {atoms.map((a, index) => (
                <group key={a.id} position={[a.x * scale, a.y * scale, a.z * scale]}>

                    {/* BLACK OUTLINE (boundary separation) */}
                    <mesh>
                        <sphereGeometry args={[0.26, 20, 20]} />
                        <meshBasicMaterial
                            color="black"
                            transparent
                            opacity={0.35}
                        />
                    </mesh>

                    {/* COLORED HALO */}
                    <mesh>
                        <sphereGeometry args={[0.24, 20, 20]} />
                        <meshStandardMaterial
                            color={colorFromIndex(index, atoms.length)}
                            emissive={colorFromIndex(index, atoms.length)}
                            emissiveIntensity={0.7}
                            transparent
                            opacity={0.2}
                        />
                    </mesh>

                    {/* ATOM CORE */}
                    <mesh
                        onClick={() =>
                            onSelect({
                                id: a.id,
                                type: "Genome Atom",
                                description: `(${a.x}, ${a.y}, ${a.z})`,
                            })
                        }
                    >
                        <sphereGeometry args={[0.22, 20, 20]} />
                        <meshStandardMaterial
                            color={colorFromIndex(index, atoms.length)}
                            emissive={colorFromIndex(index, atoms.length)}
                            emissiveIntensity={0.3}
                        />
                    </mesh>

                </group>
            ))}


            {/* BONDS */}
            {bonds.map((b, i) => {
                const A = getAtomById(b.from);
                const B = getAtomById(b.to);
                if (!A || !B) return null;

                return (
                    <line key={i}>
                        <bufferGeometry>
                            <bufferAttribute
                                attach="attributes-position"
                                array={new Float32Array([
                                    A.x * scale, A.y * scale, A.z * scale,
                                    B.x * scale, B.y * scale, B.z * scale
                                ])}
                                itemSize={3}
                                count={2}
                            />
                        </bufferGeometry>
                        <lineBasicMaterial color="#aaa" linewidth={1} />
                    </line>
                );
            })}
        </group>
    );
}
