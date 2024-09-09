import React from 'react'
import SidebarTutor from './SidebarTutor'

const TutorialPage = () => {
  return (
    <div className="d-flex">
      <SidebarTutor />
      <div className="flex-grow-1 p-3">
        {/* Main Content Area */}
        <h1>Python Exercises</h1>
        {/* Your main content goes here */}
      </div>
    </div>
  )
}

export default TutorialPage
