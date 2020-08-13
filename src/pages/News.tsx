import { IonContent, IonButton, IonModal, IonPage, IonCol, IonGrid, IonFab, IonFabButton, IonFabList, IonIcon, IonCard, IonCardHeader, IonInfiniteScroll } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import '../fonts/fonts.css';
import './Dashboard.css';
import './News.css';
import { eyedropOutline, barChartOutline, heartOutline, personOutline, analyticsOutline } from 'ionicons/icons';
const axios = require('axios')


const Hospitals: React.FC = () => {
	const [showBasic, setShowBasic] = useState(false);
	const [showPlus, setShowPlus] = useState(false);
	const [showPro, setShowPro] = useState(false);
	//Basically, data aa raha hai but it isnt being saved to this state figure out what type the data is and use proper brackets in the state
	const [hospital, setHospital] = useState([{
		description: '',
		location: '',
		name: '',
		vaccines: '',
		id: ''
	}

	])

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
	// console.log(hospital)
	// const data = hospital


	// async function dataloader() {

	// }

	//load data every time view mounts
	// const mount = useIonViewWillEnter(dataloader)


	return (
		<IonPage>
			{/* <IonHeader>
			</IonHeader> */}
			<IonContent scrollEvents={true}>
				<IonGrid className="content">

					<div className="header">
						<h1 className="center title zero">
							<img src="https://i.postimg.cc/mkwK68Vw/CuraPass.png" alt="CuraPass" className="curapass" />
						</h1>
						<p className="center zero">Get your passes.</p>
					</div>
					<IonInfiniteScroll>
						<IonCol className="margincol">
							<IonCard color='dark' className="pass">
								<div className="head">
									<h1>Basic</h1>
									<h5>ETA 1 day</h5>
								</div>
								<div className="passcon">
									<h4>Get access to essential facilities.</h4>
									<h5 className="item">MARKETS</h5>
									<div className="flex-center">
										<button onClick={() => setShowBasic(true)} className="">REQUEST</button>
									</div>
								</div>
							</IonCard>

							<IonCard color='dark' className="pass">
								<div className="head">
									<h1>Plus</h1>
									<h5>ETA 1 week</h5>
								</div>
								<div className="passcon">
									<h4>Get access to non essential services.</h4>
									<h5 className="item">RESTAURANTS</h5>
									<h5 className="item">CLOTHING STORES</h5>
									<div className="flex-center">
										<button onClick={() => setShowPlus(true)} className="">REQUEST</button>
									</div>
								</div>
							</IonCard>

							<IonCard color='dark' className="pass">
								<div className="head">
									<h1>Pro</h1>
									<h5>ETA 1-2 weeks</h5>
								</div>
								<div className="passcon">
									<h4>Get access to entertainment facilities.</h4>
									<h5 className="item">THEATRES</h5>
									<h5 className="item">MALLS</h5>
									<div className="flex-center">
										<button onClick={() => setShowPro(true)} className="">REQUEST</button>
									</div>
								</div>
							</IonCard>
						</IonCol>

						{/* BASIC PACK MODAL */}
						<IonModal isOpen={showBasic} cssClass='my-custom-class'>
							<h3 className="center topmod white">
								<span className="title">Basic Pack</span>
								<br />
								Your estimated wait time is 2 days.
								<	br />
								Show this QR code at your destination to gain entry.
							</h3>
							<div className="flex-center qrcode">
								<img src="https://i.postimg.cc/sDptWVk5/qr.png" alt="QR Code" className="QR" />
							</div>
							<IonButton onClick={() => setShowBasic(false)} className="modbtn">Close</IonButton>
						</IonModal>

						{/* PLUS PACK MODAL */}
						<IonModal isOpen={showPlus} cssClass='my-custom-class'>
							<h3 className="center topmod white">
								<span className="title">Plus Pack</span>
								<br />
								Your estimated wait time is 1 week.
								<	br />
								Show this QR code at your destination to gain entry.
							</h3>
							<div className="flex-center qrcode">
								<img src="https://i.postimg.cc/sDptWVk5/qr.png" alt="QR Code" className="QR" />
							</div>
							<IonButton onClick={() => setShowPlus(false)} className="modbtn">Close</IonButton>
						</IonModal>

						{/* PRO PACK MODAL */}
						<IonModal isOpen={showPro} cssClass='my-custom-class'>
							<h3 className="center topmod white">
								<span className="title">Pro Pack</span>
								<br />
								Your estimated wait time is 2 weeks.
								<	br />
								Show this QR code at your destination to gain entry.
							</h3>
							<div className="flex-center qrcode">
								<img src="https://i.postimg.cc/sDptWVk5/qr.png" alt="QR Code" className="QR" />
							</div>
							<IonButton onClick={() => setShowPro(false)} className="modbtn">Close</IonButton>
						</IonModal>

					</IonInfiniteScroll>
				</IonGrid>
			</IonContent>



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
		</IonPage>
	);
};

export default Hospitals;
