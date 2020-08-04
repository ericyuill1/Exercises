import React, {useState} from 'react'
import axios from 'axios'

const Language = (props) => {
    return (
        <li>
            {props.language}
        </li>
    )
}

const SingleCountry = (props) => {
    console.log("SingleCountry Called")
    console.log("Country Name: ", props.name, " Country capital: ", props.capital)

    const [Temperature, setTemperature] = useState([])
    const [Speed, setSpeed] = useState([])
    const [Direction, setDirection] = useState([])
    const [Image, setImage] = useState([])

    const api_key = process.env.REACT_APP_API_KEY
    console.log("api_key : ", api_key)

    const params = {
        access_key: api_key,
        query: props.capital
    }

        axios.get('http://api.weatherstack.com/current', {
            params})
            .then(response => {
        const capital = response.data.location.name;
        const temperature = response.data.current.temperature;
        const speed = response.data.current.wind_speed;
        const direction = response.data.current.wind_dir;
        const image = response.data.current.weather_icons[0];
        setTemperature(temperature);
        setSpeed(speed);
        setDirection(direction);
        setImage(image);
        console.log("temp in ", capital, ":" , temperature)
            }).catch(error => {
                console.log(error);
    });

    return (
        <div>
            <h1>
                {props.name}
            </h1>
            <p>
                capital: {props.capital}
                <br/>
                population: {props.population}
            </p>
            <h2>
                languages
            </h2>
            <p>
                {props.languages.map((language, index) =>
                    <Language key = {index} language = {language.name}/>
                )}
            </p>
                <img src = {props.flag} alt = "new"/>
            <h2>
                Weather in {props.capital}
            </h2>
            <p>
                temperature: {Temperature} ℃
            </p>
            <img src = {Image} alt = "new"/>
            <p>
                wind: {Speed} mph direction {Direction}
            </p>
        </div>
    )
}

export default SingleCountry