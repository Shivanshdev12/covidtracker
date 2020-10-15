import React, { Component } from 'react';
import styles from './App.module.css';
import Cards from './components/cards/Cards';
import Charts from './components/Charts/Charts';
import { fetchData, fetchIndia, fetchDailyData } from './API/index';
import img from './images/corona.png';
import Maps from './components/Map/Maps';


class App extends Component {
  state = {
    data: {},
    dataIndia: {},
    country: ''
  }
  async componentDidMount() {
    const fetchedData = await fetchData();
    const fetchedIndia = await fetchIndia();
    this.setState({ data: fetchedData, dataIndia: fetchedIndia });
  }
  render() {
    return (
      <div className={styles.container}>
        <h1><img className={styles.image} src={img} />  COVID TRACKER</h1>
        <Cards data={this.state.data} dataIndia={this.state.dataIndia} />
        {/* <Charts data={this.state.data} /> */}
        <Maps/>
      </div>
    )
  }
}


export default App;
