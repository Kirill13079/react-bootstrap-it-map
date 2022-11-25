import React from 'react'
import Map from './components/map/Map'
import Menu from './components/menu/Menu'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const App = () => {
  const [vacancies, setVacancies] = React.useState(null)

  React.useEffect(() => {
    const getVacancies = async () => {
      await delay(1000)

      await fetch('http://localhost:5000/')
        .then((res) => res.json())
        .then((result) => setVacancies(result))
    }

    getVacancies()
  }, [])

  return (
    <>
      <Menu data={vacancies} />
      <Map />
    </>
  )
}

export default App
