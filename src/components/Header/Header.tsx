import React from 'react';
import classes from './Header.module.css';
import {logout} from '../../redux/auth_reducer'
import {Link} from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, selectCurrentUserLogin} from '../../redux/auth_selectors'

type PropsType = {}

export const Header: React.FC<PropsType> = React.memo((props) => {

    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch = useDispatch()

    const logoutCallBack = () => {
      dispatch(logout())
    }

    const {Header} = Layout

    return  (
    <Header className="header">
      <Row>
        <Col span={18}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/developers">Developers</Link></Menu.Item>
          </Menu>
        </Col>
          {isAuth 
          ?<> 
          <Col span={1}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Col>
          <Col span={5} className={classes.white}>
            {login}<Button type={'primary'} onClick={logoutCallBack}>Log out</Button>
          </Col>
          </>
          : <Col span={6}>
              <Button type={'default'}>
              <Link to={'/login'}>Login</Link>
              </Button>
            </Col>
          }  
      </Row>
    </Header>
    )
})
