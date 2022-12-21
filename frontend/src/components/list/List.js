import './List.css'

const Keys = (props) => {
  const keyButtonStyles = {
    checked: {
      background: '#229fd9',
    },
    unchecked: {
      background: 'red',
    },
  }

  return props.keys.map((item, i) => (
    <div key={i} className="key__item">
      <div className="key__item__img">
        <img
          src={`${process.env.PUBLIC_URL}/images/pin_${item.key}.png`}
          width="48"
          height="48"
          alt={item.key}
        />
      </div>
      <div className="key__item--content">
        <div className="key__item__content--title">
          <span>{item.key}</span>
        </div>
        <div className="key__item__content--info">
          <span>
            {props.vacancies
              .get(props.keys[i].key)
              .map((v, j) =>
                props.vacancies.get(props.keys[i].key).length === j + 1
                  ? `${v.name} `
                  : `${v.name}, `
              )}
          </span>
        </div>
        <div className="key__item__content--count">
          <div className="count__wrapper">
            <div className="count__wrapper--content">
              <svg viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z" />
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
              </svg>
              <span>{props.vacancies.get(props.keys[i].key).length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="key__buttons">
        <div
          className="key__buttons--button"
          onClick={(e) => props.onCheckedKey(item.key)}
          style={
            item.isChecked
              ? keyButtonStyles['checked']
              : keyButtonStyles['unchecked']
          }
        >
          <svg viewBox="0 0 24 24">
            <path
              d={
                item.isChecked
                  ? 'M21.014,10.24c-1.29-2.14-4.17-5.74-9.02-5.74s-7.73,3.6-9.01,5.74a3.4,3.4,0,0,0,0,3.51c1.28,2.15,4.17,5.75,9.01,5.75s7.73-3.6,9.02-5.75A3.427,3.427,0,0,0,21.5,12,3.49,3.49,0,0,0,21.014,10.24Zm-9.02,6.26a4.5,4.5,0,1,1,4.5-4.5A4.507,4.507,0,0,1,11.994,16.5Zm2.49-4.64a.66.66,0,0,1,.01.14,2.5,2.5,0,1,1-.9-1.92,1.016,1.016,0,0,0-.6.92,1,1,0,0,0,1,1A.906.906,0,0,0,14.484,11.86Z'
                  : 'M21.016,10.241a14.386,14.386,0,0,0-2.646-3.2L20.7,4.707a1,1,0,1,0-1.414-1.414l-16,16A1,1,0,1,0,4.7,20.707l2.535-2.535A9.139,9.139,0,0,0,12,19.5c4.83,0,7.72-3.6,9.02-5.74A3.421,3.421,0,0,0,21.016,10.241ZM12,16.5a4.457,4.457,0,0,1-2.385-.7l1.473-1.474A2.49,2.49,0,0,0,14.5,12a.57.57,0,0,0-.01-.13A.994.994,0,0,1,14,12a.972.972,0,0,1-.461-.127L15.8,9.612A4.485,4.485,0,0,1,12,16.5Zm-7.68-.88a14.3,14.3,0,0,1-1.33-1.86,3.444,3.444,0,0,1-.01-3.52C4.276,8.1,7.176,4.5,12,4.5a9.307,9.307,0,0,1,2.75.41.527.527,0,0,1,.35.36.486.486,0,0,1-.14.47l-1.89,1.89A4.679,4.679,0,0,0,12,7.5,4.507,4.507,0,0,0,7.5,12a4.316,4.316,0,0,0,.13,1.08l-2.57,2.57a.491.491,0,0,1-.36.15h-.02A.5.5,0,0,1,4.316,15.621Z'
              }
            ></path>
          </svg>
        </div>
      </div>
    </div>
  ))
}

const List = (props) => {
  const listStyles = {
    mobile: {
      width: '100%',
      display:
        props.size['isMobile'].value && props.size['isHideMap'].value
          ? 'none'
          : 'block',
    },
    desktop: {
      width: '50vh',
    },
  }

  const keys = props.data['keys'].list
  const filtered = props.data['vacancies'].filtered
  const groupBy = props.data['vacancies'].groupBy

  if (keys) {
    return (
      <div
        className="list"
        style={
          props.size['isMobile'].value || props.size['isHideMap'].value
            ? listStyles['mobile']
            : listStyles['desktop']
        }
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
              vacancies={groupBy}
              keys={keys}
              onCheckedKey={props.onCheckedKey}
            ></Keys>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default List
