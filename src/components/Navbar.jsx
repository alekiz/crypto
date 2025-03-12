import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
  DashboardOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';
import './navbar.css';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  // When a menu item is clicked, close the menu if on mobile
  const handleMenuClick = () => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/" style={{ color: 'yellow' }}>Cryptoverse</Link>
        </Typography.Title>
        <Button 
          className="menu-control-container" 
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <div className="menu-wrapper">
          <Menu
            theme="dark"
            mode="vertical"
            className="navbar-menu"
            onClick={handleMenuClick}
          >
            <Menu.Item icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined />}>
              <Link to="/cryptocurrencies">Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined />}>
              <Link to="/exchanges">Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined />}>
              <Link to="/news">News</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item icon={<DashboardOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item icon={<LoginOutlined />}>
              <Link to="/signin">Sign In</Link>
            </Menu.Item>
            <Menu.Item icon={<UserAddOutlined />}>
              <Link to="/signup">Sign Up</Link>
            </Menu.Item>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Navbar;
