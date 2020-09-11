import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames';

const Cards = (props) => {
    if(!props.data.confirmed) return 'loading!!!';
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected Global</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={props.data.confirmed.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>Infected in India</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={props.dataIndia.confirmed.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">{new Date(props.data.lastUpdate).toDateString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered Global</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={props.data.recovered.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>Recovered in India</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={props.dataIndia.recovered.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">{new Date(props.data.lastUpdate).toDateString()}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.deaths)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths Global</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={props.data.deaths.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>Deaths in India</Typography>
                        <Typography variant="h5">
                            <CountUp start={0} end={props.dataIndia.deaths.value} duration={2.5} separator=',' />
                        </Typography>
                        <Typography color="textSecondary">{new Date(props.data.lastUpdate).toDateString()}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;