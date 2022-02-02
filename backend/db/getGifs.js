const axios = require('axios')
const fs = require('fs')

// let key = process.env.API_KEY
let baseURL = 'https://api.giphy.com/v1/gifs/random?api_key=28tnDy77eDHrBolCn9hu3hkzqreJxYWC&tag=&rating=g'
console.log(baseURL)
let gifCount = 20

let ids = []

for(let i = 0; i < gifCount; i++) {
    let rand = Math.floor(Math.random() * 10000)
    ids.push(rand)
}

let calls = ids.map(id => `${baseURL}`)
.map(url => axios.get(url))

// execute all promises, writing to disk if successful
Promise.all(calls)
.then(success => {
	let collectedData = success.map(res => res.data)
	let stringified = JSON.stringify(collectedData)
	fs.writeFile(__dirname + '/gifs.json', stringified, 'utf8', (err) => {
		if(err) {
			console.error(err)
		}
		else {
			console.log(`successfully wrote ${collectedData.length} records to db/gifs.json`)
		}
	}) 
})
.catch(err => {
	console.error(err)
	console.error('there was probably an issue with the rate limit, try again in 10 seconds or check the error messages above.')
})