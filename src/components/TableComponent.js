import React from "react";
import "antd/dist/antd.css";
import {Table} from "antd";

function TableComponent (props) {

    const columns = [
        {
            title: "Product",
            dataIndex: "product",
        },
        {
            title: "Min Usage",
            dataIndex: "min",
        },
        {
            title: "Max Usage",
            dataIndex: "max",
        },
        {
            title: "Average Usage",
            dataIndex: "avg",
        }
    ];

    const findMin = product => {
        return props.stats.reduce((min, p) => Object.values(p)[product] < min ? Object.values(p)[product] : min, 1000);
    }
    const findMax= product => {
        return props.stats.reduce((max, p) => Object.values(p)[product] > max ? Object.values(p)[product] : max, 0);
    }
    const findAvg = product => {
        return Math.floor(props.stats.reduce((sum, p) => sum+=Object.values(p)[product], 0)/props.stats.length);
    }

    const computeTable = () => {
        return [
            {
                product: "Inteliji IDEA",
                min: findMin(1),
                max: findMax(1),
                avg: findAvg(1),
            },
            {
                product: "WebStorm",
                min: findMin(2),
                max: findMax(2),
                avg: findAvg(2),
            },
            {
                product: "PhpStorm",
                min: findMin(3),
                max: findMax(3),
                avg: findAvg(3),
            }
        ]
    }

    return(
        <Table
            className="table"
            dataSource={computeTable()}
            columns={columns}
            pagination={false}
        />
    )
}

export default TableComponent;

