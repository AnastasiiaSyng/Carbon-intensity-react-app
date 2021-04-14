import React, { useState, useEffect } from 'react'
import { BoxLoading } from 'react-loadingg';


const MainComponnet = () => {
    const [state, setState] = useState({
        startDate: '2021-03-10',
        endDate: '2021-04-14',
        result: [],
        loading: true,
    });    

    useEffect(() => {
        fetch(`https://api.carbonintensity.org.uk/intensity/${state.startDate}/${state.endDate}`)
            .then(response => response.json())
            .then(response => {                
                setState(prevState => {
                    return {...prevState, result: response.data, loading: false}})
            });
    }, [])
    
    return (
        <div>
            {state.loading && <BoxLoading size='large' color='blue' /> }
        </div>
    )
}

export default MainComponnet

