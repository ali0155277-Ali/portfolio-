import React, { useEffect, useRef } from 'react'
import { ACCENT_CYCLE_CONFIG } from '../hooks/useAccentCycle'

const PARTICLE_COLOR_CONFIG = {
    colors: ['#8B5CF6', '#6366F1', '#3B82F6', '#22D3EE', '#2DD4BF', '#D946EF'],
    intervalMs: 10000,
    transitionMs: 2000,
} as const

type RgbColor = [number, number, number]

interface ParticleColorState {
    from: RgbColor
    to: RgbColor
    colorIndex: number
    transitionStart: number
    nextChangeAt: number
}

interface Particle {
    x: number
    y: number
    velocityX: number
    velocityY: number
    radius: number
    phase: number
    pulseSpeed: number
}

const parseHexColor = (hex: string): RgbColor => {
    const value = Number.parseInt(hex.slice(1), 16)
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

const ParticlesBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const colorStateRef = useRef<ParticleColorState>({
        from: parseHexColor(PARTICLE_COLOR_CONFIG.colors[0]),
        to: parseHexColor(PARTICLE_COLOR_CONFIG.colors[0]),
        colorIndex: 0,
        transitionStart: 0,
        nextChangeAt: 0,
    })

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d', { alpha: true })
        if (!canvas || !context) return

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        let width = 0
        let height = 0
        let particles: Particle[] = []
        let animationFrame: number | undefined
        let staticColorTimer: number | undefined
        let previousFrame = 0
        const colorState = colorStateRef.current
        const initialColor = parseHexColor(PARTICLE_COLOR_CONFIG.colors[0])
        const startedAt = performance.now()
        colorState.from = initialColor
        colorState.to = initialColor
        colorState.colorIndex = 0
        colorState.transitionStart = startedAt
        colorState.nextChangeAt = startedAt + PARTICLE_COLOR_CONFIG.intervalMs

        const currentColor = (now: number): RgbColor => {
            while (now >= colorState.nextChangeAt) {
                const changeAt = colorState.nextChangeAt
                const progress = Math.min(
                    1,
                    Math.max(0, (changeAt - colorState.transitionStart) / PARTICLE_COLOR_CONFIG.transitionMs),
                )
                colorState.from = [
                    Math.round(colorState.from[0] + (colorState.to[0] - colorState.from[0]) * progress),
                    Math.round(colorState.from[1] + (colorState.to[1] - colorState.from[1]) * progress),
                    Math.round(colorState.from[2] + (colorState.to[2] - colorState.from[2]) * progress),
                ]
                colorState.colorIndex = (colorState.colorIndex + 1) % PARTICLE_COLOR_CONFIG.colors.length
                colorState.to = parseHexColor(PARTICLE_COLOR_CONFIG.colors[colorState.colorIndex])
                colorState.transitionStart = changeAt
                colorState.nextChangeAt = changeAt + PARTICLE_COLOR_CONFIG.intervalMs
            }

            const progress = reducedMotion.matches
                ? 1
                : Math.min(1, (now - colorState.transitionStart) / PARTICLE_COLOR_CONFIG.transitionMs)
            return [
                Math.round(colorState.from[0] + (colorState.to[0] - colorState.from[0]) * progress),
                Math.round(colorState.from[1] + (colorState.to[1] - colorState.from[1]) * progress),
                Math.round(colorState.from[2] + (colorState.to[2] - colorState.from[2]) * progress),
            ]
        }

        const createParticle = (): Particle => ({
            x: Math.random() * width,
            y: Math.random() * height,
            velocityX: (Math.random() - 0.5) * 9,
            velocityY: (Math.random() - 0.5) * 7,
            radius: 0.9 + Math.random() * 1.5,
            phase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.45 + Math.random() * 0.55,
        })

        const resize = () => {
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = Math.round(width * pixelRatio)
            canvas.height = Math.round(height * pixelRatio)
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

            const count = width < 640
                ? ACCENT_CYCLE_CONFIG.particleCounts.phone
                : width < 1024
                    ? ACCENT_CYCLE_CONFIG.particleCounts.tablet
                    : ACCENT_CYCLE_CONFIG.particleCounts.desktop
            particles = Array.from({ length: count }, createParticle)
            renderStatic()
        }

        const draw = (now: number, deltaSeconds: number, animate: boolean) => {
            context.clearRect(0, 0, width, height)

            const darkMode = document.documentElement.classList.contains('dark')
            const rgb = currentColor(now).map((channel) => (
                darkMode ? channel : Math.round(channel * 0.9)
            ))
            const accent = `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`
            const canConnect = width >= 640

            if (canConnect) {
                for (let first = 0; first < particles.length; first += 1) {
                    for (let second = first + 1; second < particles.length; second += 1) {
                        const a = particles[first]
                        const b = particles[second]
                        const dx = b.x - a.x
                        const dy = b.y - a.y
                        const distance = Math.hypot(dx, dy)
                        const maxDistance = ACCENT_CYCLE_CONFIG.connectionDistance

                        if (distance < maxDistance) {
                            context.beginPath()
                            context.moveTo(a.x, a.y)
                            context.lineTo(b.x, b.y)
                            context.strokeStyle = `rgba(${accent}, ${(1 - distance / maxDistance) * 0.12})`
                            context.lineWidth = 0.7
                            context.stroke()
                        }
                    }
                }
            }

            for (const particle of particles) {
                if (animate) {
                    particle.x += particle.velocityX * deltaSeconds
                    particle.y += particle.velocityY * deltaSeconds
                    particle.phase += particle.pulseSpeed * deltaSeconds

                    if (particle.x < -12) particle.x = width + 12
                    if (particle.x > width + 12) particle.x = -12
                    if (particle.y < -12) particle.y = height + 12
                    if (particle.y > height + 12) particle.y = -12
                }

                const pulse = animate ? 0.72 + (Math.sin(particle.phase) + 1) * 0.14 : 0.84
                const glowRadius = particle.radius * 5
                const glow = context.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    glowRadius,
                )
                glow.addColorStop(0, `rgba(${accent}, ${pulse * 0.3})`)
                glow.addColorStop(1, `rgba(${accent}, 0)`)
                context.fillStyle = glow
                context.beginPath()
                context.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2)
                context.fill()

                context.beginPath()
                context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
                context.fillStyle = `rgba(${accent}, ${pulse})`
                context.fill()
            }
        }

        function renderStatic() {
            draw(performance.now(), 0, false)
        }

        const scheduleStaticColorUpdate = () => {
            if (!reducedMotion.matches || document.hidden) return
            staticColorTimer = window.setTimeout(() => {
                renderStatic()
                scheduleStaticColorUpdate()
            }, Math.max(0, colorState.nextChangeAt - performance.now()))
        }

        const render = (now: number) => {
            animationFrame = undefined
            if (document.hidden || reducedMotion.matches) return

            const deltaSeconds = previousFrame === 0 ? 0 : Math.min((now - previousFrame) / 1000, 0.05)
            previousFrame = now
            draw(now, deltaSeconds, true)
            animationFrame = window.requestAnimationFrame(render)
        }

        const updateAnimation = () => {
            if (animationFrame !== undefined) {
                window.cancelAnimationFrame(animationFrame)
                animationFrame = undefined
            }
            if (staticColorTimer !== undefined) {
                window.clearTimeout(staticColorTimer)
                staticColorTimer = undefined
            }

            previousFrame = 0
            if (document.hidden) return
            if (reducedMotion.matches) {
                renderStatic()
                scheduleStaticColorUpdate()
                return
            }

            animationFrame = window.requestAnimationFrame(render)
        }

        resize()
        updateAnimation()
        window.addEventListener('resize', resize)
        document.addEventListener('visibilitychange', updateAnimation)
        reducedMotion.addEventListener('change', updateAnimation)

        return () => {
            if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
            if (staticColorTimer !== undefined) window.clearTimeout(staticColorTimer)
            window.removeEventListener('resize', resize)
            document.removeEventListener('visibilitychange', updateAnimation)
            reducedMotion.removeEventListener('change', updateAnimation)
        }
    }, [])

    return <canvas ref={canvasRef} className="background-particles" />
}

export default ParticlesBackground
