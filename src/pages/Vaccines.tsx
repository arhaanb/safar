import { IonContent, IonHeader, IonItem, IonCol, IonRow, IonLabel, IonPage, IonSelect, IonSelectOption, IonButton, IonFab, IonFabButton, IonFabList, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import React, { useState, useEffect } from 'react';
// import ExploreContainer from '../components/ExploreContainer';
import './Dashboard.css';
// import { getCurrentUser } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// import { logoutUser } from '../firebaseConfig'
import '../fonts/fonts.css';
import './Hospitals.css'
import { eyedropOutline, barChartOutline, heartOutline, personOutline, analyticsOutline } from 'ionicons/icons';
const axios = require('axios')

const Vaccines: React.FC = () => {

	const history = useHistory()
	const username = useSelector((state: any) => state.user.username)
	function dashrouting() {
		if (username === 'minet') {
			history.replace('/admindash')
		} else {
			history.replace('/dashboard')
		}
	}

	const [showModal, setShowModal] = useState(false);
	const [tickdata, setTickdata] = useState('')
	const [hospital, setHospital] = useState([])

	useEffect(() => {
		axios.get('http://localhost:5000/safar/metro')
			.then((res: any) => {
				setHospital(res.data)
			})
	}, [])

	const [rest, setRest] = useState([])
	const [station1, setStation1] = useState('');
	const [station2, setStation2] = useState('');


	// useEffect(() => {
	async function getMetroData() {
		axios.get(`https://delhimetroapi.herokuapp.com/metroapi/from=${station1}&to=${station2}`)
			.then((res: any) => {
				setRest(res.data.path)
			}).catch((error: any) => {
				console.log(error)
			});
	}

	async function bookTicket() {

		axios.post('http://localhost:5000/safar/tickets', {
			username: username,
			from: station1,
			to: station2
		}).then((res: any) => {
			setTickdata(res.data)
		}).catch((error: any) => {
			console.log(error)
		});
	}
	// }, [])

	//Lmao sorry for messy code but just style kthx ly
	return (
		<IonPage>
			<IonHeader>
			</IonHeader>
			<IonContent>
				<div className="header">
					<h1 className="center title">Check Routes</h1>
					<p className="center">Check what route to take and book your tickets</p>
				</div>

				<div className="flex-center">
					<IonItem style={{ width: '80%' }}>
						<IonLabel className="whitelabel">From:</IonLabel>
						<IonSelect className="drop" onIonChange={(e: any) => setStation1(e.target.value)}>
							{hospital.map(item => (
								<IonSelectOption className="selectoption" key={item} value={item}>{item}</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>

					<IonItem style={{ width: '80%' }}>
						<IonLabel className="whitelabel">To:</IonLabel>
						<IonSelect className="drop" onIonChange={(e: any) => setStation2(e.target.value)}>
							{hospital.map(item => (
								<IonSelectOption style={{color: 'white'}} key={item} value={item}>{item}</IonSelectOption>
							))}
						</IonSelect>
					</IonItem>
				</div>


				<div className="columncust">
					<IonRow>
						<IonCol>
							<p>From: {station1}</p>
						</IonCol>
						<IonCol>
							<p>To: {station2}</p>
						</IonCol>
					</IonRow>
					<button className='buttonLogin' onClick={getMetroData}>Get Route</button>

					<ul>
						{rest.map(item => (
							<div key={item}>
								<p className="center">
								<img src="https://i.postimg.cc/3rSh6Rd6/Component-1-1.png" alt="" style={{ width: '1em' }} />
								</p>
								<li className="center">{item}</li>
							</div>
						))}
					</ul>

					<h1 className="center title">₹50</h1>


					<button className='buttonLogin' onClick={bookTicket}>Book Ticket</button>

				</div>
				{/* {hospital.map(hospital => (
					<IonCard color='dark' className="card" key={hospital.name}>
						<IonCardHeader>
							<h1 className="namehosp">{hospital.name} Hospital</h1>
							<h5 className="location">{hospital.location}</h5>
							<h5>{hospital.vaccines} vaccines available</h5>
							<p className="desc">{hospital.description}</p>
							<div className="flex-center">
								<IonButton className='appointment' size="small" onClick={() => setShowModal(true)}>Request an Appointment</IonButton>
							</div>
						</IonCardHeader>
					</IonCard>
				))} */}


				<IonFab slot='fixed' vertical='bottom' horizontal='end'>
					<IonFabButton>
						<IonIcon icon={analyticsOutline} />
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
			</IonContent>
		</IonPage>
	);
};

export default Vaccines;
