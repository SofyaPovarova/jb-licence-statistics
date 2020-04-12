import React, {Component} from "react";
import "antd/dist/antd.css";
import {Button, Select, Tooltip} from "antd";
const { Option } = Select;

const PeriodSelector = props => {
    const constructHint = dir => {
        return "One " + props.interval + " " + dir
    }

    return (
        <div className="periodSelect">
            <Tooltip placement="leftTop" title={constructHint("back")}>
                <Button onClick={() => props.changeFromPoint(-1)} >⬅</Button>
            </Tooltip>

            <Select
                className="container-dropdown"
                defaultValue={props.interval}
                onChange={props.changeInterval}
            >
                <Option value='day'>One day</Option>
                <Option value='week'>One week</Option>
                <Option value='month'>One month</Option>
                <Option value='quarter'>One quarter</Option>
            </Select>
            <Tooltip placement="rightTop" title={constructHint("forward")}>
                <Button onClick={() => props.changeFromPoint(1)}>➡</Button>
            </Tooltip>
            </div>
    )
}
export default PeriodSelector;