import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'

function FloatingShape({ position, color }) {
    const meshRef = useRef()

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.2
        meshRef.current.rotation.y += delta * 0.1
    })

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.8}
                />
            </mesh>
        </Float>
    )
}

export default function Background3D() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Canvas camera={{ position: [0, 0, 8] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00c3ff" />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff0055" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <FloatingShape position={[-2, 1, 0]} color="#7000ff" />
                <FloatingShape position={[2, -1, 0]} color="#00c3ff" />
                <FloatingShape position={[0, 2, -2]} color="#ff0055" />

                <fog attach="fog" args={['#030014', 5, 20]} />
            </Canvas>
        </div>
    )
}
