import { useEffect, useRef, useState } from 'react'

// Web Audio API ambient chime on enter
function playAwwwardSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(523.25, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.35)
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7)
    osc.start()
    osc.stop(ctx.currentTime + 0.7)
  } catch {
    // Ignore audio restriction
  }
}

export default function TheoremIntroGate({ forceOpen = false, onEnter, onClose }) {
  const [visible, setVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('theorem_intro_seen_v4')
    if (!hasSeen || forceOpen) {
      setVisible(true)
      document.body.style.overflow = 'hidden'
    }
  }, [forceOpen])

  // ESC key to skip cleanly
  useEffect(() => {
    if (!visible) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [visible])

  // Canvas 3D Gold Coin & Orbiting Asset Coins (Optimized Ultra-Lite for all browsers)
  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    let animId
    let time = 0

    const isMobile = window.innerWidth < 768
    // Cap DPR to 1.0 on mobile and 1.5 on desktop for high-speed 60fps across all devices
    const getDpr = (mob) => (mob ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5))

    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const mob = w < 768
      const dpr = getDpr(mob)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Floating Real Financial Coins with Responsive Orbit Radii & Learning Badges (Exactly 3 topic badges, rest icon-only)
    const scaleFactor = isMobile ? 0.52 : 1.0
    const ORBIT_ASSETS = [
      { symbol: 'Ξ', name: 'ETH', badge: 'Learn Crypto', color: '#627eea', radiusX: 310 * scaleFactor, radiusY: 98 * scaleFactor, speed: -0.62, offset: 0.7, size: isMobile ? 22 : 28 },
      { symbol: '£', name: 'GBP', badge: 'Learn Forex', color: '#c084fc', radiusX: 250 * scaleFactor, radiusY: 82 * scaleFactor, speed: 0.72, offset: 2.3, size: isMobile ? 20 : 26 },
      { symbol: '📈', name: 'EQ', badge: 'Learn Equity', color: '#10b981', radiusX: 345 * scaleFactor, radiusY: 110 * scaleFactor, speed: -0.5, offset: 3.8, size: isMobile ? 21 : 27 },
      { symbol: '€', name: 'EUR', badge: null, color: '#3b82f6', radiusX: 215 * scaleFactor, radiusY: 70 * scaleFactor, speed: 0.86, offset: 5.0, size: isMobile ? 18 : 24 },
      { symbol: '₿', name: 'BTC', badge: null, color: '#f7931a', radiusX: 275 * scaleFactor, radiusY: 88 * scaleFactor, speed: 0.58, offset: 6.1, size: isMobile ? 22 : 28 },
      { symbol: '₮', name: 'USDT', badge: null, color: '#26a17b', radiusX: 185 * scaleFactor, radiusY: 62 * scaleFactor, speed: -0.85, offset: 1.7, size: isMobile ? 17 : 22 },
    ]

    // Floating Golden Dust Sparkles (optimized: 16 on mobile, 32 on desktop, zero heavy shadowBlur)
    const particleCount = isMobile ? 16 : 32
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * window.innerWidth,
      y: (Math.random() - 0.5) * window.innerHeight,
      z: Math.random() * 450,
      size: Math.random() * 2 + 0.8,
      speed: Math.random() * 0.45 + 0.2,
      alpha: Math.random() * 0.7 + 0.3,
    }))

    const render = () => {
      time += 0.018
      const width = window.innerWidth
      const height = window.innerHeight
      const cx = width / 2
      const cy = height / 2
      const mob = width < 768

      // Ultra-lite clear: container CSS handles obsidian & gold radial backdrop
      ctx.clearRect(0, 0, width, height)

      // 1. Perspective Matrix Floor Grid (single batched stroke for high performance)
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(242, 177, 52, 0.05)'
      ctx.lineWidth = 1
      const gridSteps = mob ? 6 : 10
      for (let i = -gridSteps; i <= gridSteps; i++) {
        ctx.moveTo(cx + i * (mob ? 50 : 75), height)
        ctx.lineTo(cx + i * (mob ? 12 : 18), cy + 180)
      }
      ctx.stroke()

      // 2. Floating Golden Sparkle Particles (lite: pure alpha circles)
      particles.forEach((p) => {
        p.z -= p.speed * 2
        if (p.z < 0) p.z = 450
        const scale = 380 / (380 + p.z)
        const x2d = cx + p.x * scale
        const y2d = cy + p.y * scale
        ctx.beginPath()
        ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 220, 130, ${p.alpha * scale})`
        ctx.fill()
      })

      // 3. Draw Orbiting Coin Medallions with Badges
      const renderAsset = (asset, isFront) => {
        const angle = time * asset.speed + asset.offset
        const z = Math.sin(angle)
        if ((isFront && z < 0) || (!isFront && z >= 0)) return

        const x = cx + Math.cos(angle) * asset.radiusX
        const y = cy + Math.sin(angle) * asset.radiusY * 0.4
        const scale = 0.75 + (z + 1) * 0.25

        ctx.save()
        ctx.translate(x, y)
        ctx.scale(scale, scale)

        // Coin Outer Body & Metallic Shading
        const r = asset.size * 0.95
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)

        const grad = ctx.createLinearGradient(-r, -r, r, r)
        grad.addColorStop(0, '#22222c')
        grad.addColorStop(0.5, '#121218')
        grad.addColorStop(1, '#08080c')
        ctx.fillStyle = grad
        ctx.fill()

        ctx.strokeStyle = asset.color
        ctx.lineWidth = 2.2
        if (!mob) {
          ctx.shadowColor = asset.color
          ctx.shadowBlur = 8
        }
        ctx.stroke()
        ctx.shadowBlur = 0

        // Inner Milled Coin Ridge
        ctx.beginPath()
        ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2)
        ctx.strokeStyle = `${asset.color}66`
        ctx.lineWidth = 1
        ctx.stroke()

        // Coin Currency Symbol
        ctx.fillStyle = '#ffffff'
        ctx.font = `bold ${asset.size * 0.82}px "Plus Jakarta Sans", sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(asset.symbol, 0, 0.5)

        // Floating Topic Badge (e.g. "Learn Crypto", "Learn Forex", "Learn Equity")
        if (asset.badge) {
          const badgeText = asset.badge
          const fontSize = mob ? 9.5 : 11
          ctx.font = `bold ${fontSize}px "Plus Jakarta Sans", sans-serif`
          const tw = ctx.measureText(badgeText).width
          const pw = tw + (mob ? 12 : 16)
          const ph = mob ? 18 : 22
          const py = r + (mob ? 7 : 10)

          // Badge pill background
          ctx.fillStyle = 'rgba(14, 14, 20, 0.92)'
          ctx.beginPath()
          if (ctx.roundRect) {
            ctx.roundRect(-pw / 2, py, pw, ph, 999)
          } else {
            ctx.rect(-pw / 2, py, pw, ph)
          }
          ctx.fill()
          ctx.strokeStyle = `${asset.color}aa`
          ctx.lineWidth = 1
          ctx.stroke()

          // Badge text
          ctx.fillStyle = '#ffffff'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(badgeText, 0, py + ph / 2)
        }

        ctx.restore()
      }

      // Draw Coins behind the center coin (z < 0)
      ORBIT_ASSETS.forEach((a) => renderAsset(a, false))

      // 4. 3D Rotating Golden Coin Medallion in Center (Dual-Sided: Bitcoin ₿ on one side, Dollar $ on other)
      const coinRadius = mob ? 68 : 90
      const coinAngle = time * 1.4
      const cosAngle = Math.cos(coinAngle)
      const sinAngle = Math.sin(coinAngle)
      const coinThickness = (mob ? 11 : 16) * Math.abs(sinAngle)

      // Determine face side: Bitcoin ₿ on front (cosAngle >= 0), Dollar $ on back (cosAngle < 0)
      const isBitcoinFace = cosAngle >= 0
      const centerSymbol = isBitcoinFace ? '₿' : '$'

      ctx.save()
      ctx.translate(cx, cy)

      // 3D Coin Edge Extrusion
      const edgeSteps = mob ? 4 : 8
      for (let e = 0; e < edgeSteps; e++) {
        const edgeOffset = (e / edgeSteps) * coinThickness * (sinAngle > 0 ? 1 : -1)
        ctx.beginPath()
        ctx.ellipse(edgeOffset, 0, coinRadius * Math.abs(cosAngle), coinRadius, 0, 0, Math.PI * 2)
        ctx.strokeStyle = '#b8860b'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Main Coin Face Front
      if (!mob) {
        ctx.shadowColor = '#f2b134'
        ctx.shadowBlur = 18
      }
      ctx.beginPath()
      ctx.ellipse(0, 0, coinRadius * Math.abs(cosAngle), coinRadius, 0, 0, Math.PI * 2)

      // Dynamic Shifting Metallic Gold Gradient
      const goldGrad = ctx.createLinearGradient(-coinRadius * Math.abs(cosAngle), -coinRadius, coinRadius * Math.abs(cosAngle), coinRadius)
      goldGrad.addColorStop(0, '#ffe599')
      goldGrad.addColorStop(0.3, '#f2b134')
      goldGrad.addColorStop(0.6, '#d49015')
      goldGrad.addColorStop(0.85, '#ffe599')
      goldGrad.addColorStop(1, '#855a00')
      ctx.fillStyle = goldGrad
      ctx.fill()

      ctx.strokeStyle = '#fff0c2'
      ctx.lineWidth = mob ? 2 : 3
      ctx.stroke()
      ctx.shadowBlur = 0

      // Inner Coin Milled Ridge
      ctx.beginPath()
      ctx.ellipse(0, 0, (coinRadius - (mob ? 9 : 12)) * Math.abs(cosAngle), coinRadius - (mob ? 9 : 12), 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(133, 90, 0, 0.6)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Center Embossed Dual-Sided Symbol on Coin (₿ on one side, $ on other side, facing forwards)
      if (Math.abs(cosAngle) > 0.12) {
        ctx.save()
        // Scaling by Math.abs(cosAngle) ensures the icon always renders horizontally scaled without being backward/mirrored
        ctx.scale(Math.abs(cosAngle), 1)

        // Emboss Shadow
        ctx.fillStyle = 'rgba(80, 48, 0, 0.75)'
        ctx.font = `900 ${mob ? 50 : 68}px "Plus Jakarta Sans", sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(centerSymbol, 1.5, 3)

        // Emboss Highlight
        ctx.fillStyle = '#ffffff'
        ctx.fillText(centerSymbol, 0, 0)

        ctx.restore()
      }

      ctx.restore()

      // 5. Draw Assets in Front of the Center Coin (z >= 0)
      ORBIT_ASSETS.forEach((a) => renderAsset(a, true))

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [visible])

  // Handle Enter trigger
  const handleEnter = () => {
    playAwwwardSound()
    setIsExiting(true)
    sessionStorage.setItem('theorem_intro_seen_v4', 'true')
    if (onEnter) onEnter()
    setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
      if (onClose) onClose()
    }, 700)
  }

  const handleSkip = () => {
    setIsExiting(true)
    sessionStorage.setItem('theorem_intro_seen_v4', 'true')
    if (onEnter) onEnter()
    setTimeout(() => {
      setVisible(false)
      document.body.style.overflow = ''
      if (onClose) onClose()
    }, 400)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Theorem 3D Financial Intro"
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#050508] bg-[radial-gradient(ellipse_at_center,_rgba(242,177,52,0.18)_0%,_rgba(15,15,20,0.85)_40%,_#050508_100%)] text-white transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExiting ? 'scale-110 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* 3D Moving Art Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none cursor-default" />

      {/* Minimal Top Header: Just a subtle Skip in the corner */}
      <header className="relative z-10 flex items-center justify-between p-6 sm:p-10 pointer-events-none">
        <div className="flex items-center gap-2.5 opacity-85">
          <span className="size-2 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-white/80 uppercase font-bold">
            THEOREM FINANCIAL 3D
          </span>
        </div>
        <button
          type="button"
          onClick={handleSkip}
          className="pointer-events-auto rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md hover:border-signal hover:text-signal transition-all"
        >
          Skip [ESC]
        </button>
      </header>

      {/* Bottom Center: Minimalist Luxury ENTER THEOREM Action */}
      <footer className="relative z-10 flex flex-col items-center justify-center pb-12 sm:pb-16 pointer-events-none">
        <button
          type="button"
          onClick={handleEnter}
          className="pointer-events-auto shimmer-button group relative flex items-center gap-3 rounded-full border border-signal/60 bg-gradient-to-r from-[#f2b134] via-[#ffe39c] to-[#f2b134] px-9 py-4 text-sm sm:text-base font-extrabold text-[#082326] shadow-[0_0_40px_rgba(242,177,52,0.6)] hover:shadow-[0_0_60px_rgba(242,177,52,0.9)] transition-all transform hover:scale-105 active:scale-95"
        >
          <span className="tracking-wider">ENTER THEOREM</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold text-lg">→</span>
        </button>
        <span className="mt-3 text-[0.7rem] font-mono tracking-widest text-white/55 uppercase font-medium">
          INSTITUTIONAL TRADING ACADEMY
        </span>
      </footer>
    </div>
  )
}

