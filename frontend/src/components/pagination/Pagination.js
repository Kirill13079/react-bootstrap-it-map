import React from 'react'
import { usePagination, DOTS } from '../../utils/usePagination'

import './Pagination.css'

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize = 5,
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let ct = 1
  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <div className="pagination">
      <div className="pagination__wrapper">
        <div className="scroll">
          {paginationRange.map((pageNumber) => {
            if (pageNumber === DOTS) {
              ct++
              return <p key={pageNumber + '_' + ct}> </p>
            }

            return (
              <a
                className={
                  pageNumber === currentPage
                    ? 'pagination__item--active'
                    : 'pagination__item'
                }
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </a>
            )
          })}
        </div>
      </div>
    </div>
    /*   <PaginationBootstrap>
      <PaginationBootstrap.Prev
        onClick={onPrevious}
        disabled={currentPage === 1}
      />
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          ct++
          return <PaginationBootstrap.Ellipsis key={pageNumber + '_' + ct} />
        }

        return (
          <PaginationBootstrap.Item
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationBootstrap.Item>
        )
      })}
      <PaginationBootstrap.Next
        onClick={onNext}
        disabled={currentPage === lastPage}
      />
    </PaginationBootstrap> */
  )
}

export default Pagination
