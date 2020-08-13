import { IonContent, IonHeader, IonPage, IonFab, IonFabButton, IonFabList, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import React from 'react';
// import ExploreContainer from '../components/ExploreContainer';
import './Dashboard.css';
// import { getCurrentUser } from '../firebaseConfig';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
// import { logoutUser } from '../firebaseConfig'
import '../fonts/fonts.css';
import './Hospitals.css'
import { eyedropOutline, barChartOutline, heartOutline, personOutline, analyticsOutline } from 'ionicons/icons';


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

	//Lmao sorry for messy code but just style kthx ly
	return (
		<IonPage>
			<IonHeader>
			</IonHeader>
			<IonContent>
				<div className="header">
					<h1 className="center title">Vaccines</h1>
					<p className="center">Know your medicine.</p>
				</div>

				<IonCard color='tertiary' className="card new">
					<IonCardHeader>
						<IonCardTitle className="center tag">COV6699ee</IonCardTitle>
						<p><span className="subhead">Type:</span>Antibody Treatment</p>
						<p><span className="subhead">Stage:</span>Completed, in Production</p>
						<p className="lastchild"><span className="subhead">Research Center:</span>MINET Biotech</p>
						<p>
							Developed by Aditya Pramar and Arhaan Bahadur, COV6699ee immobilises COVID19 within
							two hours of being administered. With minimal side effects, it cleared all testing phases in
							less than half a year. The discovery of this vaccine has nominated its creators for the Nobel Prize
							in Physiology.
						</p>
					</IonCardHeader>
					<IonCardContent>
					</IonCardContent>
				</IonCard>
				{/* <IonCard color='tertiary' className="card new">
					<IonCardHeader>
						<IonCardTitle className="center tag">Bacillus Calmette-Guerin</IonCardTitle>
						<p><span className="subhead">Type:</span>Live-attenuated vaccine</p>
						<p><span className="subhead">Stage:</span>Phase 2/3</p>
						<p className="lastchild"><span className="subhead">Research Center:</span>University of Melbourne</p>
						<p>
							There is no evidence that the Bacille Calmette-Guérin vaccine (BCG) protects people against infection with COVID-19 virus.
							Two clinical trials addressing this question are underway, and WHO will evaluate the evidence when it is available.
						</p>
					</IonCardHeader>
					<IonCardContent>
					</IonCardContent>
				</IonCard>
				<IonCard color='tertiary' className="card new">
					<IonCardHeader>
						<IonCardTitle className="center tag">mRNA-1273</IonCardTitle>
						<p><span className="subhead">Type:</span>mRNA-Command</p>
						<p><span className="subhead">Stage:</span>Phase 2/3</p>
						<p className="lastchild"><span className="subhead">Research Center:</span>Moderna</p>
						<p>
							mRNA is an information molecule and Moderna, Inc. designs its mRNA vaccines using the sequence of the virus, not by working on the virus itself.
							This mRNA platform provides significant advantages in speed and efficiency, across basic science, manufacturing, and clinical development.
						</p>
					</IonCardHeader>
					<IonCardContent>
					</IonCardContent>
				</IonCard> */}
				<IonCard color='tertiary' className="card new">
					<IonCardHeader>
						<IonCardTitle className="center tag">BNT162</IonCardTitle>
						<p><span className="subhead">Type:</span>mRNA-Command</p>
						<p><span className="subhead">Stage:</span>Phase 2/3</p>
						<p className="lastchild"><span className="subhead">Research Center:</span>Pfizer</p>
						<p>
							BNT162b1 is a vaccine candidate based upon mRNA.
							The four vaccine candidates are the first from BioNTech’s COVID-19-focused project “Lightspeed”, each representing different mRNA formats and target antigens.
						</p>
					</IonCardHeader>
					<IonCardContent>
					</IonCardContent>
				</IonCard>
				<IonCard color='tertiary' className="card new">
					<IonCardHeader>
						<IonCardTitle className="center tag">AZD1222</IonCardTitle>
						<p><span className="subhead">Type:</span>Antibody Treatement</p>
						<p><span className="subhead">Stage:</span>Phase 2/3</p>
						<p className="lastchild"><span className="subhead">Research Center:</span>The University of Oxford</p>
						<p>
							The AZD1222 coronavirus vaccine candidate, formerly known as ChAdOx1 nCoV-19, is made from a virus (ChAdOx1), which is a weakened version of a common cold virus (adenovirus) that causes infections in chimpanzees,
							that has been genetically changed so that it is impossible for it to grow in humans.
						</p>
					</IonCardHeader>
					<IonCardContent>
					</IonCardContent>
				</IonCard>




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
