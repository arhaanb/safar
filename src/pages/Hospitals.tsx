import { IonContent, IonInput, IonHeader, IonPage, IonModal, IonButton, IonFab, IonFabButton, IonFabList, IonIcon, IonCard, IonCardHeader, IonInfiniteScroll, IonCol } from '@ionic/react';
import React, { useState, useEffect } from 'react';
// import ExploreContainer from '../components/ExploreContainer';
import './Dashboard.css';
// import { getCurrentUser } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// import { logoutUser } from '../firebaseConfig'
import { eyedropOutline, barChartOutline, heartOutline, personOutline, analyticsOutline } from 'ionicons/icons';
// import { hostname } from 'os';
// import Vaccines from './Vaccines';
// import { State } from 'ionicons/dist/types/stencil-public-runtime';
const axios = require('axios')

const Hospitals: React.FC = () => {

	const [showModal, setShowModal] = useState(false);

	const [hospital, setHospital] = useState([{
		description: '',
		location: '',
		name: '',
		vaccines: '',
		id: ''
	}])


	const history = useHistory()
	const username = useSelector((state: any) => state.user.username)
	function dashrouting() {
		if (username === 'minet') {
			history.replace('/admindash')
		} else {
			history.replace('/dashboard')
		}
	}
	useEffect(() => {
		axios.get('https://api.arhaanb.co/cura/hospitals')
			.then((res: any) => {
				setHospital(res.data)
			})
	}, [])

	const [money, setMoney] = useState(0)
	const [res, setRes] = useState('')

	async function loginUser() {
		axios.post('http://localhost:5000/safar/money', {
			username: username,
			money: money
		}).then((res: any) => {
			setRes(res.data.msg)
		}).catch((error: any) => {
			console.log(error)
		});
	}

	return (
		<IonPage>
			<IonContent
				scrollEvents={true}>
				<div className="columncust">

					<div className="header">
						<h1 className="center title">
							Add Money
						</h1>
						<p className="center zero">Add money to buy tickets.</p>
					</div>
					<IonInfiniteScroll>
						<h1 className="center moneyindicator">₹{money}</h1>
						<IonInput type="number" className="form amount" placeholder="Amount to add" onIonChange={(e: any) => setMoney(e.target.value)} />
						<button className='buttonLogin' onClick={loginUser}>Add Money</button>
						<h4>{res}</h4>
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
						))}
						<IonModal isOpen={showModal} cssClass='my-custom-class'>
							<h1 className="center topmod white">Show this to the scanner at the hospital to avail your vaccine.</h1>
							<div className="flex-center qrcode">
								<img src="https://i.postimg.cc/sDptWVk5/qr.png" alt="QR Code" className="QR" />
							</div>
							<IonButton onClick={() => setShowModal(false)} className="modbtn">Close</IonButton>
						</IonModal> */}
					</IonInfiniteScroll>
				</div>



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

export default Hospitals;
