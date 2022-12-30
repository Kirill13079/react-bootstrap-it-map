import './ListSpans.css'

const ListSpans = (props) => {
  const { stroke, title, style } = props

  if (stroke) {
    return (
      <div className="list__spans" style={style}>
        <span className="list__spans--title">{title}</span>
        <div className="list__spans--items">
          {stroke.split(',').map((item, index) => (
            <div key={'list_span_item_' + index} className="list__spans__item">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default ListSpans
