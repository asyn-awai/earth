import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";

export default function Earth() {
	const earthRef = useRef<THREE.Group>(null!);
	useFrame((state, delta) => {
		earthRef.current.rotation.y += delta / 15;
		// sphereRef.current.rotation.y += delta * 2;
	});
	return (
		<group rotation={[-(23.5 * Math.PI) / 180, 0, 0]} ref={earthRef}>
			<Atmosphere />
			<Sphere />
		</group>
	);
}

function Sphere() {
	// const colorMap = useLoader(TextureLoader, 'earth.jpg')
	const [colorMap, roughMap, specMap] = useLoader(TextureLoader, [
		"earthDayMap.jpg",
		"earthRoughnessMap.jpg",
		"earthSpecularMap.jpg",
	]);
	const sphereRef = useRef<THREE.Mesh>(null!);
	return (
		<>
			{/* <TrackballControls 
                rotateSpeed={3.0}
            /> */}
			<mesh ref={sphereRef}>
				<sphereGeometry args={[2, 36, 36]} />
				<meshPhongMaterial
					specularMap={colorMap}
					specular={0x333333}
					shininess={25}
					color={0xaaaaaa}
				/>
				{/* <meshStandardMaterial roughnessMap={roughMap} /> */}
				<meshPhongMaterial map={colorMap} />
			</mesh>
		</>
	);
}

function Atmosphere() {
	const cloudsRef = useRef<THREE.Mesh>(null!);
	const cloudsMap = useLoader(TextureLoader, "earthCloudsMap.jpg");
    useFrame((state, delta) => {
        cloudsRef.current.rotation.y += delta / 45;
    })
	return (
		<>
			<mesh ref={cloudsRef}>
				<sphereGeometry args={[2.01, 36, 36]} />
				<meshPhongMaterial
					map={cloudsMap}
					opacity={0.45}
					transparent
					depthWrite
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh>
				<sphereGeometry args={[2.2, 32, 32]} />
				<meshPhongMaterial
					color={0x0099ff}
					transparent
					depthWrite
					opacity={0.1}
				/>
			</mesh>
		</>
	);
}
