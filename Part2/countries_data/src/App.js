import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import SingleCountry from './components/SingleCountry'

const App = () => {

    const [newFilter, setNewFilter] = useState('')
    const [newCountries, setCountries] = useState([])
    const [filteredCountries, setfilteredCountries] = useState([])
    
    const hook = () => {
        axios
          .get('https://restcountries.eu/rest/v2/all')
          .then(response => {
            setCountries(response.data)
          })
      }
      
      useEffect(hook, [])

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        let filteredCountries = newCountries.filter(country =>
            country.name.toLowerCase().includes(event.target.value.toLowerCase()))
        setfilteredCountries(filteredCountries)
    }

    const CountryFilter = (props) => {

        let countries = props.filteredCountries
    
        if (props.newFilter === '' || countries.length > 10) {
            return (
                <div>
                    Too many matches, specify another filter
                </div>
            )
        }
    
        if (countries.length === 0) {
            return (
                <div>
                    No matches found, specify another filter
                </div>
            )
        }
    
        if (countries.length === 1) {
            console.log("singlemap: ", countries)
            return (
                <div>
                    {countries.map(country =>
                        <SingleCountry key = {country.numericCode} name = {country.name}
                        capital = {country.capital} population = {country.population}
                        languages = {country.languages} flag = {country.flag} temperature = {country.responseData}/>
                    )}
                </div>
            )
        }
    
        if (countries.length <= 10 && countries.length > 1) {
            return (
                <div>
                    {countries.map(country =>
                        <Country key = {country.numericCode} name = {country.name} country = {country}
                        filteredCountries = {props.filteredCountries} setFilteredCountries = {props.setFilteredCountries}/>
                    )}
                </div>
                )
        }
    }    

    const Country = (props) => {

        console.log("country called")
    
        const Send = () => {
          console.log("send called")
          let country = [props.country]
          setfilteredCountries(country)
          console.log("filteredcountries", filteredCountries)
        }
      
          return (
            <div>
              {props.name}
              <button onClick = {Send}>
                show
              </button>
            </div>
          )
      }

    return (
        <div>
            <Filter newFilter = {newFilter} handleFilterChange = {handleFilterChange}/>
            <CountryFilter newFilter = {newFilter}  filteredCountries = {filteredCountries}/>
        </div>
    )
}

export default App