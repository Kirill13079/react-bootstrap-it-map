import './Button.css'

const ListButtons = (props) => {
  const { ...other } = props

  return <div className="list__buttons" {...other}></div>
}

export default ListButtons
