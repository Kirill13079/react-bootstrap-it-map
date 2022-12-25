import './Search.css'

const Search = (props) => {
  const searchWrapper = {
    mobile: {
      width: '100%',
      display: props.size['mobile'].value && props.isHideMap ? 'none' : 'block',
    },
    desktop: {
      width: props.size['window'].width <= '1280' ? '50vw' : '700px',
    },
  }

  return (
    <div
      className="search__wrapper"
      style={
        props.isHideMap || props.size['mobile'].value
          ? searchWrapper['mobile']
          : searchWrapper['desktop']
      }
    >
      <div className="searchForm">
        <div className="search">
          <div>
            <span className="searchIcon">
              <svg viewBox="0 0 24 24">
                <g fill="none">
                  <path
                    fill="#1E201D"
                    d="M11.4872 3.53846C7.09639 3.53846 3.53846 7.09356 3.53846 11.4771C3.53846 15.8607 7.09639 19.4158 11.4872 19.4158C13.6777 19.4158 15.6599 18.5318 17.0983 17.1C18.5433 15.6617 19.4359 13.6742 19.4359 11.4771C19.4359 7.09356 15.878 3.53846 11.4872 3.53846ZM2 11.4771C2 6.24221 6.24839 2 11.4872 2C16.726 2 20.9744 6.24221 20.9744 11.4771C20.9744 13.8225 20.1207 15.9697 18.7083 17.624L21.7744 20.6865C22.075 20.9868 22.0752 21.4738 21.775 21.7744C21.4748 22.075 20.9877 22.0752 20.6872 21.775L17.6182 18.7096C15.965 20.1093 13.8242 20.9542 11.4872 20.9542C6.24839 20.9542 2 16.712 2 11.4771Z"
                  ></path>
                </g>
              </svg>
            </span>
            <input
              className="searchInput"
              placeholder="Writing a skill"
            ></input>
          </div>
          <span className="clearSearch">
            <svg viewBox="0 0 24 24">
              <g fill="none">
                <path
                  fill="none"
                  stroke="#000"
                  d="M7,7 L17,17 M7,17 L17,7"
                ></path>
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Search
