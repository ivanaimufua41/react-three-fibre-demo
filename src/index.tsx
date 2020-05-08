import ReactDOM from 'react-dom';
import * as React from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, extend, ReactThreeFiber, useThree, useFrame } from 'react-three-fiber';
import * as THREE from 'three';

import './indexStyle.css';

declare global {
	namespace JSX {
		interface IntrinsicElements {
			orbitControls: ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
			fog: ReactThreeFiber.Node<THREE.Fog, typeof THREE.Fog>
		}
	}
}

extend({ OrbitControls });

const WaterBottle: React.FC = () => {
	const [model, setModel] = React.useState<any>();
	React.useEffect(() => {
		new GLTFLoader().load('./scene.gltf', setModel);
	}, []);

	return model ? <primitive object={model.scene} /> : null;
}

const Plane = () => (
	<mesh
		rotation={[-Math.PI / 2, 0, 0]} // turnning 360
		position={[0, -1, 0]}
		receiveShadow={true}
	>
		<planeBufferGeometry
			attach="geometry"
			args={[100, 100]}
		/>
		<meshPhysicalMaterial
			attach="material"
			color='white'
		/>
	</mesh>
)

const Controls: React.FC = () => {
	const { camera, gl } = useThree();
	const orbitRef: any = React.useRef();

	useFrame(() => orbitRef.current.update())
	return (
		<orbitControls
			ref={orbitRef}
			maxPolarAngle={Math.PI / 3}
			minPolarAngle={Math.PI / 3}
			autoRotate={true}
			args={[camera, gl.domElement]}
		/>
	)
}

const Box: React.FC<{}> = () => {
	// const meshRef: any = React.useRef();
	const [hovered, setHovered] = React.useState(false);
	const [active, setActive] = React.useState(false);

	// useFrame(() => {
	// 	meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01
	// })


	return (
		<mesh
			// ref={meshRef}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
			onClick={() => setActive(!active)}
			scale={active ? [3, 3, 3] : [1.1, 1.1, 1.1]}
			castShadow={true}
			receiveShadow={true}
		>
			<boxBufferGeometry
				attach="geometry"
				args={[1, 1, 1]}
			/>
			<meshPhysicalMaterial
				attach="material"
				color={hovered ? 'hotpink' : 'grey'}
			/>
		</mesh>
	)
}

const colour = new THREE.Color("white");

ReactDOM.render(
	<Canvas
		camera={{ position: [0, 0, 5] }}
		shadowMap={true}
	>
		<fog
			attach="fog"
			args={[5, 10, 15]}
			color={colour}
		/>
		<Controls />
		<ambientLight castShadow={true}/>
		<spotLight
			position={[15, 20, 5]}
			intensity={.3}
			castShadow={true}
			receiveShadow={true}
		/>
		<Box />
		{/* <WaterBottle /> */}
		<Plane />
	</Canvas>,
	document.getElementById('root')
)