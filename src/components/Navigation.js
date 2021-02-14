import React from "react"
import PropTypes from "prop-types"
import { LocalizedLink } from "."


const Navigation = ({ data, navClass }) => (
  <>
    {data.map((navItem, i) => {
      if (navItem.url.match(/^\s?http(s?)/gi)) {
        return <a className={navClass} href={navItem.url} key={i} target="_blank"
                  rel="noopener noreferrer">{navItem.label}</a>
      } else {
        return <LocalizedLink className={navClass} to={navItem.url} key={i}>{navItem.label}</LocalizedLink>
      }
    })}
  </>
)

Navigation.defaultProps = {
  navClass: `site-nav-item`
}

Navigation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  navClass: PropTypes.string
}

export default Navigation
