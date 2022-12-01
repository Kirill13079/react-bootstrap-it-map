import React from 'react'
import { usePagination, DOTS } from '../../utils/usePagination'
import Pagination from 'react-bootstrap/Pagination'

const MyPagination = (props) => {
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
    <Pagination>
      <Pagination.Prev onClick={onPrevious} disabled={currentPage === 1} />
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <Pagination.Ellipsis key={pageNumber} />
        }

        return (
          <Pagination.Item
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </Pagination.Item>
        )
      })}
      <Pagination.Next onClick={onNext} disabled={currentPage === lastPage} />
    </Pagination>
  )
}

export default MyPagination
