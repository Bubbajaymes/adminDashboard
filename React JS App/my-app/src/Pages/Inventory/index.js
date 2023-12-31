import Typography from "antd/es/typography/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { getInventory } from "../../API";
import { Rate, Space, Table } from "antd";
import Link from "antd/es/typography/Link";
import Avatar from "antd/es/avatar/avatar";

function Inventory() {
    const [loading, setLoading] =useState(false)
    const [dataSource, setDataSource] =useState([])

    useEffect(() => {
        setLoading(true)
        getInventory().then(res=>{
            setDataSource(res.products);
            setLoading(false);
        })
    }, [])
    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Inventory</Typography.Title>
            <Table 
            loading={loading}
            columns={[
                // 
                {
                    title: "Thumbnail",
                    dataIndex: "thumbnail",
                    render: (link) => {
                        return <Avatar src={link} />;
                    }
                },                
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
                    title: "Rating",
                    dataIndex: "rating",
                    render: (rating)=> {
                        return <Rate value={rating} allowHalf disabled />
                    }
                 },
                 {
                    title: "Stock",
                    dataIndex: "stock",
                 },

                 {
                 title: "Brand",
                 dataIndex: "brand",
                 },
                 {
                 title: "Category",
                 dataIndex: "category",
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

export default Inventory;