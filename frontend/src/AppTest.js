import React, { useCallback } from 'react'
import Map from './components/map/Map'
import Popup from './components/map/Popup'
import Search from './components/search/Search'
import List from './components/list/List'
import Navigation from './components/navigation/Navigation'

import groupBy from './utils/groupBy'
import produce from 'immer'

import '../src/assets/css/styles.css'

const AppTest = () => {
  const [isHideMap, setIsHideMap] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const [selectedMarker, setSelectedMarker] = React.useState(null)

  const [data, setData] = React.useState({
    vacancies: {
      list: null,
      filtered: null,
      groupBy: null,
    },
    keys: {
      list: null,
    },
  })

  const handleHideMap = () => {
    setIsHideMap(!isHideMap)
  }

  const handleResize = () => {
    if (window.innerWidth < 700) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  const handleSelectedMarker = (key) => {
    setSelectedMarker(key)
  }

  const handleCheckedKey = useCallback((key) => {
    const editData = () => {
      setData(
        produce((draft) => {
          const checkedKey = draft['keys'].list.find((item) => item.key === key)
          const checkedKeys = []

          checkedKey.isChecked = !checkedKey.isChecked

          draft['keys'].list.forEach((item) => {
            if (item.isChecked) checkedKeys.push(item.key)
          })

          draft['vacancies'].filtered = draft['vacancies'].list.filter((item) =>
            checkedKeys.includes(item.keySkill)
          )

          setSelectedMarker(null)
        })
      )
    }

    editData()
  }, [])

  React.useEffect(() => {
    const getData = () => {
      fetch('http://localhost:4001/')
        .then((res) => res.json())
        .then((result) => {
          setData({
            vacancies: {
              list: result,
              filtered: result,
              groupBy: result ? groupBy(result, (item) => item.keySkill) : null,
            },
            keys: {
              list: result
                ? Array.from(
                    groupBy(result, (item) => item.keySkill).keys()
                  ).map((key) => ({
                    key: key,
                    isChecked: true,
                    isActive: false,
                  }))
                : null,
            },
          })
        })
    }

    getData()
  }, [])

  React.useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="mainContent">
      <Search
        value=""
        size={{
          isHideMap: { value: isHideMap },
          isMobile: { value: isMobile },
        }}
      ></Search>
      <Navigation
        size={{
          isHideMap: { value: isHideMap },
          isMobile: { value: isMobile },
        }}
        onHideMap={handleHideMap}
      ></Navigation>
      <Map
        vacancies={data['vacancies'].filtered}
        size={{
          isHideMap: { value: isHideMap },
          isMobile: { value: isMobile },
        }}
        onHideMap={handleHideMap}
        onSelectedMarker={handleSelectedMarker}
      />
      <List
        data={data}
        size={{
          isHideMap: { value: isHideMap },
          isMobile: { value: isMobile },
        }}
        onCheckedKey={handleCheckedKey}
      ></List>
      <Popup
        marker={selectedMarker}
        size={{
          isHideMap: { value: isHideMap },
          isMobile: { value: isMobile },
        }}
      ></Popup>
    </div>
  )
}

export default AppTest
