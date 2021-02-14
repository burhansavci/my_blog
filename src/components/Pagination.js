import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { useTranslations } from "./index"

const Pagination = ({ pageContext }) => {
  const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext
  const { prev, next, page, of } = useTranslations()

  return (
    <nav className="pagination" role="navigation">
      <div>
        {previousPagePath && (

          <Link to={previousPagePath} rel="prev">
            {prev}
          </Link>

        )}
      </div>
      {numberOfPages > 1 && <div className="pagination-location">{page} {humanPageNumber} {of} {numberOfPages}</div>}
      <div>
        {nextPagePath && (

          <Link to={nextPagePath} rel="next">
            {next}
          </Link>
        )}
      </div>
    </nav>
  )
}

Pagination.propTypes = {
  pageContext: PropTypes.object.isRequired
}

export default Pagination
