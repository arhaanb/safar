import { IonContent, IonPage, IonButton, IonInput, IonCheckbox, IonLabel, IonGrid } from '@ionic/react';
import React, { useState } from 'react';
import './Register.css';
import { Toast } from '../toast';
import { registerUser } from '../firebaseConfig'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
const axios = require('axios')


const Register: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [Cpassword, setCPassword] = useState('');
	const [name, setName] = useState('');
	const history = useHistory()

	async function reg() {
		const res = await registerUser(username, password)

		if (password === Cpassword && res) {
			Toast('Registration Complete')
			axios.post('http://localhost:5000/safar/users', {
				username: username,
				name: name
			}).then((res: any) => {
				console.log(res)
			}).catch((error: any) => {
				console.error(error)
			})
			history.replace('/login')
		}
		if (password !== Cpassword) {
			Toast('Passwords Do Not Match')
		}
		if (!res) {
			Toast("User Exists")
		}
	}
	return (
		<IonPage>
			<IonContent className="Formstyle">
				<IonGrid className="contain">
					<img src="https://i.postimg.cc/c1cny0Fd/cura-title.png" alt="Cura" className="cura" />
					<div>
						<IonInput className="form" placeholder="Name" onIonChange={(e: any) => setName(e.target.value)} />
						<IonInput className="form" placeholder="Username" onIonChange={(e: any) => setUsername(e.target.value)} />
						<IonInput type='password' className="form" placeholder="Password" onIonChange={(e: any) => setPassword(e.target.value)} />
						<IonInput type='password' className="form" placeholder="Confirm password" onIonChange={(e: any) => setCPassword(e.target.value)} />
						{/* <IonCheckbox className="check" checked={vaccinated} onIonChange={e => setVaccinated(e.detail.checked)}></IonCheckbox> */}
						{/* <IonLabel className="label">Have You Been Vaccinated?</IonLabel> */}
						<IonButton className="buttonLogin" expand="block" onClick={reg}>Register</IonButton>
						<p className='help'>Already have an Account? <Link to='/login'>Login</Link></p>
					</div>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Register;
