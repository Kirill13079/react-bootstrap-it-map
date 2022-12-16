import './List.css'

const Keys = (props) => {
  console.log(props.keys)
  return props.keys.map((item, i) => (
    <div key={i} className="listItem">
      <div className="listItem_img">
        <img
          src={`${process.env.PUBLIC_URL}/images/pin_${item.key}.png`}
          width="48"
          height="48"
          alt={item.key}
        ></img>
      </div>
      <div className="list_content">
        <div class="list_content_meta">
          <span>{item.key ? item.key : 'null'}</span>
        </div>
        <div class="list_content_title">
          <span>
            {props.vacancies.get(props.keys[i].key).map((v, j) => (
              <text key={item.key + '_' + i}>
                {v.name}
                {props.vacancies.get(props.keys[i].key).length === j + 1
                  ? ' '
                  : ', '}
              </text>
            ))}
          </span>
        </div>
      </div>
      <div class="drugStore__prices">
        <span class="drugStore__price">
          <div className="count">
            <div className="t">
              <svg viewBox="0 0 11 8">
                <g fill="none" fill-rule="evenodd">
                  <path
                    fill="#1E201D"
                    fill-rule="nonzero"
                    d="M3.588.12a.38.38 0 0 1 .555 0c.15.155.15.413 0 .568L1.332 3.596h9.274c.217 0 .394.177.394.4a.402.402 0 0 1-.394.408H1.332l2.81 2.902c.15.16.15.419 0 .574a.38.38 0 0 1-.554 0L.112 4.284a.415.415 0 0 1 0-.568L3.588.12z"
                  ></path>
                </g>
              </svg>
              <span>{props.vacancies.get(props.keys[i].key).length}</span>
            </div>
          </div>
        </span>
      </div>
      <div className="drugStore__buttonList">
        <div className="drugStore__button drugStore__button--booking">
          <svg viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#1E201D"
                fill-rule="nonzero"
                d="M7.88,2.77a2.388,2.388,0,0,1,.37-.15V19.11L6.12,20.2a2.42,2.42,0,0,1-2.4-.09A2.538,2.538,0,0,1,2.5,17.92V7.74a3.574,3.574,0,0,1,1.93-3.2Zm1.87-.15V19.11l4.13,2.12a2.388,2.388,0,0,0,.37.15V4.89L10.12,2.77A2.388,2.388,0,0,0,9.75,2.62ZM20.28,3.89a2.445,2.445,0,0,0-2.4-.09L15.75,4.89V21.38a2.388,2.388,0,0,0,.37-.15l3.45-1.77a3.574,3.574,0,0,0,1.93-3.2V6.08A2.538,2.538,0,0,0,20.28,3.89Z"
              ></path>
            </g>
          </svg>
        </div>
        <div className="drugStore__button drugStore__button--booking">
          <svg viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#1E201D"
                fill-rule="nonzero"
                d="M7.88,2.77a2.388,2.388,0,0,1,.37-.15V19.11L6.12,20.2a2.42,2.42,0,0,1-2.4-.09A2.538,2.538,0,0,1,2.5,17.92V7.74a3.574,3.574,0,0,1,1.93-3.2Zm1.87-.15V19.11l4.13,2.12a2.388,2.388,0,0,0,.37.15V4.89L10.12,2.77A2.388,2.388,0,0,0,9.75,2.62ZM20.28,3.89a2.445,2.445,0,0,0-2.4-.09L15.75,4.89V21.38a2.388,2.388,0,0,0,.37-.15l3.45-1.77a3.574,3.574,0,0,0,1.93-3.2V6.08A2.538,2.538,0,0,0,20.28,3.89Z"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
  ))
}

const List = (props) => {
  const keys = props.data['keys'].list
  const filtered = props.data['vacancies'].filtered
  const groupBy = props.data['vacancies'].groupBy

  if (keys) {
    return (
      <div className="listWrapper">
        <div className="list">
          <div className="listHeader">
            <div className="listContent">
              <div>
                <span>Vacancies: </span>
                <span>{filtered ? filtered.length : 0}</span>
              </div>
            </div>
          </div>
          <div className="listBody">
            <Keys vacancies={groupBy} keys={keys}></Keys>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default List
