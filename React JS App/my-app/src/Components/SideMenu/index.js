import { Menu } from "antd";
import {AppstoreOutlined, ShopOutlined,ShoppingCartOutlined, UserOutlined} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SideMenu() {
    const location = useLocation
    const [selectedKeys, setSelectedKeys] = useState('/')

    useEffect(() => {
        // setLoading(true)
        const pathName = location.pathname
        setSelectedKeys(pathName)

    }, [location.pathname])

    const navigate = useNavigate()
    return <div className="SideMenu">
        <Menu 
         className="SideMenuVertical"
         mode="vertical"
            onClick={(item)=>{
                navigate(item.key);
            }}
            selectedKeys={[selectedKeys]}
            items={[
                {
                    label:"Dashboard",
                    icon: <AppstoreOutlined />,
                    key:"/dashboard"
                },
                {
                    label:"Inventory",
                    key:"/inventory",
                    icon: <ShopOutlined />
                },
                {
                    label:"Orders",
                    key:"/orders",
                    icon: <ShoppingCartOutlined />
                },
                {
                    label:"Customers",
                    key:"/customers",
                    icon: <UserOutlined />
                },
            ]}>

        </Menu>
    </div>
}

export default SideMenu