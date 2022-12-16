import React from 'react'
import Map from './components/map/Map'
import Search from './components/search/Search'
import Title from './components/title/Title'
import List from './components/list/List'

import groupBy from './utils/groupBy'

import '../src/assets/css/styles.css'

const AppTest = () => {
  const [data, setData] = React.useState({
    vacancies: {
      list: null,
      filtered: null,
      groupBy: null,
    },
    keys: {
      list: null,
    },
  })

  React.useEffect(() => {
    const getData = () => {
      fetch('http://localhost:4001/')
        .then((res) => res.json())
        .then((result) => {
          setData({
            vacancies: {
              list: result,
              filtered: result,
              groupBy: result ? groupBy(result, (item) => item.keySkill) : null,
            },
            keys: {
              list: result
                ? Array.from(
                    groupBy(result, (item) => item.keySkill).keys()
                  ).map((key) => ({
                    key: key,
                    isChecked: true,
                    isActive: false,
                  }))
                : null,
            },
          })
        })
    }

    getData()
  }, [])

  return (
    <div className="mainContent">
      <Search value=""></Search>
      <div className="panelWrapper">
        <div className="panelInfo">
          <a href="/" className="panelInfo_LinkBack">
            <span class="panelInfo_LinkBack--icon">
              <svg viewBox="0 0 11 8">
                <g fill="none" fill-rule="evenodd">
                  <path
                    fill="#1E201D"
                    fill-rule="nonzero"
                    d="M3.588.12a.38.38 0 0 1 .555 0c.15.155.15.413 0 .568L1.332 3.596h9.274c.217 0 .394.177.394.4a.402.402 0 0 1-.394.408H1.332l2.81 2.902c.15.16.15.419 0 .574a.38.38 0 0 1-.554 0L.112 4.284a.415.415 0 0 1 0-.568L3.588.12z"
                  ></path>
                </g>
              </svg>
            </span>
            <span class="panelInfo_LinkBack--text">Back</span>
          </a>
          <Title
            title="Search vacancies"
            description="Test description"
          ></Title>
        </div>
      </div>
      <div className="mapWrapper">
        <Map vacancies={data['vacancies'].filtered} />
      </div>
      <List data={data}></List>
      {/*       <div className="skill_list">
        <div className="panelWrapper panelWrapper--Manipulators offers_mode">
          <div className="Manipulators">
            <div className="Manipulators__listWrapper">
              <div className="Manipulators__list">
                <div className="Manipulators__item">
                  <form className="Manipulators__sorting">
                    <label
                      for="distanceRadio"
                      className="Manipulators__sortingRadio Manipulators__sortingRadio--distance"
                    >
                      <span class="Manipulators__sortingRadio--title">
                        По расстоянию
                      </span>
                    </label>
                  </form>
                </div>
                <div className="Manipulators__item">
                  <form className="Manipulators__sorting">
                    <label
                      for="distanceRadio"
                      className="Manipulators__sortingRadio Manipulators__sortingRadio--distance"
                    >
                      <span class="Manipulators__sortingRadio--title">
                        По расстоянию
                      </span>
                    </label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panelWrapper panelWrapper--priceWarning">
          <div className="priceWarning">
            <span href="#" class="priceWarning__text">
              Last update 2 hours ago
            </span>
          </div>
        </div>
        <div className="list">
          <div className="listHeader">
            <div className="listHeader__content">
              <div>
                <span>Vacancies: </span>
                <span>497</span>
              </div>
            </div>
          </div>
          <div className="listBody">
            {data['keys'].list?.map((item) => (
              <div className="drugStore__item hasContacts hasBooking promo js-drugStore__item">
                <div className="drugStore__img">
                  <img
                    src="/upload/resize_cache//pharmacy/0c1//48_48_2/0c1c1bfe8c4af55c693f60351c6a2004.jpg"
                    width="48"
                    height="48"
                  />
                </div>
                <div className="drugStore__content">
                  <div class="drugStore__meta">
                    <span class="drugStore__address">
                      г. Пинск, ул. Завальная, д. 32{' '}
                    </span>
                  </div>
                  <div class="drugStore__title">
                    <span class="drugStore__name">
                      Аптека АстраФарма №1 Аптека АстраФарма №1 Аптека
                      АстраФарма №1 Аптека АстраФарма №1 Аптека АстраФарма №1{' '}
                    </span>
                  </div>
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
            ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default AppTest
