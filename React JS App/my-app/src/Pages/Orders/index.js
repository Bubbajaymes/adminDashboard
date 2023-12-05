

import Typography from "antd/es/typography/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { getOrders } from "../../API";
import { Rate, Space, Table } from "antd";
import Link from "antd/es/typography/Link";
import Avatar from "antd/es/avatar/avatar";

function Orders() {
    const [loading, setLoading] =useState(false)
    const [dataSource, setDataSource] =useState([])

    useEffect(() => {
        setLoading(true)
        getOrders().then(res=>{
            setDataSource(res.products);
            setLoading(false);
        })
    }, [])
    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Orders</Typography.Title>
            <Table 
            loading={loading}
            columns={[
                //                 
                {
                    title: "Title",
                    dataIndex: "title",
                },
                {
                    title: "Price",
                    dataIndex: "price",
                    render: (value)=> <span>${value}</span>
                },
                {
                    title: "DiscountedPrice",
                    dataIndex: "discountedPrice",
                    render: (value)=> <span>${value}</span>
                },
                {
                    title: "Quantity",
                    dataIndex: "quantity",
        
                },
                {
                    title: "Total",
                    dataIndex: "total",
                },

                 
                 
                 
            ]}
            dataSource={dataSource}
            pagination={{
                pageSize: 8
            }}
            ></Table>
        </Space>
    )
}

export default Orders;