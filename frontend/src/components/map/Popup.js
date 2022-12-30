import React from 'react'
import ListSpans from '../Span/ListSpans/ListSpans'

import './Popup.css'

const Popup = (props) => {
  const popupStyles = {
    mobile: {
      left: '0',
      width: '100%',
      display: !props.isHideMap ? 'none' : 'block',
      transform: props.isShowPopUpMarker
        ? 'translateY(0px)'
        : 'translateY(50%)',
    },
    desktop: {
      left: props.size['window'].width <= '1280' ? '55vw' : `850px`,
      right: props.size['window'].width <= '1280' ? '5vw' : '100px',
      width: props.size['window'].width <= '1280' ? 'calc(100% - 60vw)' : '',
      display: 'block',
      transform: props.isShowPopUpMarker
        ? 'translateY(0px)'
        : 'translateY(50%)',
    },
  }

  if (!props.marker) {
    return null
  }

  return (
    <div
      className="popup__wrapper"
      style={
        props.size['mobile'].value
          ? popupStyles['mobile']
          : popupStyles['desktop']
      }
    >
      <div className="marker__popup">
        <div className="marker__popup--wrapper">
          <div className="marker__popup--header">
            <div className="marker__popup__header--content">
              <div className="marker__popup__header--image">
                <div className="marker__popup__header__image--wrapper">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/pin_${props.marker.keySkill}.png`}
                    width="48"
                    height="48"
                    alt={props.marker.keySkill}
                  />
                </div>
              </div>
              <div className="marker__popup__subheader">
                <a
                  className="marker__popup__subheader--title"
                  href={props.marker.url}
                  target="_blank"
                  rel="noreferrer"
                  alt={props.marker.nameCompany}
                >
                  {props.marker.nameCompany}
                </a>
                <div className="marker__popup__subheader--subtitle">
                  <span>{props.marker.name}</span>
                </div>
              </div>
            </div>
          </div>
          <ListSpans
            stroke={props.marker.skill}
            title="Ключевые требования"
          ></ListSpans>
          <div className="marker__popup--footer">
            <div className="error__warning">
              <span className="error__warning--icon">
                <svg viewBox="0 0 24 24">
                  <path d="M19.511 17.98L10.604 1.348a.697.697 0 0 0-1.208 0L.49 17.98a.675.675 0 0 0 .005.68c.125.211.352.34.598.34h17.814a.694.694 0 0 0 .598-.34.677.677 0 0 0 .006-.68zM11 17H9v-2h2v2zm0-3.5H9V7h2v6.5z"></path>
                </svg>
              </span>
              <span>Вакансия не актуальна?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
