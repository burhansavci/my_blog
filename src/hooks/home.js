import React, { createContext, useState, useContext, useRef } from "react"
import PropTypes from "prop-types"

const HomeContext = createContext({})

const HomeProvider = ({ children }) => {
  const [isHome, setIsHome] = useState(false)

  const setHomePage = useRef((value) => {
    setTimeout(() => {
      setIsHome(value)
    }, 0)
  }).current

  return (
    <HomeContext.Provider value={{ isHome, setHomePage }}>
      {children}
    </HomeContext.Provider>
  )
}

HomeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

const useHome = () => {
  const context = useContext(HomeContext)
  if (!context) {
    throw new Error("useHome must be used within an HomeProvider")
  }
  return context
}

export { HomeProvider, useHome }