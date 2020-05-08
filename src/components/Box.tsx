import * as React from 'react';
import { useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';

interface IProps {
    position: Vector3;
}

const Box: React.FC<IProps> = (props: IProps) => {
    const mesh = React.useRef();
    const [hovered, setHover] = React.useState<Boolean>(false);
    const [active, setActive] = React.useState<Boolean>(false);
    const activeVectorScale = new Vector3( 1.5, 1.5, 1.5);
    const inActiveVectorScale = new Vector3( 1, 1, 1);

    const setMeshRotation = (mesh: any) => {
        mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }

    useFrame(() => setMeshRotation(mesh));
    return (
        <mesh 
            {...props}
            ref={mesh}
            scale={active ? activeVectorScale : inActiveVectorScale}
            onClick={() => setActive(!active)}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            <boxBufferGeometry 
                attach="geometry"
                args={[1, 1, 1]}
            />
            <meshStandardMaterial 
                attach="material"
                color={hovered ? 'hotpink' : 'red'}
            />
        </mesh>
    )
}

export default Box;