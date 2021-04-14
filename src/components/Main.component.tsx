import React, { useState, useEffect } from 'react'
import { BoxLoading } from 'react-loadingg';


const setStartDate = () => {
    let startDate = new Date();
    startDate.setMonth(startDate.getMonth()-1);
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
 
    const { startDate, endDate, loading } = state;
    useEffect(() => {
        fetch(`https://api.carbonintensity.org.uk/intensity/${startDate}/${endDate}`)
            .then(response => response.json())
            .then(response => {                
                setState(prevState => {
                    return {...prevState, result: response.data, loading: false}})
            });
    }, [])
    
    return (
        <div>
            {loading && <BoxLoading size='large' color='blue' /> }
        </div>
    )
}

export default MainComponnet
