import React from 'react'

import './TechIcon.scss'

export const TechIcon = ({ icon, title }) => {
  const iconId = `tech-icon-${title}`
  return (
    <div className="tech__item">
      <div id={iconId}>
        {icon}
      </div>
      <p>{title}</p>
    </div>
  )
}

TechIcon.displayName = 'Tech Icon'
