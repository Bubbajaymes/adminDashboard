import { Space, Table } from "antd";
import Card from "antd/es/card/Card";
import Typography from "antd/es/typography/Typography";
import { ShoppingCartOutlined, ShopOutlined, DollarCircleOutlined, UserOutlined } from "@ant-design/icons";
import Statistic from "antd/es/statistic/Statistic";
import { useEffect, useState } from "react";
import { getCustomers, getInventory, getOrders, getRevenue } from "../../API";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
//   import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

function Dashboard() {
    const [orders, setOrders] = useState(0)
    const [inventory, setInventory] = useState(0)
    const [customers, setCustomers] = useState(0)
    const [revenue, setRevenue] = useState(0)

    useEffect(() => {
        // setLoading(true)
        getOrders().then(res=>{
           setOrders(res.total);
           setRevenue(res.discountedTotal)
        //    setLoading(false)
        });
        getInventory().then(res=>{
            setInventory(res.total);
         //    setLoading(false)
         });
         getCustomers().then(res=>{
            setCustomers(res.total);
         //    setLoading(false)
         });
         getRevenue().then(res=>{
            setRevenue(res.total);
         //    setLoading(false)
         });
   }, [])

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal">
                <DashboardCard 
                icon={<ShoppingCartOutlined 
                    style={{
                        color: "green", 
                        backgroundColor: "rgba(0, 255, 0, 0.25)", 
                        borderRadius: 50,
                        fontSize: 24,
                        padding: 8,
                    }}/>} 
                title={"Orders"} 
                value={orders}
                />
                <DashboardCard 
                icon={<ShopOutlined 
                    style={{
                        color: "purple",
                        backgroundColor: "rgba(233, 189, 237, 0.6)", 
                        borderRadius: 50,
                        fontSize: 24,
                        padding: 8,
                    }}/>} 
                title={"Inventory"} 
                value={inventory}
                />
                <DashboardCard 
                icon={<UserOutlined 
                    style={{
                        color: "blue",
                        backgroundColor: "rgba(149, 149, 255, 0.49)", 
                        borderRadius: 50,
                        fontSize: 24,
                        padding: 8,
                    }}/>} 
                title={"Customers"} 
                value={customers}/>

                <DashboardCard 
                icon={<DollarCircleOutlined 
                    style={{
                        color: "red",
                        backgroundColor: "rgba(243, 203, 210, 1)", 
                        borderRadius: 50,
                        fontSize: 24,
                        padding: 8,
                    }}/>} 
                title={"Revenue"} 
                value={revenue}
                />
            </Space>
            <Space>
                <RecentOrders />
                <DashboardChart />
            </Space>
        </Space>
    )
}

function DashboardCard({title, value, icon}) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value}/>
            </Space>

        </Card>        
    );
}

function RecentOrders() {
    const [dataSource, setDataSource] =useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
         setLoading(true)
         getOrders().then(res=>{
            setDataSource(res.products.splice(0, 4))
            setLoading(false)
         })
    }, [])
    return (
        <>
            <Typography.Text >Recent Orders</Typography.Text>
            <Table
                columns={[
                    {
                        title: "Title",
                        dataIndex: "title",
                    },
                    {
                        title: "Quanntity",
                        dataIndex: "quantity",
                    },
                    {
                        title: "Price",
                        dataIndex: "discountedPrice",
                    },
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            ></Table>        
        </>

    )
}

function DashboardChart() {
    const [revenueData, setRevenueData] = useState({
        labels:[],
        datasets:[]
    })
    useEffect(() => {
        // setLoading(true)
        getRevenue().then(res=>{
            const labels = res.carts.map(cart=>{
                return `user-${cart.userId}`;
            });
            const data = res.carts.map(cart=>{
                return cart.discountedTotal;
            });  
            const dataSource = {
                labels,
                datasets: [
                  {
                    label: 'Revenue',
                    data: data,
                    backgroundColor: 'rgba(133, 0, 251, 1)',
                  }
                ],
            };  
            setRevenueData(dataSource)                    
        });
   }, []);
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Order Revenue',
          },
        },
    };
    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    //  const data = {
    //     labels,
    //     datasets: [
    //     {
    //         label: 'Dataset 1',
    //         data: labels.map(() => Math.random()*1000),
    //         backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //     },
    //     {
    //         label: 'Dataset 2',
    //         data: labels.map(() => Math.random()*1000),
    //         backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //     },
    //     ],
    // };

    return (
    
        <Card style={{width: 600, height: 400}}>
        
            <Bar options={options} data={revenueData} />
        </Card>
    ) ;
}

export default Dashboard;