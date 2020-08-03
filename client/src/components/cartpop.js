import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import './cartpop.css';
import axios from 'axios';
import {PuffLoader} from "react-spinners";

//styles

const useStyles = makeStyles(() => ({
	boxMobile: {
		margin : '20px 0',
	  	float : 'right',
	  	background : 'white',
	  	width : '310px',
	  	height : '290px',
	  	borderRadius : '3px',
	  	padding : '20px',
	  	position : 'relative',
	  	marginRight : '10px',
	  	zIndex : 1,
	  	overflowY: 'auto',
	  	animation : 'fadeIn .5s ease-in'
	},
	boxWindow: {
		margin : '20px 0',
	  	float : 'right',
	  	background : 'white',
	  	width : '320px',
	  	height : '290px',
	  	position : 'relative',
	  	borderRadius : '3px',
	  	padding : '20px',
	  	marginRight : '-90px',
	  	zIndex : 1,
	  	overflowY: 'auto',
	  	animation : 'fadeIn .5s ease-in'
	}
}));

//component

function CartPop(){
	const classes = useStyles();
	const [cartitems, setCartitems] = React.useState([]);
	let price_total = 0; //cart total price
	let total_quantity = 0; //cart total
	const user = localStorage.getItem('name') || null
	const [load, setLoad] = React.useState(true);
	
	React.useEffect(() => {
		axios.get('http://localhost:5000/api-cart')
		.then((res) => {
			setCartitems(res.data);
			setLoad(false);
			
		})
		.catch((err) => {
			console.log(err);
			setLoad(false);
		});
	});

	if(user !== null){	
		cartitems.filter(items => items.user === user).map(item => {
			price_total += item.price;
			total_quantity += item.quantity;

		})
	}


	return(
		<>
		<Hidden xsDown>

			<div className="container" style={{position : 'relative', zIndex : 1}}>

				<div className={classes.boxWindow}>
					{user !== null ? 
					 	<>
					 		{load 
								?
								 <>
									 <div style={{display: "flex", justifyContent : "center", alignItems : "center", marginTop : "30%", zIndex : 1, animation : 'fadeOut .5s ease-out'}}>
										<PuffLoader loading={true} color={"#B0DFE5"} />
									 </div>
							     </>
								:
								<>
									<div className="shopping-cart-header">
											<ShoppingCartIcon style={{color : '#777777'}}/>
											<span className="w3-badge" style={{ paddingLeft : '7px' , paddingRight : '18px', width : '7%', height : '10%'}}>{total_quantity}</span>
				      						<div className="shopping-cart-total">
				        						<span className="lighter-text">Total:</span>
				        						<span className="main-color-text">${price_total.toFixed(2)}</span>
				      						</div>
									</div>

									<ul>
									 
									 	{cartitems.filter(items => items.user === user ).map((item, index) => (
														
														<li key={index}>
								        					<img src={`http://localhost:5000/static/${item.path}`} alt={`${item.name}`} style={{width : '40px' , height : '40px'}}/>
								        					<span className="cart-name">{item.name}</span>
								        					<span className="cart-price">${item.price.toFixed(2)}</span>
								        					<span className="cart-quantity">Quantity: {item.quantity}</span>
								      					</li>

										))}
					 
				      					
									</ul>

									
										 	 {cartitems.filter(items => items.user === user ).length > 0
										 	 	? 
										 		<Link to="/cart" className="button">Checkout</Link>
										 		:
										 		<>
										 			<span style={{color : '#B0DFE5', fontSize : '19px', paddingLeft : '70px'}}>No item in cart</span>
										 			<Link to="/cart" className="button">Checkout</Link>
										 		</>
										 	 }
								</> }	
						</>
						:

					 		<>
								<Link to="/login" className="button">Sign in</Link>
					 		</>
					}
				</div>

			</div>
		</Hidden>

		<Hidden smUp>
			<div className="container" style={{width : '130%'}}>

				<div className={classes.boxMobile}>
					{user !== null 
						?
						<>
							{load 
								?
								 <>
									 <div style={{display: "flex", justifyContent : "center", alignItems : "center", marginTop : "30%", zIndex : 1, animation : 'fadeOut .5s ease-out'}}>
										<PuffLoader loading={true} color={"#B0DFE5"} />
									 </div>
							     </>
								:
								 <>
									<div className="shopping-cart-header">
											<ShoppingCartIcon style={{color : '#777777'}}/>
											<span className="w3-badge" style={{paddingLeft : '7px' , paddingRight : '18px', width : '20px'}}>{total_quantity}</span>
				      						<div className="shopping-cart-total">
				        						<span className="lighter-text">Total: </span>
				        						<span className="main-color-text">${price_total.toFixed(2)}</span>
				      						</div>
									</div>

									<ul>
										 		{cartitems.filter(items => items.user === user ).map((item, index) => (
												
														 <li key={index}>
								        					<img src={`http://localhost:5000/static/${item.path}`} alt={`${item.name}`} style={{width : '40px' , height : '40px'}}/>
								        					<span className="cart-name">{item.name}</span>
								        					<span className="cart-price">${item.price.toFixed(2)}</span>
								        					<span className="cart-quantity">Quantity: {item.quantity}</span>
								      					 </li>
								      					
							      					
						      					))}
										
									</ul>
										 		{cartitems.filter(items => items.user === user ).length > 0
											 	 	? 
											 		<Link to="/cart" className="button">Checkout</Link>
											 		:
											 		<>
												 		<span style={{color : '#B0DFE5', fontSize : '19px', paddingLeft : '70px'}}>No item in cart</span>
												 		<Link to="/cart" className="button">Checkout</Link>
												 	</>
											 	 }
							     </>}
						</> 
						:
					    <>
						 	<Link to="/login" className="button">Sign in</Link>
				        </>
					}

					

				</div>

			</div>
		</Hidden>


		</>


		);
}

export default CartPop;