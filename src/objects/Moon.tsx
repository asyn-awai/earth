import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Moon() {
	const map = useLoader(TextureLoader, "moonMap.jpg");
	const moonRef = useRef<THREE.Group>(null!);
	const orbitRadius = 5;
	var theta = 0;
	var dTheta = (2 * Math.PI) / 1000;
	useFrame((state, delta) => {
		moonRef.current.lookAt(0, 0, 0);
		// moonRef.current.rotation.y += delta / 5;
		//rotate around origin
		console.log(Math.cos(delta));
		theta += dTheta;
		moonRef.current.position.x = orbitRadius * Math.cos(theta);
		moonRef.current.position.z = orbitRadius * -Math.sin(theta);
		moonRef.current.position.y = Math.sin(theta) * 1.25;
	});
	return (
		<>
			<group
				ref={moonRef}
				position={[0, 0, 0]}
				rotation={[0, (23.5 * Math.PI) / 180, 0]}
			>
				<mesh>
					<sphereGeometry args={[0.51, 36, 36]} />
					<meshPhongMaterial
						color={"black"}
						opacity={0.2}
                        transparent
						depthWrite
					/>
				</mesh>
				<mesh>
					{/* <axesHelper args={[3]} /> */}
					<sphereGeometry args={[0.5, 36, 36]} />
					<meshStandardMaterial map={map} />
				</mesh>
			</group>
		</>
	);
}

export default Moon;
