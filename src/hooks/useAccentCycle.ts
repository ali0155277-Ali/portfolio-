import { useEffect } from 'react'

export const ACCENT_CYCLE_CONFIG = {
    cycleSeconds: 60,
    transitionSeconds: 2.4,
    particleCounts: {
        phone: 25,
        tablet: 42,
        desktop: 70,
    },
    connectionDistance: 118,
    palettes: [
        { name: 'Violet', accent: '#8b5cf6', accent2: '#c084fc', rgb: '139, 92, 246', glow: 'rgba(139, 92, 246, 0.34)' },
        { name: 'Emerald', accent: '#047857', accent2: '#059669', rgb: '4, 120, 87', glow: 'rgba(4, 120, 87, 0.32)' },
        { name: 'Cyan', accent: '#0e7490', accent2: '#0891b2', rgb: '14, 116, 144', glow: 'rgba(14, 116, 144, 0.32)' },
        { name: 'Rose', accent: '#be123c', accent2: '#e11d48', rgb: '190, 18, 60', glow: 'rgba(190, 18, 60, 0.32)' },
        { name: 'Amber', accent: '#b45309', accent2: '#d97706', rgb: '180, 83, 9', glow: 'rgba(180, 83, 9, 0.32)' },
    ],
} as const

type AccentPalette = (typeof ACCENT_CYCLE_CONFIG.palettes)[number]

const applyPalette = (
    root: HTMLElement,
    palette: AccentPalette,
    transitionMs: number,
) => {
    root.style.setProperty('--accent', palette.accent)
    root.style.setProperty('--accent-rgb', palette.rgb)
    root.style.setProperty('--accent-2', palette.accent2)
    root.style.setProperty('--glow', palette.glow)

    window.dispatchEvent(new CustomEvent('accentchange', {
        detail: {
            rgb: palette.rgb,
            transitionMs,
        },
    }))
}

export const useAccentCycle = () => {
    useEffect(() => {
        const root = document.documentElement
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        const cycleMs = ACCENT_CYCLE_CONFIG.cycleSeconds * 1000
        const transitionMs = ACCENT_CYCLE_CONFIG.transitionSeconds * 1000
        let activeIndex = 0
        let remainingMs = cycleMs
        let deadline = 0
        let timer: number | undefined

        const updateTransition = () => {
            root.style.setProperty(
                '--accent-transition-duration',
                reducedMotion.matches ? '0ms' : `${transitionMs}ms`,
            )
        }

        const advance = () => {
            activeIndex = (activeIndex + 1) % ACCENT_CYCLE_CONFIG.palettes.length
            applyPalette(root, ACCENT_CYCLE_CONFIG.palettes[activeIndex], reducedMotion.matches ? 0 : transitionMs)
            remainingMs = cycleMs
            schedule()
        }

        const schedule = () => {
            if (document.hidden) return
            deadline = Date.now() + remainingMs
            timer = window.setTimeout(advance, remainingMs)
        }

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (timer !== undefined) window.clearTimeout(timer)
                timer = undefined
                remainingMs = Math.max(0, deadline - Date.now())
                return
            }

            schedule()
        }

        const handleMotionChange = () => {
            updateTransition()
        }

        updateTransition()
        applyPalette(root, ACCENT_CYCLE_CONFIG.palettes[0], reducedMotion.matches ? 0 : transitionMs)
        schedule()

        document.addEventListener('visibilitychange', handleVisibilityChange)
        reducedMotion.addEventListener('change', handleMotionChange)

        return () => {
            if (timer !== undefined) window.clearTimeout(timer)
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            reducedMotion.removeEventListener('change', handleMotionChange)
        }
    }, [])
}
