import React, { Component } from 'react';
import { connect } from 'react-redux';
import LineChart from '../components/line_chart';
import GoogleMap from '../components/google_map';

function convertKelvinToFaranheit(temp) {
    return (temp * (9/5)) - 459.67;
}

export class WeatherList extends Component {

    constructor(props) {
        super(props);
    }

    renderWeather(cityData) {
        console.log(cityData);
        const name = cityData.city.name;
        const temps = cityData.list.map(weather => convertKelvinToFaranheit(weather.main.temp));
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const humidity = cityData.list.map(weather => weather.main.humidity);
        const { lon, lat } = cityData.city.coord;

        return (
            <tr key={name}>
                <td><GoogleMap lat={lat} lon={lon} /></td>
                <td><LineChart data={temps} color="orange" units="F" /></td>
                <td><LineChart data={pressure} color="green" units="hPa" /></td>
                <td><LineChart data={humidity} color="blue" units="%" /></td>
            </tr>
        );
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature (F)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({weather}) {
    return { weather }
}

export default connect(mapStateToProps)(WeatherList);
