import React, { useContext, useState } from 'react'

export const ThemeContext = React.createContext({
    darkMode: undefined,
    setDarkMode: async (darkMode) => null,

    menuOpen: undefined,
    setMenuOpen: async (menuOpen) => null,
  })

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)

    return <ThemeContext.Provider value={{ darkMode, setDarkMode, menuOpen, setMenuOpen }}>{children}</ThemeContext.Provider>
  }