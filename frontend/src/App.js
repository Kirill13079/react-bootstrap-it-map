import React from 'react'
import Map from './components/map/Map'
import Menu from './components/menu/Menu'
import Search from './components/modal/Search'
import SearchTest from './components/modal/SearchTest'
import Navbar from 'react-bootstrap/Navbar'

import groupBy from './utils/groupBy'
import produce from 'immer'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import Info from './components/modal/Info'

const App = () => {
  const [modalInfo, setModalInfo] = React.useState(false)
  const [modalSetting, setModalSetting] = React.useState(false)

  const [vacancies, setVacancies] = React.useState(null)
  const [vacanciesFiltered, setVacanciesFiltered] = React.useState(null)
  const [vacanciesGroupBy, setVacanciesGroupBy] = React.useState(null)
  const [vacanciesKeys, setVacanciesKeys] = React.useState(null)

  const openModal = (nameModal) => {
    if (nameModal === 'info') {
      setModalInfo(!modalInfo)
      setModalSetting(false)
    } else if (nameModal === 'setting') {
      setModalSetting(!modalSetting)
      setModalInfo(false)
    }
  }

  const checkedKey = (index, key) => {
    if (index) {
      setVacanciesKeys(
        produce((vacanciesKeys) => {
          vacanciesKeys[index].isChecked = !vacanciesKeys[index].isChecked
        }),
        setVacanciesFiltered(
          vacancies.filter((vacancy) => vacancy.keySkill !== key)
        )
      )
    }
  }

  React.useEffect(() => {
    const getVacancies = () => {
      fetch('http://localhost:5000/')
        .then((res) => res.json())
        .then((result) => {
          setVacancies(result)
          setVacanciesFiltered(result)
          setVacanciesGroupBy(
            result ? groupBy(result, (item) => item.keySkill) : null
          )
          setVacanciesKeys(
            result
              ? Array.from(groupBy(result, (item) => item.keySkill).keys()).map(
                  (key) => ({
                    key: key,
                    isChecked: true,
                    isActive: false,
                  })
                )
              : null
          )
        })
    }

    getVacancies()
  }, [])

  return (
    <div id="wrapper" class={modalInfo || modalSetting ? 'toggled' : ''}>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        bg="transparent"
        variant="white"
        id="header"
      >
        <Menu search={openModal}></Menu>
        {/*         <Search
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={[vacanciesGroupBy, vacanciesKeys]}
          checkedKey={checkedKey}
        /> */}
      </Navbar>
      <Info visible={modalInfo}></Info>
      <SearchTest
        visible={modalSetting}
        data={[vacancies, vacanciesGroupBy, vacanciesKeys]}
      ></SearchTest>
      <Map vacancies={vacanciesFiltered} />
    </div>
  )
}

export default App
