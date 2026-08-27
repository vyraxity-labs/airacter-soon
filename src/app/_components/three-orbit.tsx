'use client'

import { useEffect, useRef } from 'react'
import { useStore, ActiveTheme } from '../_store/store'
import * as THREE from 'three'

interface ThemeConfig {
  bgColor: string
  coreColor: string
  lightColor: string
  orbitColor: string
  wireframe: boolean
  rotationSpeed: number
}

const THEME_CONFIGS: Record<ActiveTheme, ThemeConfig> = {
  BRUTAL: {
    bgColor: '#050811',
    coreColor: '#22c55e',
    lightColor: '#38bdf8',
    orbitColor: '#38bdf8',
    wireframe: true,
    rotationSpeed: 1.5,
  },
  STOIC: {
    bgColor: '#f4f3f0',
    coreColor: '#5c6f68',
    lightColor: '#8c8275',
    orbitColor: '#bda38f',
    wireframe: false,
    rotationSpeed: 0.4,
  },
  NOIR: {
    bgColor: '#121212',
    coreColor: '#e5e5e5',
    lightColor: '#404040',
    orbitColor: '#737373',
    wireframe: false,
    rotationSpeed: 0.2,
  },
  STREET: {
    bgColor: '#110e2e',
    coreColor: '#eab308',
    lightColor: '#ea580c',
    orbitColor: '#16a34a',
    wireframe: true,
    rotationSpeed: 2.5,
  },
}

export default function ThreeOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeTheme = useStore((state) => state.theme)

  // Use refs to pass target colors down to the animation loop
  const targetConfig = useRef<ThemeConfig>(THEME_CONFIGS[activeTheme])

  useEffect(() => {
    targetConfig.current = THEME_CONFIGS[activeTheme]
  }, [activeTheme])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    
    // Background color initialization
    const initialConfig = targetConfig.current
    scene.background = new THREE.Color(initialConfig.bgColor)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.z = 8

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.2)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(initialConfig.lightColor, 15, 30)
    pointLight.position.set(3, 3, 3)
    scene.add(pointLight)

    const coreLight = new THREE.PointLight(initialConfig.coreColor, 10, 15)
    coreLight.position.set(0, 0, 0)
    scene.add(coreLight)

    // Central Sphere (Core AI Engine)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2)
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(initialConfig.coreColor),
      wireframe: initialConfig.wireframe,
      emissive: new THREE.Color(initialConfig.coreColor),
      emissiveIntensity: initialConfig.wireframe ? 0.8 : 0.2,
      roughness: 0.1,
      metalness: 0.8,
    })
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial)
    scene.add(coreMesh)

    // Orbiting Spheres (Personas)
    const orbitGroup = new THREE.Group()
    scene.add(orbitGroup)

    const orbitCount = 4
    const orbitRadius = 3.8
    const orbitMeshes: THREE.Mesh[] = []

    const sphereGeometry = new THREE.SphereGeometry(0.35, 16, 16)
    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2
      const orbitMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(initialConfig.orbitColor),
        roughness: 0.2,
        metalness: 0.7,
      })
      const mesh = new THREE.Mesh(sphereGeometry, orbitMaterial)
      mesh.position.set(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius)
      orbitGroup.add(mesh)
      orbitMeshes.push(mesh)
    }

    // Interactive Mouse Tracking
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize to -0.5 to 0.5
      targetMouseX = (event.clientX / window.innerWidth) - 0.5
      targetMouseY = (event.clientY / window.innerHeight) - 0.5
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Current interpolation variables
    const currentBgColor = new THREE.Color(initialConfig.bgColor)
    const currentCoreColor = new THREE.Color(initialConfig.coreColor)
    const currentLightColor = new THREE.Color(initialConfig.lightColor)
    const currentOrbitColor = new THREE.Color(initialConfig.orbitColor)
    let currentWireframe = initialConfig.wireframe
    let currentRotationSpeed = initialConfig.rotationSpeed

    // Clock
    const clock = new THREE.Clock()

    // Animation Loop
    let animationFrameId = 0
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const time = clock.getElapsedTime()

      const target = targetConfig.current

      // Interpolate parameters towards active theme target values (Lerp)
      const lerpSpeed = 0.05
      
      currentBgColor.lerp(new THREE.Color(target.bgColor), lerpSpeed)
      currentCoreColor.lerp(new THREE.Color(target.coreColor), lerpSpeed)
      currentLightColor.lerp(new THREE.Color(target.lightColor), lerpSpeed)
      currentOrbitColor.lerp(new THREE.Color(target.orbitColor), lerpSpeed)
      
      currentRotationSpeed += (target.rotationSpeed - currentRotationSpeed) * lerpSpeed

      // Apply dynamic parameters
      scene.background = currentBgColor
      pointLight.color = currentLightColor
      coreLight.color = currentCoreColor

      coreMaterial.color = currentCoreColor
      coreMaterial.emissive = currentCoreColor
      
      // Wireframe swap logic
      if (currentWireframe !== target.wireframe) {
        currentWireframe = target.wireframe
        coreMaterial.wireframe = currentWireframe
        coreMaterial.emissiveIntensity = currentWireframe ? 0.8 : 0.2
      }

      // Apply colors to orbiters
      orbitMeshes.forEach((mesh) => {
        ;(mesh.material as THREE.MeshStandardMaterial).color = currentOrbitColor
      })

      // Rotate objects
      coreMesh.rotation.y = time * 0.15 * currentRotationSpeed
      coreMesh.rotation.x = time * 0.1 * currentRotationSpeed

      orbitGroup.rotation.y = time * 0.25 * currentRotationSpeed
      // Subtle tilt animation
      orbitGroup.rotation.z = Math.sin(time * 0.5) * 0.15
      orbitGroup.rotation.x = Math.cos(time * 0.3) * 0.1

      // Mouse interactive tilt (inertia lag)
      mouseX += (targetMouseX - mouseX) * 0.08
      mouseY += (targetMouseY - mouseY) * 0.08
      
      camera.position.x = mouseX * 2.5
      camera.position.y = -mouseY * 2.5
      camera.lookAt(scene.position)

      renderer.render(scene, camera)
    }

    animate()

    // Resize Handler
    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      coreGeometry.dispose()
      coreMaterial.dispose()
      sphereGeometry.dispose()
      orbitMeshes.forEach((mesh) => {
        ;(mesh.material as THREE.MeshStandardMaterial).dispose()
      })
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, []) // Empty dependency array means this effect runs once on mount. TargetConfig ref manages updates.

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full -z-20 opacity-40 transition-opacity duration-1000 select-none pointer-events-none" 
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
