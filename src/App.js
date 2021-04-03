import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      country:null,
      tarih:null,
      toplam:null,
      taburcu:null,
      ölü:null,
      sayı:0,
    };
    
  }
  
  fetchdata = () => {
    fetch(`https://api.covid19api.com/summary`)
  .then(response => response.json())
  .then((data) => {
  	var countriesObject =data.Countries
    for(var i = 0;i<countriesObject.length;i++){
    	if(this.state.country == countriesObject[i].Country){
    		var datas = countriesObject[i];
    		this.setState({
    			tarih :datas.Date.substr(0,10),
    			toplam: datas.TotalConfirmed,
    			taburcu :datas.TotalRecovered,
    			ölü :datas.TotalDeaths,
    			sayı:1,
    		})
    		
    	}
    	
    }
    if(this.state.sayı==0){
    	alert('Country is not found');
    	this.setState({
    			tarih :null,
    			toplam: null,
    			taburcu :null,
    			ölü :null,
    			sayı:1,
    		})
    }
    // data[this.state.country].forEach(({ date, confirmed, recovered, deaths }) =>
    // this.setState({
    //   tarih:date,
    //   toplam:confirmed,
    //   taburcu:recovered,
    //   ölü:deaths,
      
    // })
    // );
  }).then(this.setState({sayı:0}))}

  handleChange = event => {
    this.setState({country: event.target.value});
  }

  handleSubmit = event => {
    this.fetchdata();
    event.preventDefault();
  }
  arttır = ()=>{
  	this.setState({
  		sayı:this.state.sayı+1
  	})
  }
  render() {
    
      return (
        <div className='App'>
          <form onSubmit={this.handleSubmit}>
            English Country Name : 
            <input type='text'value={this.state.value} onChange={this.handleChange}  />
            <input type="submit" value="Submit" />
          </form>
          <h1>
            Country: {this.state.country}<br/>
            Date: {this.state.tarih} <br/>
            Total Confirmed: {this.state.toplam} <br/>
            Total Recovered: {this.state.taburcu} <br/>
            Total Deaths: {this.state.ölü}<br/>
          </h1>
        </div>
      )
    }
  }

export default App;
