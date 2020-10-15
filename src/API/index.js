import axios from 'axios';
const url = `https://covid19.mathdro.id/api`;

export const fetchData = async ()=>{
    try{
        const data = await axios.get(`${url}`);
        const modifieddata = {
            confirmed:data.data.confirmed,
            deaths:data.data.deaths,
            recovered:data.data.recovered,
            lastUpdate:data.data.lastUpdate
        }
        return modifieddata;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchIndia = async ()=>{
    try{
        const data = await axios.get(`https://covid19.mathdro.id/api/countries/india`);
        const modifieddata = {
            confirmed:data.data.confirmed,
            deaths:data.data.deaths,
            recovered:data.data.recovered,
            lastUpdate:data.data.lastUpdate
        }
        return modifieddata;
    }
    catch(err){
        console.log(err);
    }
}

export const fetchDailyData = async ()=>{
    try{
        const {data} = await axios.get(`${url}/daily`);
        const modified = data.map((dailyData)=>({
            confirmed:dailyData.confirmed.total,
            deaths:dailyData.deaths.total,
            date:dailyData.reportDate
        }));
        return modified;
    }
    catch(error){
        console.log(error);
    }
}