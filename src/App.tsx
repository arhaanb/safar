/* Check out @confidential_name on instagram ;)*/

import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import { getCurrentUser } from './firebaseConfig'
import { setUserState } from './Reducers/Actions'
import Hospitals from './pages/Hospitals'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Dashboard from './pages/Dashboard';
// import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import { useDispatch } from 'react-redux';
import Vaccines from './pages/Vaccines';
import News from './pages/News';
// import admindash from './pages/admindash';
import Admin from './pages/admindash';
import './fonts/fonts.css';


//Routes
const Routing: React.FC = () => {
	return (
		<IonReactRouter>
			<IonRouterOutlet>
				<Route path="/home" component={Home} exact={true} />
				<Route exact path="/" render={() => <Redirect to="/login" />} />
				<Route path='/login' component={Login} exact />
				<Route path='/Register' component={Register} exact />
				<Route path='/admindash' component={Admin} exact />
				<Route path='/dashboard' component={Dashboard} />
				<Route path='/hospitals' component={Hospitals} exact />
				<Route path='/vaccines' component={Vaccines} exact />
				<Route path='/news' component={News} exact />
			</IonRouterOutlet>
		</IonReactRouter>)
}


//Authentication
const App: React.FC = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		getCurrentUser().then((user: any) => {
			if (user) {
				dispatch(setUserState(user.email))
				window.history.replaceState({}, '', '/dashboard')
			} else {
				window.history.replaceState({}, '', '/')
			}
		})
	}, [])



	return (
		<IonApp>
			<Routing />
		</IonApp>)
};

export default App;
