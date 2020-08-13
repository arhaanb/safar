import * as firebase from 'firebase'
import { firestore } from 'firebase'
import { Toast } from './toast';
// import { Redirect } from 'react-router';
// import { stringify } from 'querystring';
// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux';

//Firebase Keys
const config = {
	apiKey: "AIzaSyBm8FD1icuVyrhoRPjwhuWWQXJXiYgvsqI",
	authDomain: "cura-64684.firebaseapp.com",
	databaseURL: "https://cura-64684.firebaseio.com/",
	projectId: "cura-64684",
	storageBucket: "cura-64684.appspot.com",
	messagingSenderId: "862840094498",
	appId: "1:862840094498:web:6e57b96b9b0e801cc76f7b"
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

