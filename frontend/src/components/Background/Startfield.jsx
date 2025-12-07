import { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function Starfield() {
    const points = useMemo(() => {
        const starCount = 2000;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 60;
        }

        return positions;
    }, []);

    return (
        <group>
            <Points positions={points} stride={3} frustumCulled>
                <PointMaterial
                    color="#A0A0A0"
                    size={0.09} // changes dot size
                    sizeAttenuation
                    opacity={1}
                    transparent
                    side={THREE.BackSide}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}
