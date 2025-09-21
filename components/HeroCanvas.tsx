'use client'

import React, { useEffect, useRef } from 'react'

type Props = {
  className?: string
}

const HeroCanvas: React.FC<Props> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctxRaw = canvas.getContext('2d', { alpha: true })
    if (!ctxRaw) return
    const ctx: CanvasRenderingContext2D = ctxRaw

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    let width = 0
    let height = 0
    const start = performance.now()
    let running = true
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function resize() {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      width = Math.floor(rect.width * dpr)
      height = Math.floor(rect.height * dpr)
      canvas.width = width
      canvas.height = height
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      }
    }

    function rand(seed: number) {
      return Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1
    }

    function drawWaveform(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, elapsed: number, seed: number) {
      const bars = Math.max(3, Math.floor(w / 4)) // Ensure minimum bars
      const barWidth = Math.max(1, (w - bars) / bars) // Ensure minimum bar width
      
      for (let i = 0; i < bars; i++) {
        const amplitude = (Math.sin(elapsed * 2 + i * 0.3 + seed) + 1) * 0.5
        const barHeight = amplitude * h * 0.7
        const barX = x + i * (barWidth + 1)
        const barY = y + (h - barHeight) / 2
        
        ctx.fillStyle = `rgba(0, 255, 180, ${0.6 + amplitude * 0.3})`
        ctx.fillRect(barX, barY, barWidth, barHeight)
      }
    }

    function draw(t: number) {
      if (!running) return
      const elapsed = (t - start) / 1000
      const cssW = width / dpr
      const cssH = height / dpr

      // === RESPONSIVE SCALING SYSTEM ===
      // Base dimensions: 600x400 - adjust these to change scaling baseline
      const scaleFactor = Math.min(cssW / 600, cssH / 400, 1)
      
      // BREAKPOINT DEFINITIONS - adjust these values to change responsive behavior
      const isSmall = cssW < 400 || cssH < 300   // Medium mobile screens
      const isTiny = cssW < 300 || cssH < 200    // Small mobile screens

      // === BACKGROUND GRADIENT ===
      const bgGradient = ctx.createRadialGradient(cssW * 0.5, cssH * 0.3, 0, cssW * 0.5, cssH * 0.7, cssW * 0.6)
      bgGradient.addColorStop(0, '#000000')
      bgGradient.addColorStop(0.5, '#111111')
      bgGradient.addColorStop(1, '#000000')
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, cssW, cssH)

      // === FLOATING PARTICLES SETTINGS ===
      if (!prefersReduced && !isTiny) {
        ctx.fillStyle = 'rgba(100, 200, 255, 0.3)'
        // PARTICLE COUNT - adjust these numbers to change particle density
        const particleCount = isSmall ? 4 : 8  // 4 on small screens, 8 on larger
        
        for (let i = 0; i < particleCount; i++) {
          const x = (cssW * 0.2) + (Math.sin(elapsed * 0.5 + i) * cssW * 0.6)
          const y = (cssH * 0.2) + (Math.cos(elapsed * 0.3 + i * 0.7) * cssH * 0.6)
          
          // PARTICLE SIZE - base size 1-3px, scales with screen size
          const size = (1 + Math.sin(elapsed + i) * 1) * scaleFactor
          ctx.beginPath()
          ctx.arc(x, y, Math.max(0.5, size), 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // === TIMELINE CONTAINER SETTINGS ===
      // CONTAINER SIZE - adjust these percentages to change timeline size
      const containerW = cssW * (isTiny ? 0.95 : 0.85)  // 85% normal, 95% on tiny screens
      const containerH = cssH * (isTiny ? 0.7 : 0.5)    // 50% normal, 70% on tiny screens
      const containerX = (cssW - containerW) / 2
      const containerY = (cssH - containerH) / 2

      // CONTAINER STYLING
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'  // Container background opacity
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      // SHADOW BLUR - adjust these values for container shadow size
      ctx.shadowBlur = Math.max(5, 20 * scaleFactor)  // Min 5px, scales to 20px
      // CONTAINER BORDER RADIUS - adjust for rounded corners
      const containerRadius = Math.max(4, 12 * scaleFactor)  // Min 4px, scales to 12px
      roundRect(ctx, containerX, containerY, containerW, containerH, containerRadius, true, false)
      ctx.shadowBlur = 0
      
      // CONTAINER BORDER
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'  // Border color/opacity
      ctx.lineWidth = Math.max(0.5, 1 * scaleFactor)  // Border thickness
      roundRect(ctx, containerX, containerY, containerW, containerH, containerRadius, false, true)

      // === TRACK SYSTEM SETTINGS ===
      // TRACK COUNT - how many video/audio tracks to show
      const tracks = isTiny ? 3 : 5  // 3 tracks on tiny screens, 5 on larger
      
      // TRACK SPACING - adjust container padding and track height
      const padding = Math.max(10, 30 * scaleFactor)  // Container inner padding
      const trackH = Math.max(20, (containerH - padding * 2) / tracks)  // Individual track height
      const trackStartY = containerY + padding

      // Calculate clipStartX and availableWidth for playhead positioning (use first track's values)
      const clipStartX = containerX + Math.max(30, 60 * scaleFactor)
      const availableWidth = containerW - Math.max(60, 120 * scaleFactor)

      for (let i = 0; i < tracks; i++) {
        const y = trackStartY + i * trackH - 12
        
        // === TRACK BACKGROUND STYLING ===
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'  // Track background opacity
        const trackRadius = Math.max(2, 6 * scaleFactor)  // Track corner radius
        const trackPadding = Math.max(8, 20 * scaleFactor)  // Left/right track padding
        roundRect(ctx, containerX + trackPadding, y, containerW - trackPadding * 2, trackH - Math.max(4, 8 * scaleFactor), trackRadius, true, false)
        
        // === TRACK LABELS (V1, V2, A1, etc) ===
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'  // Label color/opacity
        // TRACK LABEL FONT SIZE - adjust these values to change label size
        const fontSize = Math.max(10, Math.min(14, 12 * scaleFactor))  // Min 10px, max 14px, scales from 12px
        ctx.font = `${fontSize}px system-ui, -apple-system, sans-serif`
        
        // Set text alignment for proper centering
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'  // This centers the text vertically
        
        const labelText = i < 3 ? `V${i + 1}` : `A${i - 2}`  // V1,V2,V3 then A1,A2
        // Calculate proper vertical center position
        const labelY = y + (trackH - Math.max(4, 8 * scaleFactor)) / 2
        ctx.fillText(labelText, containerX + trackPadding + Math.max(4, 8 * scaleFactor), labelY)
        
        // Reset text baseline to default for other text
        ctx.textBaseline = 'alphabetic'

        // === CLIP GENERATION SETTINGS ===
        // CLIP COUNT - how many clips per track
        const clipCount = isTiny ? 2 : (isSmall ? 3 : 3 + Math.floor(rand(i) * 2))  // 2-5 clips depending on screen size
        const clipStartX = containerX + Math.max(30, 60 * scaleFactor)  // Where clips start (after labels)
        const availableWidth = containerW - Math.max(60, 120 * scaleFactor)  // Total width for clips
        
        for (let c = 0; c < clipCount; c++) {
          // CLIP DIMENSIONS - adjust base width and scaling
          const baseClipW = Math.max(40, 60 + rand(i * 10 + c) * 80)  // Base clip width 60-140px
          const clipW = Math.min(baseClipW * scaleFactor, availableWidth / clipCount - 10)  // Scaled width
          const clipSpacing = Math.max(8, 15 * scaleFactor)  // Space between clips
          
          // CLIP ANIMATION - subtle horizontal movement (disable with prefersReduced)
          const clipX = clipStartX + c * (clipW + clipSpacing) + (prefersReduced ? 0 : Math.sin(elapsed * 0.4 + i + c) * Math.max(1, 3 * scaleFactor))
          const clipY = y + Math.max(2, 4 * scaleFactor)
          const clipH = trackH - Math.max(8, 16 * scaleFactor)
          
          // Skip clips that are too small or overflow
          if (clipX + clipW > containerX + containerW - trackPadding) continue
          if (clipW < 10) continue

          if (i < 3) {
            // === VIDEO CLIP STYLING ===
            const gradient = ctx.createLinearGradient(clipX, clipY, clipX, clipY + clipH)
            gradient.addColorStop(0, 'rgba(100, 150, 255, 0.8)')  // Top color
            gradient.addColorStop(1, 'rgba(50, 100, 200, 0.6)')   // Bottom color
            ctx.fillStyle = gradient
            const clipRadius = Math.max(2, 4 * scaleFactor)  // Clip corner radius
            roundRect(ctx, clipX, clipY, clipW, clipH, clipRadius, true, false)
            
            // VIDEO CLIP BORDER
            ctx.strokeStyle = 'rgba(150, 200, 255, 0.4)'  // Border color
            ctx.lineWidth = Math.max(0.5, 1 * scaleFactor)  // Border thickness
            roundRect(ctx, clipX, clipY, clipW, clipH, clipRadius, false, true)
            
            // === VIDEO THUMBNAIL PREVIEW ===
            if (clipW > 20 && clipH > 12) {
              ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'  // Thumbnail background
              const thumbRadius = Math.max(1, 2 * scaleFactor)
              const thumbPadding = Math.max(2, 4 * scaleFactor)
              roundRect(ctx, clipX + thumbPadding, clipY + thumbPadding, clipW - thumbPadding * 2, clipH - thumbPadding * 2, thumbRadius, true, false)
              
              // === ANIMATED VIDEO CONTENT DOTS ===
              if (clipW > 30 && clipH > 20) {
                const centerX = clipX + clipW / 2
                const centerY = clipY + clipH / 2
                const time = elapsed + i + c * 0.5
                
                // DOT SIZES - adjust these for animation dot sizes
                const dotSize = Math.max(1, 2 * scaleFactor)  // Primary dot size
                const secondDotSize = Math.max(0.8, 1.5 * scaleFactor)  // Secondary dot size
                
                // First moving dot
                ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.sin(time * 2) * 0.1})`
                ctx.beginPath()
                ctx.arc(centerX + Math.sin(time) * Math.max(4, 8 * scaleFactor), centerY + Math.cos(time * 1.2) * Math.max(2, 4 * scaleFactor), dotSize, 0, Math.PI * 2)
                ctx.fill()
                
                // Second moving dot
                ctx.fillStyle = `rgba(100, 150, 255, ${0.4 + Math.cos(time * 1.5) * 0.1})`
                ctx.beginPath()
                ctx.arc(centerX - Math.sin(time * 0.8) * Math.max(3, 6 * scaleFactor), centerY - Math.cos(time) * Math.max(1.5, 3 * scaleFactor), secondDotSize, 0, Math.PI * 2)
                ctx.fill()
              }
            }
          } else {
            // === AUDIO CLIP STYLING ===
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'  // Audio clip background
            const clipRadius = Math.max(2, 4 * scaleFactor)
            roundRect(ctx, clipX, clipY, clipW, clipH, clipRadius, true, false)
            
            // AUDIO CLIP BORDER
            ctx.strokeStyle = 'rgba(0, 255, 180, 0.3)'  // Audio border color (green)
            ctx.lineWidth = Math.max(0.5, 1 * scaleFactor)
            roundRect(ctx, clipX, clipY, clipW, clipH, clipRadius, false, true)
            
            // === ANIMATED WAVEFORM ===
            if (clipW > 15 && clipH > 10) {
              const waveformPadding = Math.max(3, 6 * scaleFactor)  // Waveform inner padding
              drawWaveform(ctx, clipX + waveformPadding, clipY + waveformPadding, clipW - waveformPadding * 2, clipH - waveformPadding * 2, elapsed, i * 10 + c)
            }
          }
        }
      }

      // Enhanced playhead (responsive)
      const playheadX = clipStartX + ((elapsed * (Math.max(30, 60 * scaleFactor))) % (availableWidth - Math.max(60, 120 * scaleFactor)))
      
      // Playhead glow effect
      const glowRadius = Math.max(20, 50 * scaleFactor)
      const playheadGlow = ctx.createRadialGradient(playheadX, containerY + containerH/2, 0, playheadX, containerY + containerH/2, glowRadius)
      playheadGlow.addColorStop(0, 'rgba(255, 100, 150, 0.3)')
      playheadGlow.addColorStop(1, 'rgba(255, 100, 150, 0)')
      ctx.fillStyle = playheadGlow
      ctx.fillRect(playheadX - glowRadius, containerY, glowRadius * 2, containerH)
      
      // Main playhead line
      ctx.strokeStyle = '#ff6496'
      ctx.lineWidth = Math.max(1.5, 3 * scaleFactor)
      ctx.shadowColor = 'rgba(255, 100, 150, 0.6)'
      ctx.shadowBlur = Math.max(3, 8 * scaleFactor)
      ctx.beginPath()
      ctx.moveTo(playheadX, containerY + Math.max(8, 20 * scaleFactor))
      ctx.lineTo(playheadX, containerY + containerH - Math.max(8, 20 * scaleFactor))
      ctx.stroke()
      ctx.shadowBlur = 0

      // Playhead handle
      ctx.fillStyle = '#ff6496'
      ctx.shadowColor = 'rgba(255, 100, 150, 0.8)'
      ctx.shadowBlur = Math.max(2, 6 * scaleFactor)
      ctx.beginPath()
      ctx.arc(playheadX, containerY + Math.max(8, 20 * scaleFactor), Math.max(2, 5 * scaleFactor), 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // === TIME DISPLAY SETTINGS (User-friendly, always readable) ===
      const minutes = Math.floor((elapsed * 2) % 60)
      const seconds = Math.floor((elapsed * 120) % 60)
      const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      
      // TIME FONT SIZE - Keep readable at all screen sizes
      // Minimum 12px for readability, scales up to 16px on larger screens
      const timeFontSize = Math.max(12, Math.min(16, 14 * scaleFactor))
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)' // Slightly brighter for better contrast
      ctx.font = `bold ${timeFontSize}px system-ui, -apple-system, sans-serif`
      
      // TIME POSITION - Always visible with adequate spacing
      const timeY = containerY + containerH + Math.max(18, 28 * scaleFactor)
      if (timeY < cssH - 15) { // Only show if there's adequate room
        ctx.fillText(timeStr, containerX + Math.max(10, 22 * scaleFactor), timeY)
      }

      // === AMBIENT SCAN LINE EFFECT ===
      if (!prefersReduced && !isTiny) {
        // SCAN LINE OPACITY - adjust these values to change scan line visibility
        ctx.globalAlpha = isSmall ? 0.04 : 0.08  // Lower opacity on small screens
        const scanY = (elapsed * 120) % cssH  // Scan line position (120 = speed)
        
        // Scan line gradient effect
        const scanGradient = ctx.createLinearGradient(0, scanY - 1, 0, scanY + 1)
        scanGradient.addColorStop(0, 'rgba(100, 200, 255, 0)')    // Transparent edges
        scanGradient.addColorStop(0.5, 'rgba(100, 200, 255, 1)')  // Solid center
        scanGradient.addColorStop(1, 'rgba(100, 200, 255, 0)')    // Transparent edges
        ctx.fillStyle = scanGradient
        ctx.fillRect(0, scanY - 1, cssW, 2)  // 2px tall scan line
        ctx.globalAlpha = 1  // Reset opacity
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    function roundRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      fill: boolean,
      stroke: boolean
    ) {
      // Ensure positive dimensions
      if (w <= 0 || h <= 0) return
      
      const r2 = Math.max(0, Math.min(r, w / 2, h / 2))
      ctx.beginPath()
      ctx.moveTo(x + r2, y)
      ctx.arcTo(x + w, y, x + w, y + h, r2)
      ctx.arcTo(x + w, y + h, x, y + h, r2)
      ctx.arcTo(x, y + h, x, y, r2)
      ctx.arcTo(x, y, x + w, y, r2)
      if (fill) ctx.fill()
      if (stroke) ctx.stroke()
    }

    const onResize = () => resize()
    resize()
    
    if (!prefersReduced) {
      rafRef.current = requestAnimationFrame(draw)
    } else {
      draw(performance.now())
    }
    
    window.addEventListener('resize', onResize)

    return () => {
      running = false
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true" 
    />
  )
}

export default HeroCanvas