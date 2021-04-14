import React, { useState, useEffect } from 'react';
import './Main.component.styles.css'
import { BoxLoading } from 'react-loadingg';
import {  VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';


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
            {loading && <BoxLoading size='large' color='#f8e9a1' /> }
          <div className='view'>
                {!loading &&
                    <VictoryChart theme={VictoryTheme.material}>
                        <VictoryAxis dependentAxis />   
                        {/* <VictoryAxis 
                            padding={10}
                            tickFormat={(y) => (`${y.slice(11,16)}`)}
                        />                      */}
                        <VictoryBar
                            style={{ data: { fill: "#f76c6c", marginRight: 10} }}
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
