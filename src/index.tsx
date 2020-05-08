import ReactDOM from 'react-dom';
import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import { Vector3 } from 'three';

import Box from './components/Box';
import './indexStyle.css';

const pointingLightPosition = new Vector3(10, 10, 10);
const position1 = new Vector3(-1.2, 0, 0);
const position2 = new Vector3(1.2, 0, 0);

ReactDOM.render(
    <Canvas colorManagement>
      <ambientLight />
      <pointLight position={pointingLightPosition} />
      <Box position={position1} />
      <Box position={position2} />
    </Canvas>,
    document.getElementById('root')
  )