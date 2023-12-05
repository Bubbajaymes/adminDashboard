import Typography from "antd/es/typography/Typography";
import { useEffect } from "react";
import { useState } from "react";
import { getCustomers } from "../../API";
import { Rate, Space, Table } from "antd";
import Link from "antd/es/typography/Link";
import Avatar from "antd/es/avatar/avatar";

function Customers() {
    const [loading, setLoading] =useState(false)
    const [dataSource, setDataSource] =useState([])

    useEffect(() => {
        setLoading(true)
        getCustomers().then(res=>{
            setDataSource(res.users);
            setLoading(false);
        })
    }, [])
    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Customers</Typography.Title>
            <Table 
            loading={loading}
            columns={[
                // 
                {
                    title: "Photo",
                    dataIndex: "image",
                    render: (link) => {
                        return <Avatar src={link} />;
                    }
                },                
                {
                    title: "First Name",
                    dataIndex: "firstName",
                },
                {
                    title: "Last Name",
                    dataIndex: "lastName",
                    // render: (value)=> <span>${value}</span>
                },
                {
                    title: "Email",
                    dataIndex: "email",
                    
                },
                {
                    title: "Phone",
                    dataIndex: "phone",
                },

                {
                 title: "Address",
                 dataIndex: "address",
                 render: (address)=> {
                    return <span>{address.address}, {address.city}</span>
                 }
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

export default Customers;