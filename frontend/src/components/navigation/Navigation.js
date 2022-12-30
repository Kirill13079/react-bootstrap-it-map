import React from 'react'
import Title from '../title/Title'

import './Navigation.css'

const Navigation = (props) => {
  const { size, isHideMap, selectedKey, onHideMap } = props

  const hideMapButton = {
    mobile: {
      display: 'none',
    },
    desktop: {
      display: 'flex',
    },
  }

  return (
    <div
      className="navigation__wrapper"
      style={{ display: isHideMap && size['mobile'].value ? 'none' : 'block' }}
    >
      <div className="navigation__buttons">
        <a href="/" className="navigation__buttons--back_button">
          <span className="back_button__icon">
            <svg viewBox="0 0 11 8">
              <path d="M3.588.12a.38.38 0 0 1 .555 0c.15.155.15.413 0 .568L1.332 3.596h9.274c.217 0 .394.177.394.4a.402.402 0 0 1-.394.408H1.332l2.81 2.902c.15.16.15.419 0 .574a.38.38 0 0 1-.554 0L.112 4.284a.415.415 0 0 1 0-.568L3.588.12z"></path>
            </svg>
          </span>
          <span className="back_button__text">Назад</span>
        </a>
        <Title
          title={selectedKey ? selectedKey : 'Поиск вакансий'}
          description="sldfk ldfks"
        />
      </div>
      {/*       <button
        className="hide__map__button"
        onClick={onHideMap}
        style={
          isHideMap || size['mobile'].value
            ? hideMapButton['mobile']
            : hideMapButton['desktop']
        }
      >
        <span className="hide__map__button__label">Скрыть карту</span>
        <span className="hide__map__button__icon">
          <svg viewBox="0 0 24 24">
            <path d="M9.46967 5.46967C9.76256 5.17678 10.2374 5.17678 10.5303 5.46967L16.5303 11.4697C16.8232 11.7626 16.8232 12.2374 16.5303 12.5303L10.5303 18.5303C10.2374 18.8232 9.76256 18.8232 9.46967 18.5303C9.17678 18.2374 9.17678 17.7626 9.46967 17.4697L14.9393 12L9.46967 6.53033C9.17678 6.23744 9.17678 5.76256 9.46967 5.46967Z"></path>
          </svg>
        </span>
      </button> */}
    </div>
  )
}

export default Navigation
