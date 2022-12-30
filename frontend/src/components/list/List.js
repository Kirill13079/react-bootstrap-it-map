import React from 'react'
import Keys from './keys/Keys'
import Vacancies from './vacancies/Vacancies'
import Pagination from '../pagination/Pagination'

import './List.css'

let PageSize = 5

const PaginationList = ({ list, currentPage, setCurrentPage, selectedKey }) => {
  if (list && selectedKey) {
    return (
      <Pagination
        currentPage={currentPage}
        totalCount={list.get(selectedKey).length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    )
  }

  return null
}

const List = (props) => {
  const { data, isHideMap, size } = props

  const [currentPage, setCurrentPage] = React.useState(1)

  const keys = data['keys'].list
  const filtered = data['vacancies'].filtered
  const groupBy = data['vacancies'].groupBy

  return (
    <div
      className="list"
      style={{ display: isHideMap && size['mobile'].value ? 'none' : 'block' }}
    >
      <div className="list__content">
        <div className="list__content--header">
          <div className="header__content">
            <span>Вакансии: </span>
            <span>{filtered ? filtered.length : 0}</span>
          </div>
        </div>
        <div className="list__content--body">
          <Keys
            keys={keys}
            vacancies={groupBy}
            selectedKey={props.selectedKey}
            onCheckedKey={props.onCheckedKey}
            onSelectedKey={props.onSelectedKey}
          ></Keys>
          <Vacancies
            groupBy={groupBy}
            selectedKey={props.selectedKey}
            currentPage={currentPage}
            pageSize={PageSize}
            onSelectedVacancy={props.onSelectedVacancy}
          ></Vacancies>
        </div>
        <div className="list__pagination">
          <PaginationList
            list={groupBy}
            selectedKey={props.selectedKey}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          ></PaginationList>
        </div>
      </div>
    </div>
  )
}

export default List
