import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {
	OrbitControls,
	TrackballControls,
	Stars,
	Float,
	Text3D,
} from "@react-three/drei";
import * as THREE from "three";
import Earth from "./objects/Earth";
import Moon from "./objects/Moon";

function App() {
	return (
		<Canvas
			linear
			flat
			camera={{
				position: [3, 2, 5],
			}}
		>
			<Suspense
				fallback={
					<Text3D
						font="helvetiker_regular.typeface.json"
						position={[-1, 0, 3]}
						rotation={[0, 1, 0]}
					>
						Loading...
					</Text3D>
				}
			>
				{/* <axesHelper args={[3]} /> */}
				<OrbitControls />
				<ambientLight intensity={1} color={0x888888} />
				<directionalLight
					color={0xfdfcf0}
					intensity={2.3}
					position={[-20, 10, 25]}
				/>
				{/* <pointLight position={[10, 10, 10]} intensity={0.5} /> */}
				<Stars saturation={0} count={1000} speed={0.8} fade />
				<Float speed={4} floatIntensity={0.5} rotationIntensity={0}>
					<Earth />
				</Float>
				<Float speed={4} floatIntensity={0.5} rotationIntensity={0}>
					<Moon />
				</Float>
			</Suspense>
		</Canvas>
	);
}

export default App;
