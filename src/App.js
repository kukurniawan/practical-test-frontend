import './App.css';
import React, { Component } from 'react';
import Select from 'react-select';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment'

const endpoint = 'http://localhost:8000'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      clearCityValue: null,
      cityOptions: [],
      selectOptions : [],
      id: "",
      name: '',
      weather: {"location":{"longitude":0,"latitude":0},"lastUpdate":0,"wind":{"speed":0.00,"degrees":0},"visibility":0,"temperatureCelsius":0,"temperatureFahrenheit":0,"dewPoint":0,"humidity":0,"pressure":0, "clouds":{"all":0}, "error":null}
    }
  }
  async getCountry(){
    const res = await axios.get(endpoint + '/country')
    const data = res.data.data

    const options = data.map(d => ({
      "value" : d.code,
      "label" : d.name

    }))
    this.setState({selectOptions: options})
  }
  async getCity(code){
    const res = await axios.get(endpoint + '/city/'+code)
    const data = res.data.data

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.name

    }))
    this.setState({cityOptions: options})
  }
  async getWeather(countryCode, city){
    const res = await axios.get(endpoint + '/weather/'+ countryCode + '/' + city)
    this.setState({weather: res.data})
  }
  handleCountryChange(e){
    this.setState({clearCityValue: null, id: e.value, name: e.name})
    this.getCity(e.value)
  }
  handleCityChange(e){
    this.setState({clearCityValue: e})
    this.getWeather(this.state.id, e.label)
  }
  componentDidMount(){
      this.getCountry()
  }
  render() {
    return (      
      <div className="container">
        <main role="main" class="pb-3">
        <div className="row">
         <div className="col-sm-3">
           <ComboBox placeholder="Select country" pdata={this.state.selectOptions} 
              onChange={this.handleCountryChange.bind(this)}></ComboBox>
         </div>
         <div className="col-sm-6">
         </div>
         </div>
        <br/>
         <div className="row">
         <div className="col-sm-3">
           <ComboBox placeholder="Select city" pdata={this.state.cityOptions} 
              selectedValue={this.state.clearCityValue}  onChange={this.handleCityChange.bind(this)}></ComboBox>
         </div>
         <div className="col-sm-6">
         </div>
         </div>
         <hr/>
         <Weather value={this.state.weather} />
        </main>
         
      </div>
    )
  }
}

class ComboBox extends Component {
  render() {
    return (
      <div>
        <Select placeholder={this.props.placeholder} value={this.props.selectedValue} options={this.props.pdata} onChange={this.props.onChange} />
      </div>
    );
  }
}

class Weather extends Component{
  render(){
    return(
      <dl class="row">
        <dt class="col-sm-2">Location</dt>
        <dd class="col-sm-10">ln: {this.props.value?.location.longitude ?? 0} , lat: {this.props.value?.location.latitude ?? 0}</dd>
        <dt class="col-sm-2">Time</dt>
        <dd class="col-sm-10">{moment(this.props.value?.lastUpdate *1000 ?? 0).format("MMMM Do YYYY, h:mm:ss a")}</dd>
        <dt class="col-sm-2">Wind</dt>
        <dd class="col-sm-10">speed: {this.props.value?.wind.speed ?? 0} degrees: {this.props.value?.wind.degrees}</dd>
        <dt class="col-sm-2">Visibility</dt>
        <dd class="col-sm-10">{this.props.value?.visibility / 1000 ?? 0}km</dd>
        <dt class="col-sm-2">Sky</dt>
        <dd class="col-sm-10">{this.props.value?.clouds.all ?? 0}%</dd>
        <dt class="col-sm-2">Temp</dt>
        <dd class="col-sm-10">{this.props.value?.temperatureCelsius ?? 0}°C - {this.props.value?.temperatureFahrenheit ?? 0}°F</dd>
        <dt class="col-sm-2">Dew Point</dt>
        <dd class="col-sm-10">{this.props.value?.dewPoint ?? 0}°C</dd>
        <dt class="col-sm-2">Humidity</dt>
        <dd class="col-sm-10">{this.props.value?.humidity ?? 0}%</dd>
        <dt class="col-sm-2">Pressure</dt>
        <dd class="col-sm-10">{this.props.value?.pressure ?? 0}hPa</dd>
      </dl>
    )
  }
}

export default App;
