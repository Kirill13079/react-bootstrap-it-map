import React, { useCallback } from 'react'
import Main from './components/main/Main'
import Map from './components/map/Map'
import Popup from './components/map/Popup'
import Search from './components/search/Search'
import List from './components/list/List'
import Navigation from './components/navigation/Navigation'

import groupBy from './utils/groupBy'
import produce from 'immer'

import './App.css'

const AppTest = () => {
  const [isHideMap, setIsHideMap] = React.useState(false)
  const [isLoad, setIsLoad] = React.useState(false)
  const [isShowPopUpMarker, setIsShowPopUpMarker] = React.useState(true)

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

  const handleSelectedVacancy = (vacancy) => {
    handleSelectedMarker(vacancy)

    if (size['mobile'].value && !isHideMap) {
      setIsHideMap(!isHideMap)
    }
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

    if (!isShowPopUpMarker) {
      setIsShowPopUpMarker(true)
    }
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

    setIsLoad(true)

    return () => window.removeEventListener('resize', handleSize)
  }, [])

  if (isLoad) {
    return (
      <Main size={size} isHideMap={isHideMap}>
        <Search
          value=""
          placeholder="Назавание технологии"
          size={size}
          isHideMap={isHideMap}
        />
        <Navigation
          size={size}
          isHideMap={isHideMap}
          onHideMap={handleHideMap}
          selectedKey={selectedKey}
        />
        <Map
          vacancies={data['vacancies'].filtered}
          size={size}
          isHideMap={isHideMap}
          onHideMap={handleHideMap}
          onSelectedMarker={handleSelectedMarker}
          selectedMarker={selectedMarker}
          setIsShowPopUpMarker={setIsShowPopUpMarker}
        />
        <List
          data={data}
          size={size}
          isHideMap={isHideMap}
          onCheckedKey={handleCheckedKey}
          onSelectedKey={handleSelectedKey}
          onSelectedVacancy={handleSelectedVacancy}
          selectedKey={selectedKey}
        />
        <Popup
          marker={selectedMarker}
          size={size}
          isHideMap={isHideMap}
          isShowPopUpMarker={isShowPopUpMarker}
          setIsShowPopUpMarker={setIsShowPopUpMarker}
        />
      </Main>
    )
  }

  return <div>Загрузка данных</div>
}

export default AppTest
