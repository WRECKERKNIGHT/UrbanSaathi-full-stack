"use client"

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, MeshReflectorMaterial, useCursor } from '@react-three/drei'
import { motion } from 'framer-motion-3d'
import * as THREE from 'three'

function GlassCase({ position, color, label }: { position: [number, number, number], color: string, label: string }) {
    const [isShattered, setIsShattered] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    useCursor(isHovered)

    return (
        <group position={position} onPointerOver={() => setIsHovered(true)} onPointerOut={() => setIsHovered(false)}>
            {!isShattered ? (
                <mesh onClick={() => setIsShattered(true)}>
                    <boxGeometry args={[2, 3, 2]} />
                    <meshPhysicalMaterial
                        transparent
                        opacity={0.3}
                        roughness={0}
                        metalness={1}
                        transmission={0.9}
                        thickness={1}
                        color={isHovered ? color : "#ffffff"}
                    />
                    <Float speed={5} rotationIntensity={0.5}>
                        <mesh position={[0, 0, 0]}>
                            <icosahedronGeometry args={[0.5, 0]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                        </mesh>
                    </Float>
                </mesh>
            ) : (
                <group>
                    {[...Array(20)].map((_, i) => (
                        <motion.mesh
                            key={i}
                            initial={{ x: 0, y: 0, z: 0, rotation: [0, 0, 0] }}
                            animate={{
                                x: (Math.random() - 0.5) * 5,
                                y: (Math.random() - 0.5) * 5,
                                z: (Math.random() - 0.5) * 5,
                                rotateX: Math.random() * 10,
                                opacity: 0
                            }}
                            transition={{ duration: 1 }}
                        >
                            <boxGeometry args={[0.2, 0.2, 0.2]} />
                            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
                        </motion.mesh>
                    ))}
                    {/* The revealed item */}
                    <Float speed={10} rotationIntensity={2}>
                        <mesh>
                            <icosahedronGeometry args={[1, 1]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
                        </mesh>
                    </Float>
                </group>
            )}

            {/* Label in 2D (Overlayed in a real app, here we use simple sprite/plane) */}
        </group>
    )
}

export default function GalleryCarousel() {
    return (
        <div className="w-full h-[600px] bg-black border border-primary/20">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#FF003C" />
                <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ADFF00" />

                <group rotation={[0, -Math.PI / 6, 0]}>
                    <GlassCase position={[-4, 0, 0]} color="#FF003C" label="ASSET_01" />
                    <GlassCase position={[0, 0, 0]} color="#ADFF00" label="ASSET_02" />
                    <GlassCase position={[4, 0, 0]} color="#00F0FF" label="ASSET_03" />
                </group>

                {/* Floor Reflections */}
                <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[50, 50]} />
                    <MeshReflectorMaterial
                        blur={[300, 100]}
                        resolution={2048}
                        mixBlur={1}
                        mixStrength={40}
                        roughness={1}
                        depthScale={1.2}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.4}
                        color="#050505"
                        metalness={0.5}
                        mirror={0}
                    />
                </mesh>
            </Canvas>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="text-[10px] text-white/20 font-mono uppercase tracking-[1em]">INTERACTIVE_SHOWCASE</div>
            </div>
        </div>
    )
}
