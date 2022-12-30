import './Search.css'

const Search = (props) => {
  const { size, value, placeholder, isHideMap } = props

  return (
    <div
      className="search__wrapper"
      style={{ display: isHideMap && size['mobile'].value ? 'none' : 'block' }}
    >
      <div className="search">
        <span className="search__icon">
          <svg viewBox="0 0 24 24">
            <g>
              <path d="M11.4872 3.53846C7.09639 3.53846 3.53846 7.09356 3.53846 11.4771C3.53846 15.8607 7.09639 19.4158 11.4872 19.4158C13.6777 19.4158 15.6599 18.5318 17.0983 17.1C18.5433 15.6617 19.4359 13.6742 19.4359 11.4771C19.4359 7.09356 15.878 3.53846 11.4872 3.53846ZM2 11.4771C2 6.24221 6.24839 2 11.4872 2C16.726 2 20.9744 6.24221 20.9744 11.4771C20.9744 13.8225 20.1207 15.9697 18.7083 17.624L21.7744 20.6865C22.075 20.9868 22.0752 21.4738 21.775 21.7744C21.4748 22.075 20.9877 22.0752 20.6872 21.775L17.6182 18.7096C15.965 20.1093 13.8242 20.9542 11.4872 20.9542C6.24839 20.9542 2 16.712 2 11.4771Z"></path>
            </g>
          </svg>
        </span>
        <input className="search__input" placeholder={placeholder}></input>
        <span className="search__clear">
          <svg viewBox="0 0 24 24">
            <g>
              <path d="M10,4 C10,2.8954305 10.8954305,2 12,2 C13.1045695,2 14,2.8954305 14,4 L14,10 L20,10 L20,14 L4,14 L4,10 L10,10 L10,4 Z M4,14 L20,14 L20,22 L12,22 L4,22 L4,14 Z M16,22 L16,16.3646005 M8,22 L8,16.3646005 M12,22 L12,16.3646005"></path>
            </g>
          </svg>
        </span>
      </div>
    </div>
  )
}

export default Search
