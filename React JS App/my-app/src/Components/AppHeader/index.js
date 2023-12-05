import { Badge, Drawer, Image, Space, Typography } from "antd";
import {MailOutlined, BellFilled} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../API";
import { List } from "antd/es/form/Form";

function AppHeader() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(0);

    useEffect(() => {
        // setLoading(true)
        getComments().then(res=>{
            setComments(res.comments);
        });
        getOrders().then(res=>{
            setOrders(res.products);
        });        
        

    }, []);
    return <div className="AppHeader">
        <Image width={40} src="https://cdn.vectorstock.com/i/preview-1x/58/85/letter-s-logo-vector-31975885.jpg"></Image>
        <Typography.Title>Serene Traders</Typography.Title>
        <Space>
            <Badge count={comments.length} dot>
                <MailOutlined 
                    style={{fontSize: 24}} 
                    onClick={() => {
                        setCommentsOpen(true)
                    }}
                />
            </Badge>
            <Badge count={orders.length}>
                <BellFilled 
                    style={{fontSize: 24}} 
                    onClick={() => {
                        setNotificationOpen(true)
                    }}                 
                />
            </Badge>
            
        </Space>
        <Drawer 
            title="Comments" 
            open={commentsOpen} 
            onClose={() => {
                setCommentsOpen(false)
            }}
            maskClosable    
        >
            <List 
                dataSource={comments} 
                renderItem={(item) => {
                   return <List.Item>{item.body}</List.Item>;
                }}>

            </List>

        </Drawer>
        <Drawer 
            title="Notifications" 
            open={notificationOpen} 
            onClose={() => {
                setNotificationOpen(false)
            }}
            maskClosable    
        >
            <List 
                dataSource={orders} 
                renderItem={(item) => {
                   return <List.Item>{item.title} has been ordered</List.Item>;
                }}>

            </List>

        </Drawer>        
    </div>
}

export default AppHeader