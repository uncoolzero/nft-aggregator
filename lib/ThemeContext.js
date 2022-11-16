import React, { useContext, useState } from 'react'

export const ThemeContext = React.createContext({
    darkMode: undefined,
    setDarkMode: async (darkMode) => null,

    menuOpen: undefined,
    setMenuOpen: async (menuOpen) => null,

    language: undefined,
    setLanguage: async (language) => null,
  })

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {

    const [darkMode, setDarkMode] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)
    const [language, setLanguage] = useState("en")

    return <ThemeContext.Provider value={{ darkMode, setDarkMode, menuOpen, setMenuOpen, language, setLanguage }}>{children}</ThemeContext.Provider>
  }