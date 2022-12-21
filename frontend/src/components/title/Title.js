import './Title.css'

const Title = (props) => {
  return (
    <div>
      <div className="rowTitle rowTitle--title">
        <h1 className="rowTitle__title">{props.title}</h1>
      </div>
      <div className="rowTitle rowTitle--description">
        <span className="rowTitle__description">{props.description}</span>
      </div>
    </div>
  )
}

export default Title
