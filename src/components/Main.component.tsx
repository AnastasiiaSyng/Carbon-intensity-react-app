import React, { useState, useEffect } from 'react';
import './Main.component.styles.css'
import { BoxLoading } from 'react-loadingg';
import {  VictoryBar, VictoryChart, VictoryAxis } from 'victory';


const setStartDate = () => {
    let startDate = new Date();
    startDate.setDate(startDate.getDate()-1);
    return startDate.toISOString().substring(0, 19)
};
const setEndDate = () => {
    return new Date().toISOString().substring(0, 19)
}

const MainComponnet = () => {
    const [state, setState] = useState({
        startDate: setStartDate(),
        endDate: setEndDate(),
        result: [],
        loading: true,
    });    
 
    const { startDate, endDate, loading, result } = state;
    useEffect(() => {
        fetch(`https://api.carbonintensity.org.uk/intensity/${startDate}/${endDate}`)
            .then(response => response.json())
            .then(response => {                
                setState(prevState => {
                    return {...prevState, result: response.data, loading: false}})
            });
    }, [endDate, startDate])
    
    return (
        <div className='container'>
            <h1>Carbon intensity level for last 24 hours</h1>
            {loading && <BoxLoading size='large' color='blue' /> }
          <div className='view'>
                {!loading &&
                    <VictoryChart>
                    <VictoryAxis dependentAxis />                     
                    <VictoryBar
                        style={{ data: { fill: "#c43a31" } }}
                        data={result}
                        x="from"
                        y="intensity.actual"
                    />
                    </VictoryChart>
                }
          </div>
        </div>
    )
}

export default MainComponnet
