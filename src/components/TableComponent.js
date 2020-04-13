import React from "react";
import "antd/dist/antd.css";
import {Table, Tag} from "antd";
import choseColor from "../utils/utils"
function TableComponent (props) {


    const columns = [
        {
            title: "Product",
            dataIndex: "product",
            render: (product => {
                return (
                    <Tag color={choseColor(product)} key={product}>
                        {product.toUpperCase()}
                    </Tag>
                );
            })
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
        if (props.stats.length === 0) return "-"
        return props.stats.reduce((min, p) => Object.values(p)[product] < min ? Object.values(p)[product] : min, 1000);
    }
    const findMax= product => {
        if (props.stats.length === 0) return "-"
        return props.stats.reduce((max, p) => Object.values(p)[product] > max ? Object.values(p)[product] : max, 0);
    }
    const findAvg = product => {
        if (props.stats.length === 0) return "-"
        return Math.floor(props.stats.reduce((sum, p) => sum+=Object.values(p)[product], 0)/props.stats.length);
    }

    const computeTable = () => {
        console.log(props.stats)
        let table = [];
        ["Inteliji IDEA", "WebStorm", "PhpStorm"].forEach((
            product, ind) => {
            table.push({
                product,
                min: findMin(ind+1, product),
                max: findMax(ind+1),
                avg: findAvg(ind+1),
            })
        })
        console.log("computed")

        return table;
    }

    return(
        <Table
            className="table"
            dataSource={computeTable()}
            columns={columns}
            pagination={false}
            margine={0}
        />
    )
}

export default TableComponent;

