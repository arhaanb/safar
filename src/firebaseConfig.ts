import * as firebase from 'firebase'
import { firestore } from 'firebase'
import { Toast } from './toast';
// import { Redirect } from 'react-router';
// import { stringify } from 'querystring';
// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';

//Firebase Keys
const config = {
	apiKey: "AIzaSyBKGImVg6czCzo13R5AJW4sdVSAvi8RtQY",
	authDomain: "reise-8d291.firebaseapp.com",
	databaseURL: "https://reise-8d291.firebaseio.com",
	projectId: "reise-8d291",
	storageBucket: "reise-8d291.appspot.com",
	messagingSenderId: "763832880654",
	appId: "1:763832880654:web:e7790ec71dbf9d8440365f",
	measurementId: "G-J9WV7T481C"
};

firebase.initializeApp(config)
const db = firebase.firestore();

export const addinfo = () => {
	return db.collection('User')
		.add({
			created: firestore.FieldValue.serverTimestamp(),
			users: [{ name: 'abc' }]
		});
};

//MainLoginLogic
export async function loginUS(username: string, password: string) {
	const email = `${username}@minet.com`
	try {
		const res = await firebase.auth().signInWithEmailAndPassword(email, password)
		return (res)
		// return true
	} catch (error) {
		Toast(error.message)
		return false
	}
}


//CreateUser
export async function registerUser(username: string, password: string) {
	//ProGamerMove
	const email = `${username}@minet.com`
	try {
		// const res = 
		await firebase.auth().createUserWithEmailAndPassword
			(email, password)
		// console.log(res)
		return true
	} catch (error) {
		Toast(error)
		return false
	}
}

//UserSubscription
export function getCurrentUser() {
	return new Promise((resolve, reject) => {
		const unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				resolve(user)
			} else {
				resolve(null)
			}
			unsubscribe()
		})
	})
}

//Logout

export function logoutUser() {
	return firebase.auth().signOut()
}

