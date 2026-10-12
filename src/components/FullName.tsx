import React from 'react'

interface FullNameProps {
    size: 'hero' | 'navbar' | 'footer'
    className?: string
}

const FullName: React.FC<FullNameProps> = ({ size, className = '' }) => (
    <span
        aria-label="Ali Gabriel Ali"
        role="text"
        className={`full-name full-name--${size} ${className}`.trim()}
    >
        <span className="full-name__first">Ali</span>
        <span className="full-name__second">Gabriel</span>
        <span className="full-name__third">Ali</span>
    </span>
)

export default FullName
