import { IonContent, IonCol, useIonViewWillEnter, IonModal, IonPage, IonButton, IonRow, IonFab, IonFabButton, IonFabList, IonIcon, IonGrid } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
// import { getCurrentUser } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { logoutUser } from '../firebaseConfig'
import { eyedropOutline, barChartOutline, heartOutline, personOutline, analyticsOutline } from 'ionicons/icons';
// import { error } from 'console';
const axios = require('axios')


const Dashboard: React.FC = () => {
	// const [vaccine, setVaccine] = useState('')
	const [money, setMoney] = useState('')
	const [name, setName] = useState('')
	const [showModal, setShowModal] = useState(false);
	const [tickdata, setTickdata] = useState([{
		username: '',
		from: '',
		to: '',
		_id: '',
	}])
	const [confirmed, setConfirmed] = useState()
	const [recovered, setRecovered] = useState()
	const [deaths, setDeaths] = useState()
	// const [user, setUser] = useState([{
	// 	username: '',
	// 	money: 0
	// }])
	const username = useSelector((state: any) => state.user.username)
	const history = useHistory()

	// const state = 


	async function logout() {
		await logoutUser()
		history.replace('/login')
	}

	//HAAN
	useEffect(() => {
		if (username === 'minet') {
			history.replace('/admindash')
		}
	}, [history, username])

	// useEffect(() => {
	// 	axios.post('https://api.arhaanb.co/cura/user', {
	// 		username: username
	// 	}).then((res: any) => {
	// 		setUser(res.data.vaccinated)
	// 	}).catch((error: any) => {
	// 		// console.log(error)
	// 	});
	// }, [username])

	useEffect(() => {
		axios.get('https://covid19.mathdro.id/api/countries/india')
			.then((res: any) => {
				// console.log(res.data)
				setConfirmed(res.data.confirmed.value)
				setRecovered(res.data.recovered.value)
				setDeaths(res.data.deaths.value)
			})
	}, [])

	useEffect(() => {
		axios.post('http://localhost:5000/safar/user', {
			username: username
		}).then((res: any) => {
			setMoney(res.data.money)
			setName(res.data.name)
		}).catch((error: any) => {
			// console.log(error)
		});
	});

	useEffect(() => {
		axios.get('http://localhost:5000/safar/tickets', {
			username: username
		}).then((res: any) => {
			setTickdata(res.data)
		}).catch((error: any) => {
			console.log(error)
		});
	}, []);


	// useEffect(() => {
	// 	if (Boolean(user) === true) {
	// 		const vaccineStatus = 'true'
	// 		setVaccine(vaccineStatus)
	// 	} else {
	// 		const vaccineStaus = 'false'
	// 		setVaccine(vaccineStaus)
	// 	}

	// }, [user])


	// console.log(user)
	//{username} is the registered username so use that kbye
	return (
		<IonPage>
			<IonContent>
				<IonGrid className="content">
					<IonCol>

						<p className="center">
							<img src="https://i.postimg.cc/Qx6MQDLg/Component-2-1.png" alt="" style={{ width: '80%' }} />
						</p>

						<div className="header dash">
							<h1 className="center title">Hi, {name}</h1>
							{/* {vaccine === 'true' &&
								<div>
									<div className="status">
										<div className="circle green"></div>
										<p className="center success">Vaccinated</p>
										<p className="center success"></p>
									</div>
									<p className="center">
										<img src="https://i.postimg.cc/WbnJRwcC/badge.png" alt="" className="badge" />
									</p>
								</div>
							} */}

							{/* {vaccine === 'false' &&
								<div>
									<div className="status">
										<div className="circle red"></div>
										<p className="center fail">Not Vaccinated</p>
									</div>
									<p className="center">Book an appointment and get <Link to='/hospitals'>vaccinated</Link></p>
								</div>
							} */}
						</div>

						{/* <div className="data"> */}
						{/* <IonRow>
							<IonCol>
								<div className="smlcard">
									<h1 className="medium">18 years</h1>
									<p>AGE</p>
								</div>
							</IonCol>
							<IonCol>
								<div className="smlcard">
									<h1 className="medium">70kg</h1>
									<p>WEIGHT</p>
								</div>
							</IonCol>
						</IonRow> */}
						{/* </div> */}
						<div className="cardbro bhaimargin">
							<div className="flex-center">
								<h3 className="center title">₹{money}</h3>
								<h1>Money in card</h1>
								<Link to="/hospitals">
									<button className="buttonLogin">Add Money</button>
								</Link>
							</div>
						</div>

						<div className="cardbro">
							<h1 className="title ticket">Your tickets</h1>

							{tickdata.map(item => (
								<div key={item._id}>
									<div onClick={() => setShowModal(true)} className="cardbro">{item.from} to {item.to}</div>
								</div>
							))}
							<IonModal isOpen={showModal} cssClass='my-custom-class'>
								<h1 className="center topmod">Scan this code at the metro station to gain entry</h1>
								<div className="flex-center qrcode">
									<img src="https://i.postimg.cc/sDptWVk5/qr.png" alt="QR Code" className="QR" />
								</div>
								<button onClick={() => setShowModal(false)}>Close</button>
							</IonModal>

							{/* <div className="cardbro confirmed">Green Park to AIIMS</div>
							<div className="cardbro confirmed">AIIMS to Noida</div>
							<div className="cardbro confirmed">Rajouri Garden to Rajive Chowk</div> */}
							<Link to="/vaccines">
								<button className="buttonLogin">Book a ticket</button>
							</Link>

						</div>
						<h1 className="medium stat">Recent stats</h1>
						<p>COVID-19 India</p>
						{/* <div className="statcards"> */}
						<IonRow>
							<IonCol>
								<div className="cardbro confirmed">
									<h3 className="center fail" key={confirmed}>{confirmed}</h3>
									<p>CONFIRMED</p>
								</div>
							</IonCol>
							<IonCol>
								<div className="cardbro recovered">
									<h3 className="center fail" key={recovered}>{recovered}</h3>
									<p>RECOVERED</p>
								</div>
							</IonCol>
							<IonCol>
								<div className="cardbro deaths">
									<h3 className="center fail" key={deaths}>{deaths}</h3>
									<p>DEATHS</p>
								</div>
							</IonCol>
						</IonRow>
						{/* </div> */}
						<button className='logoutButton' onClick={logout}>Logout</button>

					</IonCol>
				</IonGrid>
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
						<IonFabButton routerLink='/dashboard'>
							<IonIcon icon={personOutline}></IonIcon>
						</IonFabButton>
					</IonFabList>
				</IonFab>
			</IonContent>
		</IonPage>
	);
};

export default Dashboard;
