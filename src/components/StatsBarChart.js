import React from 'react';
import BarChart from "recharts/lib/chart/BarChart";
import {XAxis, YAxis, Tooltip, Bar, ResponsiveContainer} from "recharts";
import choseColor from "../utils/utils"
import noData from '../icons/noData.png'

function StatsBarChart (props) {

    const returnContent = () => {
        if (props.stats.length === 0){
            return (<img title="No data found for date on this interval, try another date or interval" className="noData" src={noData} alt=""/>)
        }
        return (
            <ResponsiveContainer width="90%" height={150}>
                <BarChart className="barChart" data={props.stats}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey={props.product} fill={choseColor(props.product)}/>
                </BarChart>
            </ResponsiveContainer>
        )
    }

    return(
        <div className="productStats" >
            {returnContent()}
            <img className="icon" src={props.icon} alt=""/>
        </div>
    )
}

export default StatsBarChart;