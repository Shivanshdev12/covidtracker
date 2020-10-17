import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../API/index';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import {Card,Grid} from '@material-ui/core';
import styles from './Charts.module.css';

const Charts = ({ data}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchAPI();
    }, []);


    const barChart = (
        data.confirmed ? (
            <Bar
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        labels: 'People',
                        backgroundColor: [
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)'
                        ],
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in Globally` }
                }}
            />
        ) : null
    );

    const doughnot = (
        data.confirmed ? (
            <Doughnut
                data={{
                    labels:['Infected','Recovered','Deaths'],
                    datasets:[{
                        data:[data.confirmed.value,data.recovered.value,data.deaths.value],
                        backgroundColor:[
                            'rgba(0,0,255,0.5)',
                            'rgba(0,255,0,0.5)',
                            'rgba(255,0,0,0.5)'
                        ]
                    }]
                }}
            />
        ) : null
    );

    const lineChart = (
        dailyData.length ? (<Line
            data={{
                labels: dailyData.map(({ date }) => date),
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#F2A365',
                    fill: true
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'deaths',
                    borderColor: 'red',
                    backgroundColor:'#FF6384',
                    fill: true
                }],
            }}
        />) : null
    );
    return (
        <div>
           <Grid container spacing={3} justify="center">
                <Grid component={Card} item md={6}>
                    {barChart}
                </Grid>
           </Grid>
        </div>
    )
}

export default Charts;