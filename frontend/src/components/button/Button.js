import './Button.css'

const DefaultButton = (props) => {
  const { icon, bgColor, display, fill, onClickHandler } = props

  return (
    <div
      className="default__button"
      style={{ backgroundColor: bgColor, display: display ? display : 'flex' }}
      onClick={(e) => onClickHandler()}
    >
      <svg viewBox="0 0 24 24">
        <path fill={fill} d={icon}></path>
      </svg>
    </div>
  )
}

export default DefaultButton
