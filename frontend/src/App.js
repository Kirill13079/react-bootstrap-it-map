import React, { useCallback } from 'react'
import Map from './components/map/Map'
import Menu from './components/menu/Menu'
import SearchTest from './components/modal/SearchTest'
import Navbar from 'react-bootstrap/Navbar'

import groupBy from './utils/groupBy'
import produce from 'immer'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Info from './components/modal/Info'

const App = () => {
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

  const [showModal, setShowModal] = React.useState({
    modal: { info: false, search: false },
  })

  const handleModal = useCallback((name) => {
    setShowModal(
      produce((draft) => {
        const modal = draft['modal']

        if (name === 'info') {
          modal.info = !modal.info
          modal.search = false
        } else if (name === 'search') {
          modal.search = !modal.search
          modal.info = false
        }
      })
    )
  }, [])

  const handleChecked = useCallback((key) => {
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

  return (
    <div
      id="wrapper"
      class={
        showModal['modal'].info || showModal['modal'].search ? 'toggled' : ''
      }
    >
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        bg="transparent"
        variant="white"
        id="header"
      >
        <Menu search={handleModal}></Menu>
      </Navbar>
      <Info visible={showModal['modal'].info}></Info>
      <SearchTest
        visible={showModal['modal'].search}
        checkedKey={handleChecked}
        data={data}
      ></SearchTest>
      <Map vacancies={data['vacancies'].filtered} />
    </div>
  )
}

export default App
