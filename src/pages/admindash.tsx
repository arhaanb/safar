import { IonContent, IonHeader, IonPage, IonToolbar, IonButton, IonFab, IonFabButton, IonFabList, IonIcon, IonInput, IonGrid, IonCol } from '@ionic/react';
import React, { useState } from 'react';
// import ExploreContainer from '../components/ExploreContainer';
import './Dashboard.css';
// import { getCurrentUser } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { logoutUser } from '../firebaseConfig'
import { eyedropOutline, barChartOutline, heartOutline, personOutline, analyticsOutline } from 'ionicons/icons';
import { Toast } from '../toast';
const axios = require('axios')



const Admin: React.FC = () => {
	const username = useSelector((state: any) => state.user.username)
	const history = useHistory()

	async function logout() {
		await logoutUser()
		history.replace('/login')
	}
	const [hostp, setHosp] = useState('');
	const [description, setDescription] = useState('');
	const [vaccines, setVaccines] = useState('');
	const [location, setLocation] = useState('')
	function sendHospital() {
		if (hostp === '' || description === '' || vaccines === '' || location === '') {
			Toast('Please enter all fields')
		} else {
			axios.post('https://api.arhaanb.co/cura/hospitals', {
				name: hostp,
				description: description,
				vaccines: vaccines,
				location: location
			}).then((res: any) => {
				console.log(res)
				Toast('Hospital Registered')
			}).catch((error: any) => {
				console.error(error)
			})
		}
	}

	function dashrouting() {
		if (username === 'minet') {
			history.replace('/admindash')
		} else {
			history.replace('/dashboard')
		}
	}
	//{username} is the registered username so use that kbye
	return (
		<IonPage>
			<IonContent>
			<IonFab slot='fixed' vertical='bottom' horizontal='end'>
							<IonFabButton>
								<IonFabButton>
									<IonIcon icon={analyticsOutline} />
								</IonFabButton>
							</IonFabButton>
							<IonFabList side='top'>
								<IonFabButton routerLink='/Vaccines'>
									<IonIcon icon={eyedropOutline} />
								</IonFabButton>
								<IonFabButton routerLink='/news'>
									<IonIcon icon={barChartOutline}></IonIcon>
								</IonFabButton>
								<IonFabButton routerLink='/hospitals'>
									<IonIcon icon={heartOutline}></IonIcon>
								</IonFabButton>
								<IonFabButton onClick={dashrouting}>
									<IonIcon icon={personOutline}></IonIcon>
								</IonFabButton>
							</IonFabList>
						</IonFab>
				<IonGrid className="content">
					<IonCol>
						<div className="header">
							<h1 className="center title">Hi Doc!</h1>
							<h1 className="center medium">You're an admin :)</h1>
						</div>

						<h1>Add a hospital</h1>
						<IonInput className="form" required={true} placeholder="hospital" onIonChange={(e: any) => setHosp(e.target.value)} />
						<IonInput className="form" required={true} placeholder="description" onIonChange={(e: any) => setDescription(e.target.value)} />
						<IonInput className="form" required={true} placeholder="vaccines" onIonChange={(e: any) => setVaccines(e.target.value)} />
						<IonInput className="form" required={true} placeholder="Location" onIonChange={(e: any) => setLocation(e.target.value)} />
						<IonButton color="secondary" className="buttonLogin" onClick={sendHospital}>Register</IonButton>
						<br>
						</br>
						<br />
						<IonButton className='logoutButton' expand="block" onClick={logout}>Logout</IonButton>

					</IonCol>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Admin;
