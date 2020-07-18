const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const model = require('./model');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.use(cors())


app.use('/static', express.static('static'));

app.get('/api-user', ( req, res ) => {
	res.send('user');
})

app.post('/api/register', async (req, res) => {
 	let Plainpassword = req.body.password; //unhashed password
 	let saltRounds = 10
 	
 	if (Plainpassword != undefined) {
	 	//hash password
	 	bcrypt.hash(Plainpassword, saltRounds).then(async function(hash) {
	    	// Store hash in your password DB.
	    	try{
		    	await model.UserDb.findOne({email : req.body.email})
		    	.then( async (email_check) => {
		    		if(!email_check){
		    			let new_user = new model.UserDb({
								name : req.body.name,
								email : req.body.email,
								password : hash
						});

						try{
							await new_user
							.save()
							.then(async () => {
							
								//res.status(200).send(new_user); //on 200 send the new user created
								try{

									await model.UserDb.findOne({name : req.body.name})
									.then(async (data) => {
										try{
												const match = await bcrypt.compare(Plainpassword, data.password); //check if the password matches with the hash password
							 
											    if(match) {
											        //res.send('User Authenticated');
											        jwt.sign({data : data}, 'secret', {expiresIn : '2 days'}, (err, token) => {
											        	if (err){
											        		res.send(null);
											        		console.log(err);
											        	}

											        	res.send(token); //token expires in 2 days
											        });
											    }
										} 
										catch (err){
											console.log(err);
										}
									})
								}
								catch (err) {
									console.log(err)
								}
							});	
						}
						catch (err) {
							console.log(err)
						}
						//------//
		    		}
		    		else{
		    			res.send('User already exists')
		    		}
		    	});
		    } 
		    catch (err) {
		    	console.log(err);
		    }
	    	

		});
	} else {
		res.send(null)
	}
	
	
	// User created

})//Signup api

app.post('/api/login', async (req, res) => {
 
	  let newUser = {};
	  newUser.email = req.body.email;
	  newUser.password = req.body.password;


	    try{

		  await model.UserDb.findOne({ email : newUser.email })
		    .then(async (profile) => {
		      if (!profile) {
		        res.send("User not exist");
		      } else {
			      	try{

				      	const match = await bcrypt.compare(newUser.password, profile.password); //check if the password matches with the hash password
		 				
						if(match) {
						    //res.send('User Authenticated');
						    jwt.sign({data : newUser}, 'secret', {expiresIn : '2 days'}, (err, token) => {
					        	if (err){
					        		res.send(null);
					        		console.log(err);
					        	}

					        	res.send({ 'token' : token, 'name' : profile.name}); //token expires in 2 days
					        });

					    }else{
					    	res.send("Password Invalid");
					    }

					} 
					catch (err){

						console(err);
						
					}
		      }
		    })

		}
	    catch (err){

	   		console(err.message);

	    }

})//Login api

app.post('/api/resetpassword', async (req, res) => {
	  let resetpassword = {};
	  resetpassword.email = req.body.email;
	  resetpassword.password = req.body.password;
	  let saltRounds = 10;
	  
	  try{

		  await model.UserDb.findOne({ email : resetpassword.email })
		    .then(async (profile) => {
		      if (!profile) {
		        res.send("User not exist");
		       } else{
		       		bcrypt.hash(resetpassword.password, saltRounds).then(function(hash) {
		       			profile.password = hash;
		       			profile.save()
		       			.then((data) => {
		       				res.send('reset OK');
		       			})
		       		})
		       }
		    });
	  }
	  catch (err) {
	  	console.log(err)
	  }
})//reset password

app.get('/api-product', ( req,res ) => {

	model.ProductDb.find({}, (err, items) => {
		if (err) console.log(err)

		
		
		res.json(items)
	})

})

app.get('/api-cart', ( req,res ) => {
	res.send({cart : 'product'})
})

app.get('/api-shipping', ( req,res ) => {
	res.send({shipping : 'product'})
})

if (process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build')); //all the static files are being served

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) //sends response data to index.html
	});
}

const port = process.env.PORT || 5000; //port 5000

app.listen(port, () => console.log(`server started on port ${port}`)); //listens for port 5000