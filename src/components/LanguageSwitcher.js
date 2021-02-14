import React from "react"
import { navigate } from "gatsby"
import { useLocale } from "../hooks/locale"
import Link from "gatsby-link"

const LanguageSwitcher = () => {
  // Grab the locale (passed through context) from the Locale Provider
  // through useLocale() hook
  const { locale } = useLocale()

  const handleClickLanguage = (e, lang) => {
    e.preventDefault()
    if (locale === lang) return

    const path = window.location.pathname
    return lang === `en`
      ? path === `/${locale}`
        ? navigate(`/`)
        : navigate(`${path.substring(`/${locale}`.length)}`)
      : path === `/`
        ? navigate(path.replace(`/`, `/${lang}`))
        : navigate(path.replace(`/`, `/${lang}/`))
  }

  return (
    <>
      <Link to="/" onClick={(e) => handleClickLanguage(e, "en")}
            className={locale === "en" ? "is-active site-lang" : "site-lang"}>
        EN
      </Link>
      <Link to="/" onClick={(e) => handleClickLanguage(e, "tr")}
            className={locale === "tr" ? "is-active site-lang" : "site-lang"}>
        TR
      </Link>
    </>
  )
}

export default LanguageSwitcher
