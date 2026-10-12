import React, { useLayoutEffect, useState } from 'react'
import { ThemeContext } from './themeContextValue'

const getInitialTheme = () => {
    try {
        return window.localStorage.getItem('theme') !== 'light'
    } catch (error) {
        console.warn('Unable to read the saved theme preference.', error)
        return true
    }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(getInitialTheme)

    useLayoutEffect(() => {
        const root = document.documentElement
        root.classList.toggle('dark', isDark)
        root.style.colorScheme = isDark ? 'dark' : 'light'
        document.body.style.backgroundColor = 'var(--color-bg)'

        try {
            window.localStorage.setItem('theme', isDark ? 'dark' : 'light')
        } catch (error) {
            console.warn('Unable to save the theme preference.', error)
        }
    }, [isDark])

    const toggleTheme = () => {
        setIsDark(prev => !prev)
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}