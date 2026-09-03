import { useEffect, useRef } from "react"
import { FadeIn } from "@/layout/fadein"
import {
  WebGLRenderer , Scene, PerspectiveCamera, IcosahedronGeometry,
  EdgesGeometry, MeshBasicMaterial, LineBasicMaterial, DoubleSide, AdditiveBlending, 
  Mesh, LineSegments, Group, Clock
} from "three"

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion) {
      canvas.style.display = "none"
      return
    }

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)

    const scene = new Scene()
    const camera = new PerspectiveCamera(48, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    // Centerpiece geometries & materials
    const icoGeo = new IcosahedronGeometry(2.1, 0)
    const icoEdgesGeo = new EdgesGeometry(icoGeo)
    const icoOuterEdgesGeo = new EdgesGeometry(
      new IcosahedronGeometry(2.45, 0)
    )

    const icoInnerMat = new MeshBasicMaterial({
      color: 0x11120e,
      transparent: true,
      opacity: 0.06,
      side: DoubleSide,
      depthWrite: false,
    })

    const icoEdgeMat = new LineBasicMaterial({
      color: 0x5972ff,
      transparent: true,
      opacity: 0.9,
      blending: AdditiveBlending,
    })

    const icoOuterEdgesMat = new LineBasicMaterial({
      color: 0x364596,
      transparent: true,
      opacity: 0.45,
      blending: AdditiveBlending,
    })

    const icoInner = new Mesh(icoGeo, icoInnerMat)
    const icoEdges = new LineSegments(icoEdgesGeo, icoEdgeMat)
    const icoOuterEdges = new LineSegments(
      icoOuterEdgesGeo,
      icoOuterEdgesMat
    )

    const centerpiece = new Group()
    centerpiece.add(icoInner, icoEdges, icoOuterEdges)
    scene.add(centerpiece)

    const mouse = { x: 0, y: 0 }
    const targetCam = { x: 0, y: 0 }
    const currentCam = { x: 0, y: 0 }
    const targetRot = { x: 0, y: 0 }
    const currentRot = { x: 0, y: 0 }

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX / window.innerWidth - 0.5
      mouse.y = event.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })

    const scrollProxy = { value: 0 }

    const handleScroll = () => {
      const y = window.scrollY
      const heroHeight = canvas.parentElement?.offsetHeight || window.innerHeight
      scrollProxy.value = Math.min(1, Math.max(0, y / (heroHeight * 1.2)))
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    const handleResize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      renderer.setSize(parent.clientWidth, parent.clientHeight, false)
      camera.aspect = parent.clientWidth / parent.clientHeight
      camera.updateProjectionMatrix()
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    const clock = new Clock()
    let animationFrameId: number

    function animate() {
      // FIX 2: Always request the next frame so the loop survives scrolling back into view
      animationFrameId = requestAnimationFrame(animate)

      if (document.hidden || scrollProxy.value > 0.6) {
        return
      }

      const dt = clock.getDelta()

      targetCam.x = mouse.x
      targetCam.y = -mouse.y
      currentCam.x += (targetCam.x - currentCam.x) * 0.05
      currentCam.y += (targetCam.y - currentCam.y) * 0.05
      camera.position.x = currentCam.x
      camera.position.y = currentCam.y
      camera.lookAt(0, 0, 0)

      targetRot.x = mouse.y * 0.3
      targetRot.y = mouse.x * 0.5
      currentRot.x += (targetRot.x - currentRot.x) * 0.1
      currentRot.y += (targetRot.y - currentRot.y) * 0.1

      centerpiece.rotation.y += dt * 0.25
      centerpiece.rotation.x =
        currentRot.x * 0.6 + Math.sin(clock.getElapsedTime() * 0.4) * 0.04
      centerpiece.rotation.z =
        currentRot.y * 0.05 + Math.sin(clock.getElapsedTime() * 0.3) * 0.02

      const s = scrollProxy.value
      icoEdgeMat.opacity = 0.9 - s * 0.55
      icoOuterEdgesMat.opacity = 0.45 - s * 0.4
      icoInnerMat.opacity = 0.06 - s * 0.06
      camera.position.z = 9 + s * 2.5

      if (s > 0.3) canvas?.classList.add("opacity-20")
      else canvas?.classList.remove("opacity-20")

      renderer.render(scene, camera)
    }

    animate()

    // FIX 3: Complete GPU resource disposal on cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)

      icoGeo.dispose()
      icoEdgesGeo.dispose()
      icoOuterEdgesGeo.dispose()
      icoInnerMat.dispose()
      icoEdgeMat.dispose()
      icoOuterEdgesMat.dispose()
      
      renderer.dispose()
    }
  }, [])

  return (
    <div
      id="home"
      className="relative [@media(max-height:500px)]:h-fit h-screen w-full overflow-hidden font-lexend bg-linear-to-b from-[#0d0d18] to-background"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff09_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#b0ccff22_1px,transparent_1px),linear-gradient(to_bottom,#b0ccff22_1px,transparent_1px)] bg-size-[7rem_7rem] pointer-events-none" />


      {/* 3D Canvas Container */}
      <div className="absolute lg:-right-1/4 inset-0 flex items-center justify-center pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          id="hero-3d"
          className="w-full h-full transition-opacity duration-500 ease-out"
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 size-125 bg-bright-primary/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* HERO CONTENT OVERLAY */}
      <main className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-between py-16 md:py-20 pointer-events-none">
        {/* Top Status Pill */}
        <div className="pointer-events-auto self-start mt-4">
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-bright-primary bg-bright-primary/10 border border-bright-primary/30 px-3.5 py-1.5 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-bright-primary animate-pulse" />
            <span>Building Systems & Motion</span>
          </div>
        </div>

        {/* Center Content Stack */}
        <div className="space-y-6 max-w-xl pointer-events-auto my-auto relative">
          <FadeIn y={-30} delay={0.1} className="space-y-1">
            <h1 className="relative -left-1.25 bg-clip-text text-transparent bg-linear-to-r to-bright-primary from-[#526cff] font-lexend text-7xl sm:text-9xl font-bold tracking-tight leading-none">
              Ocean
            </h1>
          </FadeIn>

          <FadeIn y={-30} delay={0.2}>
            <p className="text-base font-poppins sm:text-lg text-gray-300/95 leading-relaxed max-w-md">
              Solo Backend & Frontend Developer · Animation Enthusiast.
              <span className="block text-gray-500 text-sm mt-1 font-mono">
                Break, build, and repeat.
              </span>
            </p>
          </FadeIn>

          {/* Animation Preview Card */}
          <FadeIn
            y={-30}
            delay={0.35}
            className="mt-6 w-full max-w-sm rounded-xl border border-gray-800/80 bg-gray-950/60 p-2 backdrop-blur-md space-y-2"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900 border border-gray-800">
              <video
                src="/assets/running.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>

        {/* Bottom Metadata */}
        <div className="flex items-end justify-between font-lexend text-sm text-gray-500 uppercase tracking-widest pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="uppercase text-center text-gray-600">
              not for hire
            </span>
          </div>

          <div className="uppercase hidden md:block text-center text-gray-600">
            Developer & Animator
          </div>

          <div className="flex flex-col items-center gap-2 text-bright-primary">
            <span>Scroll</span>
            <span className="w-px h-6 bg-linear-to-b from-bright-primary to-transparent" />
          </div>
        </div>
      </main>
    </div>
  )
}