"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

function BlackHole() {
    const pointsRef = useRef<THREE.Points>(null)
    const groupRef = useRef<THREE.Group>(null)

    // Custom particle system for the accretion disk
    const particles = useMemo(() => {
        const count = 5000
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2
            const r = 2 + Math.random() * 5
            const x = Math.cos(theta) * r
            const z = Math.sin(theta) * r
            const y = (Math.random() - 0.5) * 0.5

            positions[i * 3] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            // Color gradient from electric crimson to acid green
            const mix = Math.random()
            colors[i * 3] = mix > 0.5 ? 1 : 0.6 // R
            colors[i * 3 + 1] = mix > 0.5 ? 0 : 1 // G
            colors[i * 3 + 2] = 0.2 // B
        }
        return { positions, colors }
    }, [])

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        if (pointsRef.current) {
            pointsRef.current.rotation.y = time * 0.5
        }
        if (groupRef.current) {
            groupRef.current.rotation.y = time * 0.2
        }
    })

    return (
        <group ref={groupRef}>
            {/* Event Horizon */}
            <mesh>
                <sphereGeometry args={[1.5, 64, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Glowing Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.1, 16, 100]} />
                <MeshDistortMaterial
                    color="#FF003C"
                    emissive="#FF003C"
                    emissiveIntensity={10}
                    speed={5}
                    distort={0.4}
                />
            </mesh>

            {/* Accretion Disk Particles */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={particles.positions.length / 3}
                        array={particles.positions}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        count={particles.colors.length / 3}
                        array={particles.colors}
                        itemSize={3}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    vertexColors
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    )
}

function ClanLogo() {
    return (
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
            <mesh position={[0, 0, 0]}>
                <octahedronGeometry args={[1, 0]} />
                <MeshWobbleMaterial
                    color="#ADFF00"
                    emissive="#ADFF00"
                    emissiveIntensity={2}
                    factor={0.4}
                    speed={2}
                />
            </mesh>
            {/* Kill Counters orbiting */}
            {[0, 1, 2].map((i) => (
                <group key={i} rotation={[0, (i * Math.PI * 2) / 3, 0]}>
                    <mesh position={[2, 0, 0]}>
                        <boxGeometry args={[0.2, 0.4, 0.1]} />
                        <meshStandardMaterial color="#FF003C" emissive="#FF003C" emissiveIntensity={5} />
                    </mesh>
                </group>
            ))}
        </Float>
    )
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
                <color attach="background" args={['#050505']} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#FF003C" />
                <pointLight position={[-10, -10, -10]} intensity={2} color="#ADFF00" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <BlackHole />
                <ClanLogo />

                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
        </div>
    )
}
