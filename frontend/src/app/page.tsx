"use client"

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import CyberSidebar from '@/components/cyber/CyberSidebar'
import GlitchText from '@/components/cyber/GlitchText'
import PlasmaOrbCTA from '@/components/cyber/PlasmaOrbCTA'
import DigitalTarFooter from '@/components/cyber/DigitalTarFooter'
import { ArrowRight, CheckCircle2, Users, Zap, Shield, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Dynamically import HeroScene to prevent hydration issues with Three.js
const HeroScene = dynamic(() => import('@/components/cyber/HeroScene'), { ssr: false })

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'Every worker is thoroughly vetted and verified for skill and reliability',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'Instant Matching',
    description: 'Get matched with the right professional within minutes, not days',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Transparent Pricing',
    description: "No hidden fees. Know exactly what you'll pay before booking",
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join thousands of verified professionals and satisfied customers',
    gradient: 'from-yellow-500 to-orange-500'
  },
]

const stats = [
  { label: 'Active Professionals', value: '1,240+', icon: '👨‍💼' },
  { label: 'Completed Jobs', value: '5,840+', icon: '✓' },
  { label: 'Customer Satisfaction', value: '98.4%', icon: '⭐' },
  { label: 'Response Time', value: '<5 mins', icon: '⚡' },
]

export default function Home() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />
      </div>

      <CyberSidebar />

      {/* 3D Background */}
      <HeroScene />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px w-12 bg-blue-500" />
                    <span className="text-blue-400 text-sm uppercase tracking-[0.3em] font-semibold">Welcome to the Future</span>
                    <div className="h-px w-12 bg-blue-500" />
                  </div>

                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                      Urban<br />Saathi
                    </span>
                  </h1>
                  
                  <p className="text-xl text-gray-300 font-light">
                    Connect with verified local professionals for any task. Fast, reliable, and transparent.
                  </p>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex gap-4 pt-4"
              >
                <button
                  onClick={() => router.push('/login')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  Get Started <ArrowRight className="h-5 w-5" />
                </button>
                <button
                  onClick={() => router.push('/gallery')}
                  className="px-8 py-4 border-2 border-blue-500 text-blue-400 font-bold rounded-lg hover:bg-blue-500/10 transition-all duration-300"
                >
                  Explore Services
                </button>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex gap-6 pt-4"
              >
                {stats.slice(0, 2).map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right side - visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden md:block"
            >
              <div className="relative h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.3),transparent)]" />
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-10 space-y-4"
                >
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="p-4 bg-white/5 border border-blue-500/20 rounded-lg backdrop-blur-sm"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <div className="h-2 flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${60 + i * 10}%` }} />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Urban Saathi?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We're revolutionizing how you find and hire local professionals with our innovative platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-2xl p-12 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 backdrop-blur-sm"
          >
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to get started?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of verified professionals and customers who are already using Urban Saathi.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/login')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              >
                Start Using Urban Saathi
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <DigitalTarFooter />
    </div>
  )
}
