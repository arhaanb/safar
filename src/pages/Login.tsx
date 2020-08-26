import { IonContent, IonPage, IonButton, IonInput, IonGrid } from '@ionic/react';
import React, { useState } from 'react';
import { loginUS } from '../firebaseConfig'
import { Toast } from '../toast';
import { useDispatch } from 'react-redux';
import { setUserState } from '../Reducers/Actions'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './login.css';

const Login: React.FC = () => {
	const [Username, setUsername] = useState('');
	const [Password, setPassword] = useState('');
	const dispatch = useDispatch()
	const history = useHistory()

	async function loginUser() {
		const res: any = await loginUS(Username, Password)
		if (!res) {
			Toast('Wrong login')
		} else {
			Toast('Logged In')
			try {
				dispatch(setUserState(res.user.email))
				if (Username === 'minet') {
					history.replace('/admindash')
				} else {
					history.replace('/dashboard')
				}
			}
			catch (error) {
				Toast(error)
				console.log(error)
			}
		}
	}

	return (
		<IonPage className='body'>
			<IonContent className="Formstyle">
				<IonGrid className="contain">
					<p className="center">
						<img src="https://i.postimg.cc/L8vFzbkf/safar-logo.png" alt="Cura" className="cura" />
					</p>
					<div>
						<IonInput className="form" placeholder="Username" onIonChange={(e: any) => setUsername(e.target.value)} />
						<IonInput type='password' className="form" placeholder="Password" onIonChange={(e: any) => setPassword(e.target.value)} />
						<button className='buttonLogin' onClick={loginUser}>Login</button>
						<p className='help center'>You are logging in with AarogyaSetu</p>
						<p className='help center'>Don't Have an Account? <Link to='/register'>Register</Link></p>
					</div>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Login;
