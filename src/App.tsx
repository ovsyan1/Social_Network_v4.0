import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar  from './components/Navbar/Navbar';
import {Redirect, Route, Switch} from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
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


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

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
      <div className="app-wrapper">
          <HeaderContainer/>
          <Navbar/>
          <div className="app-wrapper-content">
            <Switch>
            <Route exact path="/" render={() => <Redirect to={'/profile'}/>}/>
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
            <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
            <Route path="/news" render={() => <ProfileContainer />}/>
            <Route path="/music" render={() => <ProfileContainer />}/>
            <Route path="/settings" render={() => <ProfileContainer />}/>
            <Route path="/friends" render={() => <ProfileContainer />}/>
            <Route path="/users" render={() => <UsersContainer pageTitle={'Самураи'}/>} />
            <Route path="/login/facebook" render={() => <div>facebook</div>} />
            <Route path="/login" render={() => <LoginContainer />} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
            </Switch>
          </div>
      </div>
  );
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