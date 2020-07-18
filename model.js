const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://ECJ222:kicks345@cluster0.riinc.mongodb.net/LaptopNg?retryWrites=true&w=majority', { useNewUrlParser: true, useFindAndModify: false  })

let Products = new mongoose.Schema({
	name : String,
	price : Number,
	image : { data: Buffer, contentType: String },
	path : String
}) // Product content 

let Users = new mongoose.Schema({
	name : {
		type : String,
		require : true 
	},
	email : {
		type : String,
		require : true 
	},
	password : {
		type : String,
		require : true 
	}

})
//User content

let ProductDb = mongoose.model('Products', Products);//Product model
let UserDb = mongoose.model('User', Users); //User model
module.exports = {

	ProductDb,
	UserDb
}
