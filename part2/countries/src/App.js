import {useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({country}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
  },[])

  console.log(weather)
  if (weather) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <div><b>temperature:</b> {weather.temperature}</div>
        <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} heingt='50' />
        <div><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir} </div>
      </div>
    )
  }

  return null
}

const Country = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital: {country.capital}</div>
    <div>population: {country.population}</div>
    <div>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name} >{language.name}</li>)}
      </ul>
    </div>
    <img src={country.flag} alt={country.name} height="200" />
    <Weather country={country} />
    
  </div>
)

const CountryResult = ({name, setFilter}) => (
  <div>
    {name}
    <button onClick={() => setFilter(name)} >Show</button>
  </div>
)

const Result = ({countries, setFilter}) => {
  if (countries.length === 0) {
    return (
      <div>
        no country matches the filter
      </div>
    )
  }
  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }
  if (countries.length <= 10) {
    return (
      <div>
        {countries.map(country => <CountryResult key={country.name} name={country.name} setFilter={setFilter} />)}
      </div>
    )
  }
  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}


const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filteredCountries = countries.filter(
    country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div className="App">
      find countries: <input value={filter} onChange={event => {setFilter(event.target.value)}} />
      <Result countries={filteredCountries} setFilter={setFilter} />
    </div>
  );
}

export default App;
