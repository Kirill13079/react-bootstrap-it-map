import './Main.css'

const Main = (props) => {
  const { size, isHideMap } = props

  const styleMain = {
    mobile: {
      width: '100%',
      margin: '0 auto',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
    },
    desktop: {
      width: size['window'].width <= '1280' ? '50vw' : '700px',
    },
  }

  console.log(isHideMap)
  return (
    <div
      className="main__content"
      style={size['mobile'].value ? styleMain['mobile'] : styleMain['desktop']}
    >
      {props.children}
    </div>
  )
}

export default Main
