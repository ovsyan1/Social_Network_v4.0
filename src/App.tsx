import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.css'
import {Header} from './components/Header/Header';
import {Redirect, Route, Switch} from 'react-router-dom';
import {UsersPage} from './components/Users/UsersPage';
import LoginContainer from './components/Login/Login';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {initializeApp} from './redux/app_reducer';
import {withRouter} from 'react-router-dom';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {withSuspense} from './hoc/withSuspense';
import {AppStateType} from './redux/redux-store';
import {Button} from 'antd'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const ChatPage = React.lazy(() => import('./pages/Chat/ChatPage'))


const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedChatPage = withSuspense(ChatPage)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  //e: promiseRejectionEvent
  catchAllUnhandledErrors = () => {
    alert('Some error occured')
    // console.error(promiseRejectionEvent)
  }

  componentDidMount(){
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount(){
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  render(){
    if(!this.props.initialized){
      return <Preloader />
    }
  return (
    <Layout>
      <Header/>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
        <Sider className="site-layout-background" width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
            <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
              <Menu.Item key="1"><Link to="/profile">Profile</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/dialogs">Dialogs</Link></Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
              <Menu.Item key="5"><Link to="/developers">Developers</Link></Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
              <Menu.Item key="9"><Link to='/chat'>Chat</Link></Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <Switch>
              <Route exact path="/" render={() => <Redirect to={'/profile'}/>}/>
              <Route path="/profile/:userId?" render={() => <SuspendedProfile />}/>
              <Route path="/news" render={() => <ProfileContainer />}/>
              <Route path="/music" render={() => <ProfileContainer />}/>
              <Route path="/settings" render={() => <ProfileContainer />}/>
              <Route path="/friends" render={() => <ProfileContainer />}/>
              <Route path="/developers" render={() => <UsersPage pageTitle={'Самураи'}/>} />
              <Route path="/login/facebook" render={() => <div>facebook</div>} />
              <Route path="/login" render={() => <LoginContainer />} />
              <Route path="/dialogs" render={() => <SuspendedDialogs />}/>
              <Route path="/chat" render={() => <SuspendedChatPage />}/>
              <Route path="*" render={() => <div>404 NOT FOUND
                  <Button type={'primary'}>ok</Button></div>} />
          </Switch>
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Samurai Social Network ©2021 Created by kovsiannik</Footer>
  </Layout>
  )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp: React.FC = () => {
    return ( 
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    )
}

export default SamuraiJSApp;