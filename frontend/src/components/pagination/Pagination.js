import React from 'react'
import { usePagination, DOTS } from '../../utils/usePagination'
import { Pagination as PaginationBootstrap } from 'react-bootstrap'

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
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

  let lastPage = paginationRange[paginationRange.length - 1]
  return (
    <PaginationBootstrap>
      <PaginationBootstrap.Prev
        onClick={onPrevious}
        disabled={currentPage === 1}
      />
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <PaginationBootstrap.Ellipsis key={pageNumber} />
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
    </PaginationBootstrap>
  )
}

export default Pagination
