import React,{Component} from 'react';
import BarChart from "recharts/lib/chart/BarChart";
import { XAxis,YAxis,Tooltip,Bar } from "recharts";

function StatsBarChart (props) {
    const choseColor = () => {
        if (props.product === "IJ") return "#fc315d"
        if (props.product === "WS") return "#00ccd6"
        return "#a44af2"
    }

    return(
        <div className="productStats" >
            <BarChart className="barChart" width={530} height={150} data={props.stats}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={props.product} fill={choseColor()}/>
            </BarChart>
            <img className="icon" src={props.icon} alt=""/>
        </div>
    )
}

export default StatsBarChart;
