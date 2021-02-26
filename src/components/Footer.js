import { LocalizedLink, Navigation, useNavigation, useTranslations } from "."
import React from "react"

const Footer = () => {

  const { siteTitle } = useTranslations()
  const navigations = useNavigation()

  return (
    <footer className="site-foot">
      <div className="site-foot-nav container">
        <div className="site-foot-nav-left">
          <LocalizedLink to="/">{siteTitle}</LocalizedLink> © 2021
        </div>
        <div className="site-foot-nav-right">
          <Navigation data={navigations} navClass="site-nav-item" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
