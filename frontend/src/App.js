import React from 'react'
import './App.css';

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

  console.log(vacancies)

  return (
    <div className="App">
    </div>
  );
}

export default App;
