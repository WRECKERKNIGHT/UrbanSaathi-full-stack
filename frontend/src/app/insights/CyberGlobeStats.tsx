"use client"

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

function GlobeLines() {
    const linesRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
        }
    })

    return (
        <group ref={linesRef}>
            {/* Latitude/Longitude grid */}
            <mesh>
                <sphereGeometry args={[2.05, 16, 16]} />
                <meshBasicMaterial color="#ADFF00" wireframe transparent opacity={0.1} />
            </mesh>

            {/* Plasma Veins (Random arcs) */}
            {[...Array(10)].map((_, i) => (
                <group key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[2, 0.01, 8, 50, Math.random() * Math.PI]} />
                        <meshBasicMaterial color="#FF003C" transparent opacity={0.5} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}

function StatGlobe() {
    const globeRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (globeRef.current) {
            globeRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
        }
    })

    return (
        <group>
            <Sphere ref={globeRef} args={[2, 64, 64]}>
                <MeshDistortMaterial
                    color="#050505"
                    roughness={0.1}
                    metalness={1}
                    distort={0.2}
                    speed={2}
                    emissive="#FF003C"
                    emissiveIntensity={0.2}
                />
            </Sphere>
            <GlobeLines />
            <Stars radius={50} count={1000} factor={2} />
        </group>
    )
}

export default function CyberGlobeStats() {
    return (
        <div className="w-full h-[500px] relative border border-primary/20 bg-black/40 backdrop-blur-xl">
            <div className="absolute top-6 left-6 z-10">
                <h3 className="text-xl font-black text-white italic tracking-tighter uppercase">Global_Match_Nexus</h3>
                <p className="text-[10px] text-primary font-mono tracking-widest mt-1">REAL-TIME DATA STREAM ACTIVE</p>
            </div>

            <Canvas camera={{ position: [0, 0, 6] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} intensity={1} color="#FF003C" />
                <pointLight position={[-5, -5, -5]} intensity={1} color="#ADFF00" />
                <StatGlobe />
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    {/* Floating Infographics */}
                    <mesh position={[3, 1, 0]}>
                        <boxGeometry args={[0.5, 0.5, 0.5]} />
                        <meshStandardMaterial color="#FF003C" emissive="#FF003C" emissiveIntensity={2} />
                    </mesh>
                </Float>
            </Canvas>

            <div className="absolute bottom-6 right-6 z-10 text-right space-y-2">
                <div className="text-xs font-bold text-white tracking-widest uppercase">Network_Load: OPTIMAL</div>
                <div className="h-1 w-32 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '65%' }}
                        className="h-full bg-acid-green shadow-[0_0_10px_#ADFF00]"
                    />
                </div>
            </div>
        </div>
    )
}
