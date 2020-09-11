import React, { Component } from 'react';
import styles from './App.module.css';
import Cards from './components/cards/Cards';
import {fetchData,fetchIndia} from './API/index';
import img from './images/corona.png';


class App extends Component {
  state={
    data:{},
    dataIndia:{},
    country:''
  }
  async componentDidMount(){
    const fetchedData = await fetchData();
    const fetchedIndia = await fetchIndia();
    this.setState({data:fetchedData,dataIndia:fetchedIndia});
    console.log(this.state.data);
    console.log(this.state.dataIndia);
  }
  render() {
    return (
      <div className={styles.container}>
        <h1><img className={styles.image} src={img}/>Covid-tracker</h1>
        <Cards data={this.state.data} dataIndia={this.state.dataIndia} />
      </div>
    )
  }
}


export default App;
