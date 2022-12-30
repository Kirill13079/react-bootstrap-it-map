import ListButtons from '../../button/ListButtons'
import Button from '../../button/Button'
import ListSpans from '../../Span/ListSpans/ListSpans'

import './Vacancies.css'

const Vacancies = (props) => {
  const { groupBy, selectedKey, currentPage, pageSize } = props

  if (groupBy && selectedKey) {
    return groupBy
      .get(selectedKey)
      .slice(
        (currentPage - 1) * pageSize,
        (currentPage - 1) * pageSize + pageSize
      )
      .map((item, index) => (
        <div key={index} className="vacancy__item--wrapper">
          <div className="vacancy__item">
            <div className="vacancy__item--content">
              <span className="vacancy__item__title">{item.name}</span>
              <div className="vacancy__item__company">
                <span>{item.nameCompany}</span>
              </div>
              <div className="vacancy__item__route">
                <svg viewBox="0 0 24 24">
                  <path d="M12 4.292c-2.882 0-5.111 2.15-5.111 4.702 0 2.285 1.347 4.938 2.801 7.107a32.517 32.517 0 002.306 3.027c.103-.121.218-.26.344-.412a33.92 33.92 0 001.969-2.654c1.456-2.186 2.802-4.839 2.802-7.068 0-2.552-2.23-4.702-5.111-4.702zm0 15.962l.545.507a.744.744 0 01-1.086.005l.54-.512zM5.4 8.994C5.4 5.516 8.402 2.8 12 2.8s6.6 2.716 6.6 6.194c0 2.71-1.582 5.688-3.053 7.896a35.396 35.396 0 01-2.93 3.792l-.052.058-.014.015-.004.004-.002.002-.545-.507-.541.512-.002-.002-.004-.004-.014-.015a11.604 11.604 0 01-.246-.271 34.038 34.038 0 01-2.739-3.54C6.98 14.733 5.4 11.757 5.4 8.993z"></path>
                  <path d="M9.879 7.678a3 3 0 114.242 4.243A3 3 0 019.88 7.678zM12 8.247a1.553 1.553 0 100 3.106 1.553 1.553 0 000-3.106z"></path>
                </svg>
                <span>
                  {item.city} {item.lat} {item.lng}
                </span>
              </div>
              <ListSpans
                stroke={item.skill}
                style={{ padding: '0px', border: 'none' }}
              ></ListSpans>
            </div>
          </div>
          <ListButtons>
            <Button
              onClickHandler={() => props.onSelectedVacancy(item)}
              bgColor="#fff"
              fill="#229fd9"
              icon="M14,10a2,2,0,1,1-2-2A2.006,2.006,0,0,1,14,10Zm5.5,0c0,6.08-4.67,9.89-6.67,11.24a1.407,1.407,0,0,1-.83.26,1.459,1.459,0,0,1-.84-.26C9.16,19.89,4.5,16.09,4.5,10A7.33,7.33,0,0,1,12,2.5,7.336,7.336,0,0,1,19.5,10ZM16,10a4,4,0,1,0-4,4A4,4,0,0,0,16,10Z"
            ></Button>
          </ListButtons>
        </div>
      ))
  }

  return null
}

export default Vacancies
