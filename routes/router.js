const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const model = require('../model');
const fs = require('fs');
const bcrypt = require('bcrypt');
const passport = require('passport');
//const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const url = require('url');


//
module.exports = (app) => {

		app.get('/api-user', ( req, res ) => {
			res.send('user');
		});

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

		});//Signup api

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

							        	res.send({ 'token' : token, 'name' : profile.name, 'email' : profile.email}); //token expires in 2 days
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

		});//Login api

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
		});//reset password

		app.get('/api-product', (req, res ) => {

			model.ProductDb.find({}, (err, items) => {
				if (err) console.log(err);

				
				
				res.json(items);
			})

		});

		app.get('/api-cart', (req, res ) => {

			model.CartDb.find({}, (err, items) => {
				if(err) console.log(err);

				res.json(items);
			})

		});

		app.post('/api-cart', async (req, res) => {
			try{

				await model.CartDb.find({email : req.body.email})
				.then(async (profile) => {

					if(profile.length >= 1){
						let check = true;
						profile.map(async (item) => {
							if(item.name == req.body.name && item.path == req.body.path && item.user == req.body.user){

								item.quantity += 1;
								check = false;
								try{
									await item.save()
									.then(() => console.log('Ok'));
								}catch(err) {
									console.log(err);
								}


							}
						})

						if(check){
							let Cart = new model.CartDb({
								email : req.body.email,
								user : req.body.user,
								name : req.body.name,
								price : req.body.price,
								image : {
									data : req.body.data, 
									contentType : req.body.contentType
								},
								path : req.body.path,
								quantity : 1				
							})

							try{
								await Cart.save()
								.then(() => console.log('Ok'));
							}catch(err) {		
				 						console.log(err);
							}
						}
						
					}else{

						let Cart = new model.CartDb({
							email : req.body.email,
							user : req.body.user,
							name : req.body.name,
							price : req.body.price,
							image : {
								data : req.body.data, 
								contentType : req.body.contentType
							},
							path : req.body.path,
							quantity : 1
						})

						try{
							await Cart.save()
							.then(() => console.log('Ok'));
						}catch(err) {
							console.log(err);
						}

					}
				})
				

			}catch(err) {
				console.log(err);
			}
			
			
		})

		app.post('/cart-increment', async (req, res) => {

			try{

				await model.CartDb.find({email : req.body.email})
				.then(async (profile) => {

					if(profile.length >= 1){
						profile.map(async (item) => {
							if(item.name == req.body.name && item.path == req.body.path && item.user == req.body.user){

								if(req.body.action == 'add'){


									item.quantity += 1;
									
									try{
										await item.save()
										.then(() => console.log('Ok'));
									}catch(err) {
										console.log(err);
									}
								}else if(req.body.action == 'minus'){
									if(item.quantity <= 1){
										try{
											await item.delete()
											.then(() => console.log('deleted'));
										}catch(err) {
											console.log(err);
										}
									}else{
										item.quantity -= 1;
										
										try{
											await item.save()
											.then(() => console.log('Ok'));
										}catch(err) {
											console.log(err);
										}
									}
									
								}


							}
						})	
					}
				})	
				

			}catch(err) {
				console.log(err);
			}

		});

		app.delete('/delete-cart/:id', async (req, res) => {
			try{
				await model.CartDb.findOne({_id : req.params.id})
				.then(async (profile) => {
					try{
						await profile.delete()
						.then(() => console.log('deleted'));
					}catch(err) {	
						console.log(err);
					}

				})
			}catch (err){
				console.log(err)
			}
		});

		//Social Auth

		app.get('/auth/google', passport.authenticate('google', {
			 scope: [
		        "https://www.googleapis.com/auth/userinfo.profile",
		        "https://www.googleapis.com/auth/userinfo.email"
		      ]
		}));

		app.get( '/auth/google/callback', passport.authenticate( 'google'), (req, res) => {

			jwt.sign({data : req.user}, 'secret', {expiresIn : '2 days'}, async  (err, token) => {
		                  if (err){
		                      console.log(err);
		                  }
		                  
		                   res.redirect(url.format({
		                   		pathname : 'http://localhost:3000',
		                   		query : {
		                   			'n_e' : req.user.name,
		                   			't_n' : token,
		                   			'e_l' : req.user.email
		                   		}
		                   	}));
		                  
		    });
			
		});

}
