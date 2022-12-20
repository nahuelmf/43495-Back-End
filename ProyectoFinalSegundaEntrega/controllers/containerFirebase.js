const admin = require('firebase-admin');
const serviceAccount = require("../priv.json")
admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
const { getFirestore, doc, getDoc } = require('firebase-admin/firestore');

class Container {
	constructor() {
		this.db = getFirestore();
	}
	
	//Save an object
	save(obj) {
		try {
			return this.db.collection('products').add(obj);
		} catch (err) {
			console.log(err);
		}
	}
	//Get an object by ID
	getById(id) {
		try {
			const data = this.db.doc(`/products/${id}`).get();
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	//Get all objects
	getAll() {
		try {
			return this.model.find();
		} catch (err) {
			console.log(err);
		}
	}
	//Delete one object
	deleteById(id) {
		try {
			return this.model.findByIdAndDelete(id);
		} catch (err) {
			console.log(err);
		}
	}
}

const db = getFirestore();

async function crear() {
	let res 
	/*res = await db.collection("products").doc().set({
		name: 'Auriculares Razer Kraken', 
		description: 'Auriculares gamer Razer', 
		code: 101010, 
		pic: 'https://http2.mlstatic.com/D_NQ_NP_756516-MLA41158138136_032020-O.webp',
		price: 4990, 
		stock: 101
	});
	*/
}


crear().then((res) => {
	console.log(res);
})
module.exports = Container;