import React from "react"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"
import { Link } from "gatsby"
import { generatePageRange } from "../utils/generatePageRange"

const PaginationLinks = ({ currentPage, numberOfPages }) => {
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === numberOfPages
  const prevPage =
    currentPage - 1 === 1 ? "/" : "/page/" + (currentPage - 1).toString()
  const nextPage = "/page/" + (currentPage + 1).toString()

  const range = generatePageRange(currentPage, numberOfPages)
  return (
    <div className="pagination">
      {!isFirstPage && (
        <Link to={prevPage}>
          <div className="pagination-box">
            <MdNavigateBefore />
          </div>
        </Link>
      )}
      {range.map((i: any) => {
        return Number(i) ? (
          <Link to={`${i === 1 ? "/" : "/page/" + i}`}>
            <div
              className={`pagination-box ${i === currentPage ? "active" : ""}`}
              key={i}
            >
              {i}
            </div>
          </Link>
        ) : (
          <div
            className={`pagination-box ${i === currentPage ? "active" : ""}`}
            key={i}
          >
            {i}
          </div>
        )
      })}

      {!isLastPage && (
        <Link to={nextPage}>
          <div className="pagination-box">
            <MdNavigateNext />
          </div>
        </Link>
      )}
    </div>
  )
}

export default PaginationLinks
