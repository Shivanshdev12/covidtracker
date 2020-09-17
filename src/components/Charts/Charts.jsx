import React,{useState,useEffect} from 'react';
import {fetchDailyData} from '../../API';
import {Line,Bar} from 'react-chartjs-2';
// import styles from 'Charts.module.css';

const Charts = (props) =>{
    const [dailyData,setDailyData] = useState([]);
    useEffect(()=>{
        const fetchAPI = async()=>{
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    },[]);
    return (
        <div>
            
        </div>
    );
}

export default Charts;