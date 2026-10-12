import React from 'react'
import ParticlesBackground from './ParticlesBackground'

const BackgroundScene: React.FC = () => (
    <div className="background-scene" aria-hidden="true">
        <div className="background-scene__tint" />
        <div className="background-scene__orb background-scene__orb--violet" />
        <div className="background-scene__orb background-scene__orb--cyan" />
        <ParticlesBackground />
    </div>
)

export default BackgroundScene
