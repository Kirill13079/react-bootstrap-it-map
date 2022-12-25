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
  const [selectedMarker, setSelectedMarker] = React.useState(null)
  const [selectedKey, setSelectedKey] = React.useState(null)

  const [size, setSize] = React.useState({
    window: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    mobile: {
      value: false,
    },
  })

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

  const handleSize = () => {
    setSize({
      window: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      mobile: {
        value: window.innerWidth < 720 ? true : false,
      },
    })
  }

  const handleHideMap = () => {
    setIsHideMap(!isHideMap)
  }

  const handleSelectedKey = useCallback((key) => {
    const editData = () => {
      setData(
        produce((draft) => {
          draft['vacancies'].filtered = draft['vacancies'].list.filter(
            (item) => item.keySkill === key
          )

          setSelectedKey(key)
        })
      )
    }

    editData()
  }, [])

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
    handleSize()

    window.addEventListener('resize', handleSize)

    return () => window.removeEventListener('resize', handleSize)
  }, [])

  return (
    <div className="mainContent">
      <Search value="" size={size} isHideMap={isHideMap}></Search>
      <Navigation
        size={size}
        isHideMap={isHideMap}
        onHideMap={handleHideMap}
        selectedKey={selectedKey}
      ></Navigation>
      <Map
        vacancies={data['vacancies'].filtered}
        size={size}
        isHideMap={isHideMap}
        onHideMap={handleHideMap}
        onSelectedMarker={handleSelectedMarker}
      />
      <List
        data={data}
        size={size}
        isHideMap={isHideMap}
        onCheckedKey={handleCheckedKey}
        onSelectedKey={handleSelectedKey}
        selectedKey={selectedKey}
      ></List>
      <Popup marker={selectedMarker} size={size} isHideMap={isHideMap}></Popup>
    </div>
  )
}

export default AppTest
