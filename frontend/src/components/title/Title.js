import './Title.css'

const Title = (props) => {
  return (
    <div>
      <div class="rowTitle rowTitle--title">
        <h1 class="rowTitle__title">{props.title}</h1>
      </div>
      <div class="rowTitle rowTitle--description">
        <span class="rowTitle__description">{props.description}</span>
      </div>
    </div>
  )
}

export default Title
