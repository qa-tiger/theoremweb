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

  // Canvas 3D Chrome Coin & Orbiting Asset Coins (Optimized Ultra-Lite for all browsers)
  useEffect(() => {
    if (!visible) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    let animId
    let time = 0

    // Theorem chrome mark drawn on the center coin (replaces the dollar sign)
    const logoImg = new Image()
    logoImg.src = '/theorem-icon.png'

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

    // Floating Real Financial Coins with Harmonious Orbital Cadence (eliminates full 5-coin cluster clumps)
    const scaleFactor = isMobile ? 0.6 : 1.0
    const ORBIT_ASSETS = [
      // Outer ring: Crypto, Indices, Equity (spaced 120° apart in pure harmony)
      { symbol: '₿', sub: 'BTC', name: 'BTC', color: '#f7931a', radiusX: 320 * scaleFactor, radiusY: 102 * scaleFactor, speed: 0.28, offset: 0, size: isMobile ? 28 : 40, label: 'Learn Crypto' },
      { symbol: 'SPX', sub: 'SP500', name: 'SPX', color: '#c084fc', radiusX: 320 * scaleFactor, radiusY: 102 * scaleFactor, speed: 0.28, offset: (2 * Math.PI) / 3, size: isMobile ? 28 : 40, label: 'Learn Indices' },
      { symbol: 'AED', sub: 'EQUITY', name: 'AED', color: '#10b981', radiusX: 320 * scaleFactor, radiusY: 102 * scaleFactor, speed: 0.28, offset: (4 * Math.PI) / 3, size: isMobile ? 27 : 38, label: 'Learn Equity' },

      // Inner ring: Commodities & Forex (spaced 180° apart with gentle phase variation)
      { symbol: 'XAU', sub: 'Au • GOLD', name: 'XAU', color: '#f59e0b', radiusX: 245 * scaleFactor, radiusY: 78 * scaleFactor, speed: 0.35, offset: Math.PI / 4, size: isMobile ? 28 : 40, label: 'Learn Commodities' },
      { symbol: '€', sub: 'FOREX', name: 'EUR', color: '#60a5fa', radiusX: 245 * scaleFactor, radiusY: 78 * scaleFactor, speed: 0.35, offset: (5 * Math.PI) / 4, size: isMobile ? 27 : 38, label: 'Learn Forex' },
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

      // Ultra-lite clear: container CSS handles obsidian & silver radial backdrop
      ctx.clearRect(0, 0, width, height)

      // 1. Perspective Matrix Floor Grid (single batched stroke for high performance)
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(199, 205, 214, 0.06)'
      ctx.lineWidth = 1
      const gridSteps = mob ? 6 : 10
      for (let i = -gridSteps; i <= gridSteps; i++) {
        ctx.moveTo(cx + i * (mob ? 50 : 75), height)
        ctx.lineTo(cx + i * (mob ? 12 : 18), cy + 180)
      }
      ctx.stroke()

      // 2. Floating Silver Sparkle Particles (lite: pure alpha circles)
      particles.forEach((p) => {
        p.z -= p.speed * 2
        if (p.z < 0) p.z = 450
        const scale = 380 / (380 + p.z)
        const x2d = cx + p.x * scale
        const y2d = cy + p.y * scale
        ctx.beginPath()
        ctx.arc(x2d, y2d, p.size * scale, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 224, 230, ${p.alpha * scale})`
        ctx.fill()
      })

      // 3. Draw Orbiting Coin Medallions
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
        ctx.lineWidth = 2.4
        ctx.stroke()

        // Inner Milled Coin Ridge
        ctx.beginPath()
        ctx.arc(0, 0, r * 0.82, 0, Math.PI * 2)
        ctx.strokeStyle = `${asset.color}77`
        ctx.lineWidth = 1.2
        ctx.stroke()

        // Coin Currency / Asset Symbol (Adaptive sizing for single-char & multi-letter tickers)
        const symLen = asset.symbol.length
        const fontScale = symLen <= 1 ? 0.82 : symLen === 2 ? 0.68 : 0.54
        const symbolFontSize = Math.round(asset.size * fontScale)
        ctx.fillStyle = '#ffffff'
        ctx.font = `bold ${symbolFontSize}px "Plus Jakarta Sans", sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const yOffset = asset.sub ? -Math.round(asset.size * 0.14) : 0.5
        ctx.fillText(asset.symbol, 0, yOffset)

        // Subtitle badge on coin face (e.g. "Au • GOLD", "SP500", "BTC")
        if (asset.sub) {
          ctx.fillStyle = asset.color
          const subFontSize = Math.max(7, Math.round(asset.size * 0.22))
          ctx.font = `800 ${subFontSize}px "Plus Jakarta Sans", sans-serif`
          ctx.fillText(asset.sub, 0, Math.round(asset.size * 0.46))
        }

        // Label text below the coin (e.g. "Learn Commodities", "Learn Indices")
        if (asset.label) {
          const labelFontSize = mob ? 8 : 10
          ctx.fillStyle = asset.color
          ctx.font = `bold ${labelFontSize}px "Plus Jakarta Sans", sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.fillText(asset.label, 0, r + 7)
        }

        ctx.restore()
      }

      // Draw Coins behind the center dollar coin (z < 0)
      ORBIT_ASSETS.forEach((a) => renderAsset(a, false))

      // 4. 3D Rotating Chrome Coin Medallion in Center (steady rotation, zero mouse reaction)
      const coinRadius = mob ? 68 : 96
      const coinAngle = time * 1.4
      const cosAngle = Math.cos(coinAngle)
      const sinAngle = Math.sin(coinAngle)
      const coinThickness = (mob ? 8 : 12) * Math.abs(sinAngle)

      ctx.save()
      ctx.translate(cx, cy)

      // 3D Coin Edge Extrusion (zero shadowBlur inside loop for 60fps smoothness)
      const edgeSteps = mob ? 4 : 8
      for (let e = 0; e < edgeSteps; e++) {
        const edgeOffset = (e / edgeSteps) * coinThickness * (sinAngle > 0 ? 1 : -1)
        ctx.beginPath()
        ctx.ellipse(edgeOffset, 0, coinRadius * Math.abs(cosAngle), coinRadius, 0, 0, Math.PI * 2)
        ctx.strokeStyle = '#5c6470'
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Main Coin Face Front
      ctx.beginPath()
      ctx.ellipse(0, 0, coinRadius * Math.abs(cosAngle), coinRadius, 0, 0, Math.PI * 2)

      // Dynamic Shifting Metallic Chrome Gradient
      const goldGrad = ctx.createLinearGradient(-coinRadius * cosAngle, -coinRadius, coinRadius * cosAngle, coinRadius)
      goldGrad.addColorStop(0, '#ffffff')
      goldGrad.addColorStop(0.3, '#d8dde3')
      goldGrad.addColorStop(0.6, '#6b7280')
      goldGrad.addColorStop(0.85, '#ffffff')
      goldGrad.addColorStop(1, '#363b43')
      ctx.fillStyle = goldGrad
      ctx.fill()

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = mob ? 2 : 3
      ctx.stroke()

      // Inner Coin Milled Ridge
      ctx.beginPath()
      ctx.ellipse(0, 0, (coinRadius - (mob ? 9 : 12)) * Math.abs(cosAngle), coinRadius - (mob ? 9 : 12), 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(90, 97, 107, 0.6)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Center Embossed Theorem Mark on Coin
      if (cosAngle > 0.15 && logoImg.complete && logoImg.naturalWidth) {
        ctx.save()
        ctx.scale(cosAngle, 1)

        const aspect = logoImg.naturalWidth / logoImg.naturalHeight
        const drawH = coinRadius * (mob ? 1.15 : 1.25)
        const drawW = drawH * aspect

        ctx.shadowColor = 'rgba(20, 22, 26, 0.55)'
        ctx.shadowBlur = 5
        ctx.shadowOffsetX = 1.5
        ctx.shadowOffsetY = 2.5
        ctx.drawImage(logoImg, -drawW / 2, -drawH / 2, drawW, drawH)

        ctx.restore()
      } else if (cosAngle <= -0.15) {
        // Back face: "THEOREM" milled into the chrome, finished in the coin's own metal.
        // Every measurement below derives from coinRadius (not a mobile/desktop flag), so
        // the wordmark rescales smoothly with the coin at any viewport width.
        ctx.save()
        ctx.scale(Math.abs(cosAngle), 1)

        const fontSize = Math.round(coinRadius * 0.24)
        const letterSpacingPx = fontSize * 0.1
        ctx.font = `800 ${fontSize}px "Sofia Sans Extra Condensed", "Arial Narrow", sans-serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        try { ctx.letterSpacing = `${letterSpacingPx}px` } catch { /* unsupported in this browser */ }

        // Measure the actual rendered width (incl. letter-spacing) so the rule below
        // always lines up with the glyphs instead of a guessed multiplier.
        const textWidth = ctx.measureText('THEOREM').width

        // Soft recessed shadow pooling beneath the lettering
        ctx.shadowColor = 'rgba(8, 9, 11, 0.55)'
        ctx.shadowBlur = fontSize * 0.12
        ctx.shadowOffsetX = fontSize * 0.03
        ctx.shadowOffsetY = fontSize * 0.08
        ctx.fillStyle = '#6b7280' // base tone for the shadow pass (gradient drawn on top next)
        ctx.fillText('THEOREM', 0, 0)

        // Polished chrome gradient fill, matching the coin's own metallic sweep
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        const textGrad = ctx.createLinearGradient(0, -fontSize * 0.65, 0, fontSize * 0.65)
        textGrad.addColorStop(0, '#f7f9fb')
        textGrad.addColorStop(0.42, '#c3c9d1')
        textGrad.addColorStop(0.55, '#6b7280')
        textGrad.addColorStop(1, '#2f3237')
        ctx.fillStyle = textGrad
        ctx.fillText('THEOREM', 0, 0)

        // Crisp top-edge highlight where the light catches the raised letterforms
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fillText('THEOREM', -fontSize * 0.02, -fontSize * 0.05)

        // Thin signature rule beneath the wordmark, sized to the measured text width
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)'
        ctx.lineWidth = Math.max(0.5, fontSize * 0.03)
        ctx.beginPath()
        ctx.moveTo(-textWidth / 2, fontSize * 0.68)
        ctx.lineTo(textWidth / 2, fontSize * 0.68)
        ctx.stroke()

        try { ctx.letterSpacing = '0px' } catch { /* unsupported in this browser */ }
        ctx.restore()
      }

      ctx.restore()

      // 5. Draw Assets in Front of the Coin (z >= 0)
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
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-[#050508] text-white transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExiting ? 'scale-110 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
      }`}
    >
      {/* 3D Moving Art Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none cursor-default" />

      {/* Minimal Top Header: Just a subtle Skip in the corner */}
      <header className="relative z-10 flex items-center justify-between p-6 sm:p-10 pointer-events-none">
        <div className="flex items-center gap-2.5 opacity-85">
          <span className="size-2 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-white uppercase font-bold">
            Theorems we decode, markets you conquer
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
          className={`enter-glow-button pointer-events-auto shimmer-button group relative flex items-center gap-3 rounded-full border border-signal/60 bg-gradient-to-r from-[#aab0bb] via-[#ffffff] to-[#aab0bb] px-12 py-5 text-base sm:text-lg font-extrabold text-[#101114] transition-all transform hover:scale-105 active:scale-95 ${
            isExiting ? 'speaking-active' : ''
          }`}
        >
          <span className="tracking-[0.2em]">ENTER</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1 font-bold text-xl">→</span>
        </button>
        <span className="mt-3 text-[0.7rem] font-mono tracking-widest text-white/55 uppercase font-medium">
          INSTITUTIONAL TRADING ACADEMY
        </span>
      </footer>
    </div>
  )
}

