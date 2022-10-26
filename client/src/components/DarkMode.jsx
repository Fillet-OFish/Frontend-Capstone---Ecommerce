import React, { useContext, useState } from 'react'


const DarkModeContext = React.createContext()

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function DarkModeProvider({children}) {
  const [darkMode, setDarkMode] = useState(false);

  darkMode ?
    (document.body.style.backgroundColor = '#180A0A', document.body.style.color = 'white')
    : (document.body.style.backgroundColor = '', document.body.style.color = '');

  function toggleDarkMode() {
    setDarkMode(darkMode => !darkMode)
  }



  return (
    <DarkModeContext.Provider value={darkMode}>
        {children}
        <button className={`dark-mode-button ${darkMode ? 'dark-mode-button-dark' : null}`} onClick={toggleDarkMode}>Dark Theme</button>
    </DarkModeContext.Provider>
  )
}