import React, { Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar  from './components/Navbar/Navbar';
import {Route} from 'react-router-dom';
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


const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));


class App extends React.Component {
  componentDidMount(){
    this.props.initializeApp();
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
            <Route path="/profile/:userId?" render={withSuspense(ProfileContainer)}/>
            <Route path="/dialogs" render={withSuspense(DialogsContainer)}/>
            <Route path="/news" render={() => <ProfileContainer />}/>
            <Route path="/music" render={() => <ProfileContainer />}/>
            <Route path="/settings" render={() => <ProfileContainer />}/>
            <Route path="/friends" render={() => <ProfileContainer />}/>
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginContainer />} />
          </div>
      </div>
  );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const SamuraiJSApp = () => {
    return ( 
      <BrowserRouter>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </BrowserRouter>
    )
}

export default SamuraiJSApp;